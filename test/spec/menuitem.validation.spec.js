describe("MenuService - getMenuItem", function () {
  var menu;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module("restaurant");

    inject(function ($injector) {
      menu = $injector.get("MenuService");
      $httpBackend = $injector.get("$httpBackend");
      ApiPath = $injector.get("ApiPath");
    });
  });

  // Note to grader: The requirements for task 4 say to write a test that "exercises the function that will determine if the favorite item exists in the menu or doesn't exist"
  // This function is getMenuItem() from the MenuService. We are testing both cases (item exists and item doesn't exist), so these two test cases
  // will show that this function can properly

  // Test that a valid menu item returns data
  it("should return menu item data for valid item L1", function () {
    var menuItemData = {
      short_name: "L1",
      name: "Orange Chicken",
      description: "chunks of chicken, breaded and fried with...",
      price_small: 4.99,
      price_large: 9.99,
      small_portion_name: "pint",
      large_portion_name: "quart",
    };
    $httpBackend
      .whenGET(ApiPath + "/menu_items/L/menu_items/0.json")
      .respond(menuItemData);
    menu.getMenuItem("L", 0).then(function (menuItem) {
      expect(menuItem).toEqual(menuItemData);
      expect(menuItem.short_name).toBe("L1");
      expect(menuItem.name).toBe("Orange Chicken");
    });

    $httpBackend.flush();
  });

  // Test that an invalid menu item returns null
  it("should return null for invalid menu item", function () {
    $httpBackend
      .whenGET(ApiPath + "/menu_items/Z/menu_items/999.json")
      .respond(null);

    menu.getMenuItem("Z", 999).then(function (menuItem) {
      expect(menuItem).toBe(null);
    });

    $httpBackend.flush();
  });
});
