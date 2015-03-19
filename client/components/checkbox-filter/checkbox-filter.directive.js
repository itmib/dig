'use strict';

angular.module('digApp.directives')
.directive('checkboxFilter', function() {
    return {
        restrict: 'E',
        scope: {
            aggregationName: '@',
            aggregationKey: '@',
            aggregationCount: '&',
            aggregationTermsType: '@',
            indexVM: '=indexvm',
            ejs: '=',
            filters: '=',
            filterStates: '='
        },
        templateUrl: 'components/checkbox-filter/checkbox-filter.partial.html',
        link: function($scope) {
            $scope.filterStates[$scope.aggregationName] = $scope.filterStates[$scope.aggregationName] || {};
            $scope.aggregationCount = $scope.aggregationCount() || 30;

            var checkAnyFiltersActive = function() {
                var filterState = $scope.filterStates[$scope.aggregationName];
                for(var key in filterState) {
                    if(key !== '__include_missing' &&!!filterState[key]) {
                        return true;
                    }
                }
                return false;
            };

            $scope.activeFilters = {
                filtersAreSet: checkAnyFiltersActive()
            };

            $scope.$watch(function() {
                return $scope.filterStates[$scope.aggregationName];
            }, function() {
                $scope.activeFilters.filtersAreSet = checkAnyFiltersActive();
            }, true);
        }
    };
});