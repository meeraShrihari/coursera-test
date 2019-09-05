(function() {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){
    $scope.lunchItems = "";
    $scope.msg = "";
    $scope.arrayLength = 0;

    $scope.checkIfTooMuch = function(){
      $scope.msgCode = "";
      $scope.emptyItemMsg = "";
      var len = 0;
      var lunchItemsArray = $scope.lunchItems.split(',');
      for(var i=0;i<lunchItemsArray.length;i++){
        if(lunchItemsArray[i].trim() === ""){
          len++;
        }
      }
      if(len > 0){
        $scope.emptyItemMsg = " Do not consider an empty item";
      }
      $scope.arrayLength = lunchItemsArray.length - len;

      if($scope.lunchItems.length > 0){
        if($scope.arrayLength <= 3){
          $scope.msg = "Enjoy";
          $scope.msgCode = "Enjoy";
        }else{
          $scope.msg = "Too much";
          $scope.msgCode = "TooMuch";
        }
      }else{
        $scope.msg = "Please enter data first";
        $scope.msgCode = "EnterData";
      }
    }; //checkIfTooMuch
  };//LunchCheckController
})();
