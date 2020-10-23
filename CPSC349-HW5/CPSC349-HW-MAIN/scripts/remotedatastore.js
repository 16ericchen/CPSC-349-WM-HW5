(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var firebaseRef = firebase.database().ref();
    class RemoteDataStore {
        constructor(url) {
            if (!url) {
                throw new Error('No URL provided.');
            }
            this.serverUrl = url;
        }
        add(key, val) {
            $.post(this.serverUrl, val, function (data) {
                firebaseRef.child("order").child(data._id).update(data);
                console.log(data);
            });
        }
        getAll(cb) {
            $.get(this.serverUrl, function (data) {
                cb(data);
            });
        }
        get(key, cb) {
            $.get(this.serverUrl + '/' + key, function (data) {
                console.log(data);
                cb(data);
            });
        }
        remove(key) {
            $.get(this.serverUrl + '/' + key, function (data) {
                console.log(data._id);  
            })
                .then(function (data) {
                    console.log(data._id);
                    firebaseRef.child("order").child(data._id).remove();
                });
            $.ajax(this.serverUrl + '/' + key, {
                type: 'DELETE',
                key: key,
            });

        }
    }
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
  })(window);