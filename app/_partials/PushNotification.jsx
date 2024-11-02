"use client";

import { useEffect } from "react";
import { requestForToken, onMessageListener } from "../../firebase";

const PushNotificationComponent = () => {
  useEffect(() => {
    requestForToken();

    onMessageListener()
      .then((payload) => {
        console.log("Message received. ", payload);
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      })
      .catch((err) => console.error("Failed to receive message", err));
  }, []);

  return null;
};

export default PushNotificationComponent;
