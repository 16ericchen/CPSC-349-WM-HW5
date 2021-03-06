(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore();
  var truck = new Truck('ncc-1701', remoteDS);
  window.truck = truck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(truck.deliverOrder.bind(truck));
  remoteDS.initChecklist(checkList);
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function(data) {
      truck.createOrder.call(truck, data);
      checkList.addRow.call(checkList, data);
  });
  console.log(formHandler);

  formHandler.addInputHandler(Validation.isCompanyEmail);
})(window);