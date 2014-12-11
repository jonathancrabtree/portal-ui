module ngApp.components.ui.search.controllers {
  import ILocationService = ngApp.components.location.services.ILocationService;

  interface ISearchBarController {
    query: string;
    isSearchQuery: boolean;
    toggle(isAdvancedQuery?: boolean): void;
    setQuery(): void;
    sendQuery(): void;
    resetQuery(): void;
  }

  class SearchBarController implements ISearchBarController {
    query: string = "";
    isSearchQuery: boolean = false;

    /* @ngInject */
    constructor(private $scope: ng.IScope, private LocationService: ILocationService,
                private $state: ng.ui.IStateService) {
      this.isSearchQuery = !!$state.current.name.match("search.") ||
                           !!$state.current.name.match("query.");
      $scope.$watch("query", () => {
        if (!this.query) {
          this.LocationService.clear();
        }
      });
      this.setQuery();
    }

    sendQuery() {
      this.LocationService.setQuery(this.query);
    }

    setQuery() {
      var currentQuery = this.LocationService.query();

      if (typeof currentQuery === "string") {
        this.query = currentQuery;
      }
    }

    toggle(isAdvancedQuery: boolean = false) {
      this.$scope.$parent.advancedQuery = isAdvancedQuery;
    }

    resetQuery() {
      this.LocationService.clear();
      this.query = "";
    }
  }

  angular.module("search.controllers", [])
      .controller("SearchBarController", SearchBarController);
}