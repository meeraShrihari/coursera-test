(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;
    try{
      toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
    } catch (error) {
      toBuy.errorMessage = error.message;
      console.log(toBuy.errorMessage);
    }
    toBuy.boughtItem = function (itemIndex){
    ShoppingListCheckOffService.shiftFromToBuyToBought(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this;
    bought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService(){
    var service = this;

    var toBuyItems = [{name: "cookies", quantity: "10 bags"}, {name: "coke", quantity: "10 bottles"}];
    var boughtItems = [];
    service.getToBuyItems = function(){
      if(toBuyItems.length > 0){
        return toBuyItems;
      }else{
        throw new Error("To Buy List is Empty");
      }
    };

    service.getBoughtItems = function(){
      return boughtItems;
    };

    service.shiftFromToBuyToBought = function(itemIndex){
        boughtItems.push((toBuyItems.splice(itemIndex, 1))[0]);
    }
  }

})();
