(function () {
  "use strict";

  angular.module("common").service("UserService", UserService);

  function UserService() {
    var service = this;
    var userInfo = null;

    // The word "save" is doing a lot of heavy lifting here, but technically it is saved for future usage
    service.saveUserInfo = function (
      firstName,
      lastName,
      email,
      phone,
      favoriteItem
    ) {
      userInfo = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        favoriteItem: favoriteItem,
      };
    };

    service.getUserInfo = function () {
      return userInfo;
    };
  }
})();
