angular.module('ProjectApp').directive('chartTotalOrders', function($http){
    return {
        scope: {
            title: '@'
        },
        replace: true,
        restrict: 'E',
        templateUrl: "directives/chart-total-orders/chart-total-orders.html",
        link: function($scope){
            $scope.options = {
                chart: {
                    type: 'lineChart',
                    height: 320,
                    margin : {
                        top: 10,
                        right: 20,
                        bottom: 59,
                        left: 100
                    },
                    clipEdge: false, 
                    showLegend: false,
                    interpolate: "monotone",
                    x: function(d){
                        if(d){
                            return d.x;
                        }
                        return null;
                    },
                    y: function(d){
                        if(d){
                            return d.y;
                        }
                        return null;
                    },
                    useInteractiveGuideline: true,
                    xAxis: {
                        tickFormat: function(index, notTooltip){
                            return index;
                        },
                        showMaxMin: false,
                        tickPadding: 25
                    },
                    yAxis: {
                        tickFormat: function(d){
                            return d3.format(',.02f')(d);
                        }
                    }
                }
            };

            if($scope.title === "Total de ventas anuales"){
                $http.get("/api/purchases/totals").then(function(response){
                    console.log(response);
                    $scope.data = response.data;
                });
            }
        }
    };
});