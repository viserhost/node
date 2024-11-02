// public/firebase-messaging-sw.js
importScripts('/firebase-app.js');
importScripts('/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyDSGOUHtoYwZ9hlngj9f_4VdvLgLGWOVs8",
    authDomain: "nextstarter-d81f2.firebaseapp.com",
    projectId: "nextstarter-d81f2",
    storageBucket: "nextstarter-d81f2.appspot.com",
    messagingSenderId: "1067077909927",
    appId: "1:1067077909927:web:c0f4ae9bfe03ffc7774a82",
    measurementId: "G-7JGGPKDVZY"
  };

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        // icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
