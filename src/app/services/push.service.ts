import { Injectable } from '@angular/core';

import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor() { }

  async addListeners() {

    PushNotifications.createChannel({
      description: 'General Notifications',
      id: 'sonido',
      importance: 5,
      name: 'My notification channel',
      sound: 'app',
      vibration: true,
      visibility: 1
    }).then(() => {
      console.log('push channel created: ');
    }).catch(error => {
      console.error('push channel error: ', error);
    });

    await PushNotifications.addListener('registration', token => {
      console.log('Registration token: ', token.value);
    });
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }

  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
    await PushNotifications.register();
  }
  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }
}
