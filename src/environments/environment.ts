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
		apiKey: 'AIzaSyAW7Nn9EFtOzzpLf5HMlqFGEfdGEkklgF4',
		authDomain: 'wiki-3fc1f.firebaseapp.com',
		projectId: 'wiki-3fc1f',
		storageBucket: 'wiki-3fc1f.appspot.com',
		messagingSenderId: '667380241142',
		appId: '1:667380241142:web:f9190dd857f4f322a492d7'
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
