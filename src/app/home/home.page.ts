import { Component, OnInit } from '@angular/core';

import {
	ActionPerformed,
	PushNotificationSchema,
	PushNotifications,
	Token,
	Channel,
} from '@capacitor/push-notifications';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	ngOnInit() {
		console.log('Initializing HomePage');

		const channel: Channel = {
			id: 'channel_test',
			name: 'test',
			importance: 1,
			sound: 'boop.mp3'
		}

		// Request permission to use push notifications
		// iOS will prompt user and return if they granted permission or not
		// Android will just grant without prompting
		PushNotifications.requestPermissions().then(result => {
			if (result.receive === 'granted') {
				// Register with Apple / Google to receive push via APNS/FCM
				PushNotifications.register();
			} else {
				// Show some error
			}
		});

		PushNotifications.addListener('registration', (token: Token) => {
			alert('Push registration success, token: ' + token.value);
		});

		PushNotifications.addListener('registrationError', (error: any) => {
			alert('Error on registration: ' + JSON.stringify(error));
		});

		PushNotifications.createChannel(channel).then(res => console.log(res));

		PushNotifications.addListener(
			'pushNotificationReceived',
			(notification: PushNotificationSchema) => {
				console.log('------------------- PushNotificationSchema -----------------');
				alert('Push received: ' + JSON.stringify(notification));
			},
		);

		PushNotifications.addListener(
			'pushNotificationActionPerformed',
			(notification: ActionPerformed) => {
				console.log('------------------- ActionPerformed -----------------');
				alert('Push action performed: ' + JSON.stringify(notification));
			},
		);
	}
}