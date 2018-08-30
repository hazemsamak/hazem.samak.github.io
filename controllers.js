// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location','cityService', function($scope,$location, cityService) {
     
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
    $scope.submit = function(){
        $location.path("/forecast");
    }
}]);

weatherApp.controller('forecastController', ['$scope', '$resource','$filter','$routeParams','cityService', function($scope, $resource,$filter,$routeParams ,cityService) {
    
    $scope.city = cityService.city;
    $scope.count = $routeParams.count || '2';
    //api.openweathermap.org/data/2.5/forecast
    //http://api.openweathermap.org/data/2.5/weather
    $scope.weatherAPI = $resource("https://api.openweathermap.org/data/2.5/forecast"
    ,     {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}}
    );
    
    $scope.weatherResults = $scope.weatherAPI.get(
        {q: $scope.city
         , appid: '61307061ea823edc7a2a4ee709b2530b'
         ,units: 'metric'
         ,cnt: $scope.count 
        }
    );
    
    $scope.convertToDate = function(dt)
    {
        return new Date(dt * 1000);
    }
}]);
