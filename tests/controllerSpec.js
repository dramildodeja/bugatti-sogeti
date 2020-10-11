describe("Real Time Data Analyzer", function () {
    beforeEach(module("app"));
    var controller, scope;
    beforeEach(inject(function ($controller, $scope) {
        controller = $controller("main-ctrl", {
           $scope : scope
        });
    }));
    it("Defining the Controller ", function () {
        expect(controller).toBeDefined();
    })
});