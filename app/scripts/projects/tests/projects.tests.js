describe('Projects:', function () {

  var ProjectsService, controller, httpBackend;

  // Initialization of the AngularJS application before each test case
  beforeEach(module('ngApp.projects'));

  // Injection of dependencies, $http will be mocked with $httpBackend
  beforeEach(inject(function ($httpBackend) {
    httpBackend = $httpBackend;
  }));

  describe('Controller:', function () {
    it('should have projects', inject(function ($controller) {
      // Which HTTP requests do we expect to occur, and how do we response?
      var projects= [
        { id: 1 },
        { id: 2 }
      ];

      // Starting the controller
      var wc = $controller('ProjectsController', {projects: projects});

      // We expect the controller to put the right value onto the scope
      expect(wc).to.have.property('projects').with.length(2);
    }));
  });

  describe('Service:', function () {
    it('should get all projects', inject(function (ProjectsService) {
      sinon.spy(ProjectsService.ds, 'get');

      var fs = {hits:[],facets:[],pagination:{}};
      httpBackend.whenGET("/projects").respond(fs);

      ProjectsService.getProjects();
      httpBackend.flush();

      expect(ProjectsService.ds.get).to.have.been.calledOnce;
      expect(ProjectsService.ds.get).to.have.been.calledWith("");
    }));

    it('should get one project by id', inject(function (ProjectsService) {
      sinon.spy(ProjectsService.ds, 'get');

      var f = {};
      httpBackend.whenGET("/projects/1").respond(f);

      ProjectsService.getProject(1);
      httpBackend.flush();

      expect(ProjectsService.ds.get).to.have.been.calledOnce;
      expect(ProjectsService.ds.get).to.have.been.calledWith(1);
    }));
  });
});