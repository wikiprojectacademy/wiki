import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseStorageService } from '@core/services/firebase/firebase-init/firebaseStorage.service';
import { CurrentUserService } from '@core/services/user/current-user.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SnackBarService } from '@shared/services/snackbar.service';
import { UserFirebaseService } from '@core/services/firebase/firebase-entities/userFirebase.service';
import { IUser } from '@core/models/User';

@Component({
	selector: 'app-navigation-bar',
	templateUrl: './navigation-bar.component.html',
	styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
	userSubscription: Subscription;
	currentUser: IUser;
	isLoggedIn$: Observable<boolean>;
	isLoading: boolean;

	constructor(
		public router: Router,
		private firebaseStorageService: FirebaseStorageService,
		private currentUserService: CurrentUserService,
		private snackBarService: SnackBarService,
		private userFirebaseService: UserFirebaseService
	) {}

	get isAdmin(): BehaviorSubject<boolean> {
		return this.currentUserService.isAdmin;
	}

	get isRegularAdmin(): BehaviorSubject<boolean> {
		return this.currentUserService.isRegularAdmin;
	}

	get isDBInitialized(): boolean {
		return this.currentUserService.isDatabaseInitialized.value;
	}

	ngOnInit(): void {
		this.isLoggedIn$ = this.currentUserService.isUserLogin$;
		this.userSubscription = this.currentUserService.currentUser$.subscribe(
			user => (this.currentUser = user)
		);
	}

	ngOnDestroy() {
		this.currentUser = undefined;
		this.userSubscription.unsubscribe();
	}

	reloadPage() {
		window.location.reload();
	}

	/**
	 * This method initialize database, with test data. Until the call of that method
	 * in database, already should be admin role and admin user.
	 * Fields: isAdmin and isDatabaseInitialised defines, if current user can initialize database
	 * By default isAdmin should be true, isDatabaseInitialised should be false,
	 * I remind you again, only for the super admin
	 */
	initDB() {
		this.isLoading = true;
		this.firebaseStorageService
			.initDB()
			.then(() => {
				// update db initialized field
				this.userFirebaseService
					.updateUser(this.currentUser.id, { isDatabaseInitialized: true })
					.then(() => {
						this.currentUserService.isDatabaseInitialized.next(true);
						this.isLoading = false;
						this.snackBarService.openSnackBar(
							'Database was successfully initialized'
						);
						this.reloadPage();
					});
			})
			.catch(error => {
				this.snackBarService.openSnackBar('Error while initialize database');
				this.currentUserService.isDatabaseInitialized.next(true);
				this.isLoading = false;
				console.log(error);
			});
	}
}
