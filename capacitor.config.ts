import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.notifications.dev',
	appName: 'ionic-notifications',
	webDir: 'www',
	bundledWebRuntime: false,
	plugins: {
		PushNotifications: {
			presentationOptions: ["badge", "sound", "alert"]
		}
	}
}

export default config;
