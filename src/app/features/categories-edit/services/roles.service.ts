import { Injectable } from '@angular/core';
import { IRole as RoleDB } from '@core/models/Role';
import { IRoleCategoryPair as RoleCategoryPairDB } from '@core/models/RoleCategoryPair';
import { RoleCategoryFirebaseService } from '@core/services/firebase/firebase-entities/roleCategoryFirebase.service';
import { RoleFirebaseService } from '@core/services/firebase/firebase-entities/roleFirebase.service';
import { Observable, Subject, take } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RolesService {
	roles: RoleDB[];
	roles$: Subject<RoleDB[]>;

	constructor(
		private roleFbService: RoleFirebaseService,
		private junctionService: RoleCategoryFirebaseService
	) {
		// this.addJunctions('test category', ['test role1', 'test role 2'])
		// 	.then(resp => console.log(resp))
		// 	.catch(reas => console.log(reas));
	}

	getRolesAll(): Observable<RoleDB[]> {
		return this.roleFbService.getRoles();
	}

	getRoleById(id: string): Observable<RoleDB> {
		return this.roleFbService.getRole(id);
	}

	addJunctions(categoryID: string, rolesIdToAdd: string[]): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			const junctionsWriting: Promise<string>[] = [];

			rolesIdToAdd.forEach(roleID => {
				const currentJunction: RoleCategoryPairDB = {
					categoryId: categoryID,
					roleId: roleID
				};
				junctionsWriting.push(
					this.junctionService.addDocWithAutoId(currentJunction)
				);
			});

			Promise.all(junctionsWriting)
				.then(() => {
					resolve();
				})
				.catch(reason => {
					reject(reason);
				});
		});
	}

	private removeJunctionsByIDs(junctionIDs: string[]) {
		const removing: Promise<void>[] = [];

		junctionIDs.forEach(juncId => {
			removing.push(this.junctionService.deleteDoc(juncId));
		});

		return new Promise<void>((resolve, reject) => {
			Promise.all(removing)
				.then(() => resolve())
				.catch(reason => reject(reason));
		});
	}

	removeJunctions(categoryID: string, roleIDs: string[]): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.junctionService
				.getCollection()
				.pipe(take(1))
				.subscribe(juncs => {
					const junctionsToRemove: string[] = [];

					roleIDs.forEach(roleId => {
						const rightJunc = juncs.filter(junc => {
							junc.categoryId == categoryID && junc.roleId == roleId;
						})[0];
						junctionsToRemove.push(rightJunc.id);
					});

					this.deleteJunctionByIds(junctionsToRemove)
						.then(() => resolve())
						.catch(reason => reject(reason));
				});
		});
	}

	/**
	 *	Delets junctions by their IDs

	 * @param junctionsId - array of ID of Category-Role pairs
	 */
	deleteJunctionByIds(junctionsId: string[]): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			const deletingJunctionsArray: Promise<void>[] = [];

			junctionsId.forEach(juncID => {
				deletingJunctionsArray.push(this.junctionService.deleteDoc(juncID));
			});

			Promise.all(deletingJunctionsArray)
				.then(() => {
					resolve();
				})
				.catch(reason => {
					reject(reason);
				});
		});
	}

	deleteJunctionsForCategory(categoryID: string) {}
	deleteSingleJunction(categoryID: string, roleID: string) {}
}
