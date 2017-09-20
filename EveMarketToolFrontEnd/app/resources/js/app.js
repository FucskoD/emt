(function (window, angular, undefined) {
    'use strict';

    angular.module('fixed.table.header', []).directive('fixHead', fixHead);

    function fixHead($compile, $window, $mdSticky) {
        function link(scope, element, attributes, controllers, transclude) {
            // Hack to hide sticky header after scrolling up when the sticky header is not the first visible element in the scrollable container.
            // See https://github.com/angular/material/issues/8506
            /*var stickyPlaceholder = angular.element('<div class="sticky-placeholder"></div>');
            element.parent().parent()[0].insertBefore(stickyPlaceholder[0], element.parent()[0]);
            $mdSticky(scope, stickyPlaceholder);
          */

            // Transclude the user-given contents of the subheader the conventional way.
            transclude(scope, function (clone) {
                element.append(clone);

                function numberOfCells() {
                    return clone.find('th').length;
                }

                function getCells(node) {
                    return Array.prototype.map.call(node.find('th'), function (cell) {
                        return angular.element(cell);
                    });
                }

                function updateCells() {
                    var cells = {
                        clone: getCells(clone),
                        original: getCells(element)
                    };

                    cells.clone.forEach(function (cloneCell, index) {
                        if (cloneCell.data('isClone')) {
                            return;
                        }

                        // prevent duplicating watch listeners
                        cloneCell.data('isClone', true);

                        var cell = cells.original[index];
                        var style = $window.getComputedStyle(cell[0]);

                        var getWidth = function () {
                            return style.width;
                        };

                        var setWidth = function () {
                            cloneCell.css({ minWidth: style.width, maxWidth: style.width });
                        };

                        var listener = scope.$watch(getWidth, setWidth);

                        $window.addEventListener('resize', setWidth);

                        cloneCell.on('$destroy', function () {
                            listener();
                            $window.removeEventListener('resize', setWidth);
                        });

                        cell.on('$destroy', function () {
                            cloneCell.remove();
                        });
                    });
                }

                /*
                var wrapper = element.parent().clone().empty().addClass('sticky-clone');
                wrapper.append(element.clone().empty());
                wrapper.find('thead').removeAttr('fix-head');
                wrapper.find('md-virtual-repeat-container').removeAttr('fix-head');
                $compile(wrapper)(scope);

                //wrapper.find('thead').append(clone);
                //$mdSticky(scope, element, wrapper);
                */
                scope.$watch(numberOfCells, function () {

                    updateCells();
                });
            });

        }

        return {
            restrict: 'A',
            transclude: true,
            link: link
        };
    }

    fixHead.$inject = ['$compile', '$window', '$mdSticky'];

})(window, angular);

var myApp = angular.module('myApp', ['infinite-scroll', 'ngMaterial','fixed.table.header', 'md.data.table','agGrid']);


myApp.config(['$mdThemingProvider', function ($mdThemingProvider) {
    'use strict';

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('teal')
        .warnPalette('red')
        .backgroundPalette('grey');


}]);
myApp.controller('DemoController', function($scope, Reddit) {
    $scope.reddit = new Reddit();
    $scope.searchTerm = "";
});

// Reddit constructor function to encapsulate HTTP and pagination logic
myApp.factory('Reddit', function($http) {
    var Reddit = function() {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.numberToDisplay = 10;
        this.maxNumber = 1000;
    };

    Reddit.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;

        if (this.numberToDisplay + 10 < this.maxNumber) {
            var url = "https://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
            $http.jsonp(url).success(function(data) {
                var items = data.data.children;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i].data);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
                this.numberToDisplay += 10;

            }.bind(this));
        } else {
            this.numberToDisplay = this.maxNumber;
        }
    };

    return Reddit;
});

myApp.controller('OrderController', function($scope, Order){
    $scope.order = new Order();
    $scope.searchTerm ="";
    $scope.selected = [];
});
myApp.factory('Order', function($http){
    var Order = function(){
        this.items = [];
        this.busy = false;
        this.currentPage=0;
        this.displayNum = 100;
        this.size=100;
        this.maxNumber = 0;
    };

    Order.prototype.nextPage = function(){
        if (this.busy) return;
        this.busy=true;
        if(this.currentPage<=this.maxNumber){
            var url = "http://localhost:8080/orders?page=" + this.currentPage + "&size=" + this.size + "&callback=JSON_CALLBACK";
            $http.jsonp(url).success(function (data) {
                var items = data.content;
                if(data.first===true) this.maxNumber=data.totalPages;
                for(var i = 0; i< items.length; i++){
                    this.items.push(items[i]);
                }
                this.currentPage+=1;
                this.busy= false;
            }.bind(this));
        } else {
            this.busy=false;
        }
    };
    return Order;
});

myApp.controller('nutritionController', ['$mdEditDialog', '$scope', function ($mdEditDialog, $scope) {
    'use strict';

    $scope.selected = [];

    $scope.query = {
        order: 'name',
        limit: 10,
        page: 1
    };

    $scope.desserts = {
        "count": 9,
        "data": [
            {
                "name": "Frozen yogurt",
                "type": "Ice cream",
                "calories": { "value": 159.0 },
                "fat": { "value": 6.0 },
                "carbs": { "value": 24.0 },
                "protein": { "value": 4.0 },
                "sodium": { "value": 87.0 },
                "calcium": { "value": 14.0 },
                "iron": { "value": 1.0 }
            }, {
                "name": "Ice cream sandwich",
                "type": "Ice cream",
                "calories": { "value": 237.0 },
                "fat": { "value": 9.0 },
                "carbs": { "value": 37.0 },
                "protein": { "value": 4.3 },
                "sodium": { "value": 129.0 },
                "calcium": { "value": 8.0 },
                "iron": { "value": 1.0 }
            }, {
                "name": "Eclair",
                "type": "Pastry",
                "calories": { "value":  262.0 },
                "fat": { "value": 16.0 },
                "carbs": { "value": 24.0 },
                "protein": { "value":  6.0 },
                "sodium": { "value": 337.0 },
                "calcium": { "value":  6.0 },
                "iron": { "value": 7.0 }
            }, {
                "name": "Cupcake",
                "type": "Pastry",
                "calories": { "value":  305.0 },
                "fat": { "value": 3.7 },
                "carbs": { "value": 67.0 },
                "protein": { "value": 4.3 },
                "sodium": { "value": 413.0 },
                "calcium": { "value": 3.0 },
                "iron": { "value": 8.0 }
            }, {
                "name": "Jelly bean",
                "type": "Candy",
                "calories": { "value":  375.0 },
                "fat": { "value": 0.0 },
                "carbs": { "value": 94.0 },
                "protein": { "value": 0.0 },
                "sodium": { "value": 50.0 },
                "calcium": { "value": 0.0 },
                "iron": { "value": 0.0 }
            }, {
                "name": "Lollipop",
                "type": "Candy",
                "calories": { "value": 392.0 },
                "fat": { "value": 0.2 },
                "carbs": { "value": 98.0 },
                "protein": { "value": 0.0 },
                "sodium": { "value": 38.0 },
                "calcium": { "value": 0.0 },
                "iron": { "value": 2.0 }
            }, {
                "name": "Honeycomb",
                "type": "Other",
                "calories": { "value": 408.0 },
                "fat": { "value": 3.2 },
                "carbs": { "value": 87.0 },
                "protein": { "value": 6.5 },
                "sodium": { "value": 562.0 },
                "calcium": { "value": 0.0 },
                "iron": { "value": 45.0 }
            }, {
                "name": "Donut",
                "type": "Pastry",
                "calories": { "value": 452.0 },
                "fat": { "value": 25.0 },
                "carbs": { "value": 51.0 },
                "protein": { "value": 4.9 },
                "sodium": { "value": 326.0 },
                "calcium": { "value": 2.0 },
                "iron": { "value": 22.0 }
            }, {
                "name": "KitKat",
                "type": "Candy",
                "calories": { "value": 518.0 },
                "fat": { "value": 26.0 },
                "carbs": { "value": 65.0 },
                "protein": { "value": 7.0 },
                "sodium": { "value": 54.0 },
                "calcium": { "value": 12.0 },
                "iron": { "value": 6.0 }
            }
        ]
    };

    $scope.editComment = function (event, dessert) {
        event.stopPropagation(); // in case autoselect is enabled

        var editDialog = {
            modelValue: dessert.comment,
            placeholder: 'Add a comment',
            save: function (input) {
                if(input.$modelValue === 'Donald Trump') {
                    return $q.reject();
                }
                if(input.$modelValue === 'Bernie Sanders') {
                    return dessert.comment = 'FEEL THE BERN!'
                }
                dessert.comment = input.$modelValue;
            },
            targetEvent: event,
            title: 'Add a comment',
            validators: {
                'md-maxlength': 30
            }
        };

        var promise = $mdEditDialog.small(editDialog);

        promise.then(function (ctrl) {
            var input = ctrl.getInput();

            input.$viewChangeListeners.push(function () {
                input.$setValidity('test', input.$modelValue !== 'test');
            });
        });
    };

    $scope.getTypes = function () {
        return ['Candy', 'Ice cream', 'Other', 'Pastry'];
    };
}]);

myApp.controller('AppCtrl', function($timeout, $scope, $http) {

    // In this example, we set up our model using a plain object.
    // Using a class works too. All that matters is that we implement
    // getItemAtIndex and getLength.
    $scope.selected2 = [];

    $scope.query2 = {
        order: 'orderId',
        limit: 10
    };

    this.infiniteItems = {
        numLoaded_: 0,
        toLoad_: 0,
        items:[],
        currentPage: 0,
        displayNum: 100,
        size: 100,
        maxNumber: 0,
        busy: false,

        // Required.
        getItemAtIndex: function(index) {
            if (index > this.numLoaded_) {
                this.fetchMoreItems_(index);
                return null;
            }

            return this.items[index];
        },

        // Required.
        // For infinite scroll behavior, we always return a slightly higher
        // number than the previously loaded items.
        getLength: function() {
            return this.numLoaded_ + 100;
        },

        fetchMoreItems_: function(index) {
            // For demo purposes, we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.
            if (this.busy) return;
            this.busy=true;
            if (this.toLoad_ < index) {
                this.toLoad_ += 10;
                var url = "http://localhost:8080/orders?page=" + this.currentPage + "&size=" + this.size;
                $http.get(url).then(angular.bind(this, function(obj){
                    if(obj.data.first===true) this.maxNumber=obj.data.totalPages;
                    if(!obj.data.content || obj.data.content.length == 0 ){
                        return false;
                    }
                    this.items = this.items.concat(obj.data.content);
                    this.numLoaded_ = this.toLoad_;
                    this.currentPage+=1;
                    console.log(this);
                    this.busy=false;
                }));
            }
        }
    };
});

myApp.controller("GridController", function ($scope, $http) {
    var currentPage = 0;
    var size = 1000;
    var columnDefs = [

        {headerName: "Order Id", field: "orderId", width: 150, suppressMenu: true, suppressFilter: true},
        {headerName: "Price", field: "price", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
        {headerName: "Duration", field: "duration", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
        {headerName: "Is Buy Order", field: "isBuyOrder", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
        {headerName: "Issued", field: "issued", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
        {headerName: "Location Id", field: "locationId", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
        {headerName: "Min volume", field: "minVolume", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
        {headerName: "Range", field: "range", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
        {headerName: "Type Id", field: "typeId", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
        {headerName: "Volume remain", field: "volumeRemain", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
        {headerName: "Volume total", field: "volumeTotal", width: 150, suppressMenu: true, suppressFilter: true, editable: true}
    ];

    $scope.gridOptions = {
        enableServerSideSorting: true,
        enableServerSideFilter: true,
        enableColResize: true,
        virtualPaging: true, // this is important, if not set, normal paging will
                             // be done
        rowSelection: 'multiple',
        rowDeselection: true,
        // Inside the following handlers, .api.forEachNode iterates over a
        // seemingly empty collection (or doesn't iterate at all).
        //onAfterFilterChanged: afterFilterChanged,
        //onAfterSortChanged: afterSortChanged,
        columnDefs: columnDefs,
        defaultColDef: {
        	editable: true,
        	width: 100
    	},    
    	stopEditingWhenGridLosesFocus: true,    	
        onReady: _init
    };
    function _init() {
        var allOfTheData;
        var sortingParameters = "";
        var sortingParametersBefore="";
        var maxNumber;
        var url;
        $http.get(
            "http://localhost:8080/orders?page="+currentPage + "&size="+size)
            .then(function (result) {
                allOfTheData = result.data.content;
                if(result.data.first===true) maxNumber=result.data.totalPages;
                // Add row ids.
                for (var i = 0; i < allOfTheData.length; i++) {
                    var item = allOfTheData[i];

                    item.id = 'm' + i;
                }

                var dataSource = {
                    rowModelType: 'infinite',
                    rowCount: null, // behave as infinite scroll
                    pageSize: 1000,
                    overflowSize: 10,
                    maxConcurrentRequests: 2,
                    //maxPagesInCache: 20,
                    //maxBlocksInCache: 2,                    
                    getRows: function _getRows(params) {
                        console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                        currentPage+=1;
                        // At this point in your code, you would call the server, using
                        // $http if in AngularJS. To make the demo look real, wait for
                        // 500ms before returning
                        sortingParametersBefore=sortingParameters;
                        sortingParameters = "";
                        if(params.sortModel.length>0){
                            for(var k=0;k<params.sortModel.length; k++ ){
                                sortingParameters+="&sort="+params.sortModel[k].colId+","+params.sortModel[k].sort;
                            }
                            if(!(sortingParameters===sortingParametersBefore)){
                                currentPage = 0;
                                allOfTheData =[];
                            }

                        }

                        if(currentPage <= maxNumber){
                            url = "http://localhost:8080/orders?page="+currentPage + "&size="+size + sortingParameters;
                            $http.get(url).then(function (obj){
                                allOfTheData = allOfTheData.concat(obj.data.content);
                                // take a slice of the total rows
                               /* var dataAfterSortingAndFiltering = sortAndFilter(
                                    allOfTheData,
                                    params.sortModel,
                                    params.filterModel);*/

                                var rowsThisPage = allOfTheData.slice(
                                    params.startRow, params.endRow);
                                // if on or after the last page, work out the last row.
                                var lastRow = -1;
                                if (allOfTheData.length <= params.endRow) {
                                    lastRow = allOfTheData.length;
                                }
                                // call the success callback
                                params.successCallback(rowsThisPage, lastRow);
                            });
                        }


                    }
                };

                $scope.gridOptions.api.setDatasource(dataSource);
            });
    }
    function sortAndFilter(allOfTheData, sortModel, filterModel) {
        return sortData(sortModel, filterData(filterModel, allOfTheData));
    }

    function sortData(sortModel, data) {
        var sortPresent = sortModel && sortModel.length > 0;
        if (!sortPresent) {
            return data;
        }
        // do an in memory sort of the data, across all the fields
        var resultOfSort = data.slice();
        resultOfSort.sort(function (a, b) {
            for (var k = 0; k < sortModel.length; k++) {
                var sortColModel = sortModel[k];
                var valueA = a[sortColModel.colId];
                var valueB = b[sortColModel.colId];
                // this filter didn't find a difference, move onto the next one
                if (valueA == valueB) {
                    continue;
                }
                var sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
                if (valueA > valueB) {
                    return sortDirection;
                } else {
                    return sortDirection * -1;
                }
            }
            // no filters found a difference
            return 0;
        });
        return resultOfSort;
    }

    function filterData(filterModel, data) {
        var filterPresent = filterModel && Object.keys(filterModel).length > 0;
        if (!filterPresent) {
            return data;
        }

        var resultOfFilter = [];
        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            if (filterModel.age) {
                var age = item.age;
                var allowedAge = parseInt(filterModel.age.filter);
                // EQUALS = 1;
                // LESS_THAN = 2;
                // GREATER_THAN = 3;
                if (filterModel.age.type === 1) {
                    if (age !== allowedAge) {
                        continue;
                    }
                } else if (filterModel.age.type === 2) {
                    if (age >= allowedAge) {
                        continue;
                    }
                } else {
                    if (age <= allowedAge) {
                        continue;
                    }
                }
            }

            if (filterModel.year) {
                if (filterModel.year.indexOf(item.year.toString()) < 0) {
                    // year didn't match, so skip this record
                    continue;
                }
            }

            if (filterModel.country) {
                if (filterModel.country.indexOf(item.country) < 0) {
                    // year didn't match, so skip this record
                    continue;
                }
            }

            resultOfFilter.push(item);
        }

        return resultOfFilter;
    }
});