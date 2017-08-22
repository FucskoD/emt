var myApp = angular.module('myApp', ['infinite-scroll', 'ngMaterial']);

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