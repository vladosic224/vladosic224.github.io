importScripts('https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.0/firebase-messaging.js');
const firebaseConfig = {
    apiKey: "AIzaSyA3F303snBflKIwbFrzlktbLjbmb5t4MRI",
    authDomain: "project-70490792387777047.firebaseapp.com",
    projectId: "project-70490792387777047",
    storageBucket: "project-70490792387777047.appspot.com",
    messagingSenderId: "465325740164",
    appId: "1:465325740164:web:06cc71e18fdc577ba2f2d1"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(function(payload) {

    const notificationOptions = {
        body: payload.notification.body
    };

    self.registration.showNotification(payload.notification.title, notificationOptions);
});