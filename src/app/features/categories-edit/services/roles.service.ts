import { Injectable } from '@angular/core';
import { IRole as RoleDB } from '@core/models/Role';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RolesService {
	roles: RoleDB[];
	roles$: Subject<RoleDB[]>;

	constructor(private roleFbService: RoleFirebaseService) {}

	getRolesAll(): Observable<RoleDB[]> {
		return this.roleFbService.getRoles();
	}
}
