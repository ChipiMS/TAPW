angular.module('ProjectApp').directive('chartTotalOrders', function($http){
    return {
        scope: {
            client: "=",
            title: '@'
        },
        replace: true,
        restrict: 'E',
        templateUrl: "directives/chart-total-orders/chart-total-orders.html",
        link: function($scope){
            function tickFormat(index, notTooltip){
                if(index === Math.floor(index)){
                    if($scope.title === "Total de ventas anuales"){
                        return $scope.data[0].values[index].key;
                    }
                    if($scope.title === "Total de ventas mensuales"){
                        return $scope.data[0].values[index].key.slice(4, 6)+"-"+$scope.data[0].values[index].key.slice(0, 4);
                    }
                    if($scope.title === "Total de ventas semanales"){
                        return $scope.data[0].values[index].key.slice(6, 8)+"-"+$scope.data[0].values[index].key.slice(4, 6)+"-"+$scope.data[0].values[index].key.slice(0, 4);
                    }
                }
                return "";
            }

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
                    focusEnable: true,
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
                        tickFormat: tickFormat,
                        showMaxMin: false,
                        tickPadding: 25
                    },
                    yAxis: {
                        tickFormat: function(d){
                            return d3.format(',.02f')(d);
                        }
                    },
                    x2Axis: {
                        tickFormat: tickFormat,
                        showMaxMin: false
                    },
                }
            };

            function init(){
                var params = {};
                if($scope.title === "Total de ventas anuales"){
                    params.byYear = true;
                }
                if($scope.title === "Total de ventas mensuales"){
                    params.byMonth = true;
                }
                if($scope.title === "Total de ventas semanales"){
                    params.byWeek = true;
                }
                if($scope.client){
                    params.client = $scope.client;
                }
                $http.get("/api/purchases/totals", {params: params}).then(function(response){
                    $scope.data = response.data;
                });
            }

            init();
        }
    };
});