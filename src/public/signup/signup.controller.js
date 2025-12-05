(function () {
  "use strict";

  angular.module("public").controller("SignUpController", SignUpController);

  SignUpController.$inject = ["MenuService", "UserService"];
  function SignUpController(MenuService, UserService) {
    var signupCtrl = this;

    signupCtrl.user = {};
    signupCtrl.completed = false;
    signupCtrl.invalidMenuItem = false;

    signupCtrl.submit = function () {
      var favItem = signupCtrl.user.favoriteItem.toUpperCase();

      // Extract category (letter) and menu number (digits) e.g. A and 5
      // The -1 is very important because the items are stored with a zero index
      // e.g. the URL for L1 is https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/0.json
      var category = favItem.match(/[A-Z]+/)[0];
      var menuNumber = parseInt(favItem.match(/\d+/)[0]) - 1;

      MenuService.getMenuItem(category, menuNumber)
        .then(function (menuItem) {
          if (menuItem === null) {
            signupCtrl.invalidMenuItem = true;
            signupCtrl.completed = false;
          } else {
            // Save user info with the full menu item object
            UserService.saveUserInfo(
              signupCtrl.user.firstName,
              signupCtrl.user.lastName,
              signupCtrl.user.email,
              signupCtrl.user.phone,
              menuItem
            );
            signupCtrl.completed = true;
            signupCtrl.invalidMenuItem = false;
          }
        })
        .catch(function (error) {
          signupCtrl.invalidMenuItem = true;
          signupCtrl.completed = false;
        });
    };

    signupCtrl.validateMenuItem = function () {
      if (!signupCtrl.user.favoriteItem) {
        signupCtrl.invalidMenuItem = false;
        return;
      }

      var favItem = signupCtrl.user.favoriteItem.toUpperCase();

      // Regex to check if format is valid (one or more letters followed by one or morenumbers)
      if (!/^[A-Z]+\d+$/.test(favItem)) {
        signupCtrl.invalidMenuItem = true;
        return;
      }

      var category = favItem.match(/[A-Z]+/)[0];
      var menuNumber = parseInt(favItem.match(/\d+/)[0]) - 1;

      MenuService.getMenuItem(category, menuNumber)
        .then(function (menuItem) {
          signupCtrl.invalidMenuItem = menuItem === null;
        })
        .catch(function (error) {
          signupCtrl.invalidMenuItem = true;
        });
    };
  }
})();
