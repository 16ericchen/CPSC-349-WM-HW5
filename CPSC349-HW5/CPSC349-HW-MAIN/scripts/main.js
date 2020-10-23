(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var firebaseConfig = {
    apiKey: "AIzaSyBISMdH-K_6SwqGP1cuRkMlYeDVHEFiZ2A",
    authDomain: "coffeerun-305a3.firebaseapp.com",
    databaseURL: "https://coffeerun-305a3.firebaseio.com",
    projectId: "coffeerun-305a3",
    storageBucket: "coffeerun-305a3.appspot.com",
    messagingSenderId: "413745598922",
    appId: "1:413745598922:web:ec591968e77394ef643f33",
    measurementId: "G-P70R74KF61"
  };
  firebase.initializeApp(firebaseConfig)
  var App = window.App;
  var Truck = App.Truck;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore;
  // var truck = new Truck('ncc-1701', new DataStore());
  var truck = new Truck('ncc-1701', remoteDS);
  window.truck = truck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(truck.deliverOrder.bind(truck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function(data) {
      truck.createOrder.call(truck, data);
      checkList.addRow.call(checkList, data);
  });
  console.log(formHandler);

  formHandler.addInputHandler(Validation.isCompanyEmail);
})(window);