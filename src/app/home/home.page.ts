import { Component, OnInit } from '@angular/core';
import { PushService } from '../services/push.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	constructor(private pushService: PushService) { }

	ngOnInit(): void {
		console.log('----- /// -----');
		this.pushService.addListeners();
		this.pushService.registerNotifications();
		this.pushService.getDeliveredNotifications();
	}

}
