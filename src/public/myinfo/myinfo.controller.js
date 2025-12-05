(function () {
  "use strict";

  angular.module("public").controller("MyInfoController", MyInfoController);

  MyInfoController.$inject = ["UserService"];
  function MyInfoController(UserService) {
    var myinfoCtrl = this;

    myinfoCtrl.userInfo = UserService.getUserInfo();

    // Extract category for image path (e.g. L1 -> L)
    if (myinfoCtrl.userInfo && myinfoCtrl.userInfo.favoriteItem) {
      myinfoCtrl.basePath =
        myinfoCtrl.userInfo.favoriteItem.short_name.match(/[A-Z]+/)[0];
    }
  }
})();
