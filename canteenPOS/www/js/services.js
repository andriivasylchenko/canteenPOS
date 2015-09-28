angular.module('starter.services', [])

.service('menu', function() {
  this.request = function() {
    var menuRequest = new WLResourceRequest(
      "/adapters/canteenAdapter/getMenu",
      WLResourceRequest.GET
    );

    menuRequest.setQueryParameters("params", "[]");

    return menuRequest.send().then(function(result){
      return result.responseJSON;
    })
  }
})
