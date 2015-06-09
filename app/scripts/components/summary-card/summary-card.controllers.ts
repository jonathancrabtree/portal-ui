module ngApp.components.summaryCard.controllers {

  interface ISummaryCardController {
  }

  class SummaryCardController implements ISummaryCardController {

    /* @ngInject */
    constructor(private $scope, private LocationService: ILocationService) {}

    addFilters(item: any) {
      var params;
      var config = this.$scope.config;

      if (!config.filters || (!config.filters[item.key] &&
          !config.filters["default"])) {
        return;
      }

      if (config.filters[item.key]) {
        var filters = config.filters[item.key];
        params = filters.params;
      } else {
        params = {
          filters: config.filters["default"].params.filters(item.key)
        };
      }

      var filters = this.LocationService.filters();

      if (!filters.content) {
        filters.content = [];
        filters.op = "and";
      }

      var newFilters = angular.fromJson(params.filters);

      _.forEach(newFilters.content, (filter) => {
        var oldFilter = _.find(filters.content, (oFilter) => {
          return oFilter.content.field === filter.content.field;
        });

        if (oldFilter) {
          // Playing with the idea that if attempting to add the exact same
          // value then we should remove it as a "reverse"
          if (!_.isEqual(oldFilter.content.value, filter.content.value)) {
            oldFilter.content.value.concat(filter.content.value);
          } else {
            filters.content.splice(filters.content.indexOf(filter), 1);
          }
        } else {
          filters.content.push(filter);
        }
      });

      this.LocationService.setFilters(filters);
    }
  }

  angular
      .module("summaryCard.controller", [
        "location.services"
      ])
      .controller("SummaryCardController", SummaryCardController);
}
