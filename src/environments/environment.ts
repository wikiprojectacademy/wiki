// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,

	/**
	 *
	 * ORIGINAL CREDENTIALS
	 * UNCOMENT IT IF I FORGOT :D
	 *
	 */

	// firebase: {
	// 	projectId: 'wiki-project-d5644',
	// 	appId: '1:923657900032:web:ff70e28bf7190f393408e5',
	// 	storageBucket: 'wiki-project-d5644.appspot.com',
	// 	locationId: 'europe-central2',
	// 	apiKey: 'AIzaSyC01z_rWrunkcIuXIe5hbRYl09egEKzR8w',
	// 	authDomain: 'wiki-project-d5644.firebaseapp.com',
	// 	messagingSenderId: '923657900032',
	// 	measurementId: 'G-H6BHSF19B5'
	// }

	firebase: {
		apiKey: 'AIzaSyAbhG5iZP2s2Ig1smIQiYLs0n2DLHs_V2s',
		authDomain: 'wiki-roman.firebaseapp.com',
		projectId: 'wiki-roman',
		storageBucket: 'wiki-roman.appspot.com',
		messagingSenderId: '36887117535',
		appId: '1:36887117535:web:34a158b004c08b2f2af36a',
		measurementId: 'G-216TM967GB'
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
