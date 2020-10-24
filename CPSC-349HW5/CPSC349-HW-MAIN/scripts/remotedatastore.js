(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var fd = firebase.firestore();
    class RemoteDataStore {
        constructor() {
        }
        add(key, val) {
            return fd.collection("coffeeorders").doc(key).set({
                coffee: val.coffee,
                email: key,
                size: val.size,
                flavor: val.flavor,
                strength: val.strength
            });
        }
        getAll() {
            var dict = {};
            fd.collection("coffeeorders").get().then(function (data) {
                data.forEach(function (doc) {
                    dict[doc.id] = doc.data();
                    console.log(doc.id, " => ", doc.data());
                });
            });
            return dict;
        }
        get(key) {
            var docRef = fd.collection("coffeeorders").doc(key);
            return docRef.get();
        }
        remove(key) {
            return fd.collection("coffeeorders").doc(key).delete().then(function () {
                console.log("Document successfully deleted");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        }
        initChecklist(checklist) {
            fd.collection("coffeeorders").get().then(function (data) {
                data.forEach(function (doc) {
                    checklist.addRow.call(checklist, doc.data());
                });
            });
        }
    }
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
  })(window);