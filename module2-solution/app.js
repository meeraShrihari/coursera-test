(function() {
  'use strict';
var x=0;
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;
    toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
    toBuy.boughtItem = function (itemIndex){
    ShoppingListCheckOffService.shiftFromToBuyToBought(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this;
    bought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    bought.length = bought.boughtItems.length;
  }

  function ShoppingListCheckOffService(){
    var service = this;
    var toBuyItems = [{name: "cookies", quantity: "10 bags"},
                      {name: "coke", quantity: "5 bottles"},
                      {name: "pizza", quantity: "5 bags"},
                      {name: "chips", quantity: "10 bags"},
                      {name: "juice", quantity: "5 bottles"}
                    ];
    var boughtItems = [];
    var boughtItemsLength = boughtItems.length;
    service.getToBuyItems = function(){
        return toBuyItems;
    };

    service.getBoughtItems = function(){
      return boughtItems;
    };

    service.getBoughtItemsLength = function(){
      return boughtItems.length;
    };
    service.shiftFromToBuyToBought = function(itemIndex){
        boughtItems.push((toBuyItems.splice(itemIndex, 1))[0]);
        boughtItemsLength = boughtItems.length;
    }
  }

})();
