import { Injectable } from '@angular/core';

import { ICategory as CategoryDB } from '@core/models/Category';
import { ISubCategory as SubCategoryDB } from '@core/models/SubCategory';
import { ICategoryFull as Category } from '../models/icategory-full';
import { IUser as UserDB } from '@core/models/User';
import { IUserInCategory as User } from '../models/userInCategory.interface';
import { IRole as RoleDB } from '@core/models/Role';
import { IRoleCategoryPair as RoleCategoryDB } from '@core/models/RoleCategoryPair';
import { CategoryFirebaseService } from '@core/services/firebase/firebase-entities/categoryFirebase.service';
import { RolesService } from './roles.service';

@Injectable({
	providedIn: 'root'
})
export class CategoriesUpdateService {
	constructor(
		private categoriesFbSevice: CategoryFirebaseService,
		private rolesService: RolesService
	) {}

	editCategory(modCategory: Category, origCategory: Category): void {
		const needToWrite = this.compareCategories(origCategory, modCategory);
		const promisseArray: Promise<void>[] = [];

		if (needToWrite.name) {
			promisseArray.push(this.updateName(origCategory.id, modCategory.name));
		}

		if (needToWrite.subCategories) {
			const [toAdd, toDelete] = this.getSubCategoriesDelta(
				origCategory.subCategoriesFull,
				modCategory.subCategoriesFull
			);

			console.log('%c--- SUB ---', 'color: #f00');
			console.log('To add:');
			console.log(toAdd);
			console.log('To delete:');
			console.log(toDelete);
		}

		if (needToWrite.roles) {
			const [toAdd, toDelete] = this.getRolesDelta(
				origCategory.rolesFull,
				modCategory.rolesFull
			);

			console.log('%c--- ROLES ---', 'color: #f00');
			console.log('To add:');
			console.log(toAdd);
			console.log('To delete:');
			console.log(toDelete);
		}
	}

	updateName(categoryID: string, newName: string): Promise<void> {
		const categoryToDB: Partial<CategoryDB> = {
			name: newName
		};
		return this.categoriesFbSevice.updateDoc(categoryID, categoryToDB);
	}

	updateSubCategories(
		categoryID: string,
		subCategoriesToDelete: SubCategoryDB[],
		subCategoriesToAdd: SubCategoryDB[]
	): Promise<void> {
		const deleting: Promise<void>[] = [];
		const adding: Promise<void>[] = [];

		subCategoriesToDelete.forEach(sub => {
			deleting.push(
				this.categoriesFbSevice.deleteDocFromSubCollection(categoryID, sub.id)
			);
		});
		subCategoriesToAdd.forEach(sub => {
			adding.push(
				this.categoriesFbSevice.addDocToSubCollection(categoryID, sub)
			);
		});

		return new Promise<void>((resolve, reject) => {
			Promise.all([...deleting, ...adding])
				.then(() => resolve())
				.catch(reason => reject(reason));
		});
	}

	updateJunctions(
		rolesToDelete: RoleDB[],
		rolesToAdd: RoleDB[],
		categoryID: string
	): Promise<void> {
		const idToDelete: string[] = [];
		rolesToDelete.forEach(role => {
			idToDelete.push(role.id);
		});

		const idToAdd: string[] = [];
		rolesToAdd.forEach(role => {
			idToAdd.push(role.id);
		});

		const writingToDB: Promise<void>[] = [
			this.rolesService.deleteJunctionByIds(idToDelete),
			this.rolesService.addJunctions(categoryID, idToAdd)
		];

		return new Promise<void>((resolve, reject) => {
			Promise.all(writingToDB)
				.then(() => resolve())
				.catch(reason => reject(reason));
		});
	}

	private getRolesDelta(roles: RoleDB[], modRoles: RoleDB[]) {
		const toDelete: RoleDB[] = [];
		const toAdd: RoleDB[] = [];

		const [rolesOrig, rolesMod] = [
			JSON.stringify(roles),
			JSON.stringify(modRoles)
		];

		roles.forEach(role => {
			if (!rolesMod.includes(JSON.stringify(role))) {
				console.log(role);
				toDelete.push(role);
			}
		});

		modRoles.forEach(modRole => {
			if (!rolesOrig.includes(JSON.stringify(modRole))) {
				toAdd.push(modRole);
				console.log(modRole);
			}
		});

		return [toAdd, toDelete];
	}

	private getSubCategoriesDelta(
		subCategories: SubCategoryDB[],
		modSubCategories: SubCategoryDB[]
	) {
		const toDelete: SubCategoryDB[] = [];
		const toAdd: SubCategoryDB[] = [];

		subCategories.forEach(subCat => {
			if (!isContainName(modSubCategories, subCat.name)) {
				toDelete.push(subCat);
			}
		});

		modSubCategories.forEach(modSubCat => {
			if (!isContainName(subCategories, modSubCat.name)) {
				toAdd.push(modSubCat);
			}
		});

		// Need to use this function because need to save ID for each subCategory
		// (They come from form without IDs and placed only in start snapshot of categories)
		function isContainName(
			subCategories: SubCategoryDB[],
			name: string
		): boolean {
			for (let i = 0; i < subCategories.length; i++) {
				if (subCategories[i].name === name) return true;
			}
			return false;
		}

		return [toAdd, toDelete];
	}

	/**
	 * Determines what fields in category is need to rewrite
	 * @param category1 - category start state
	 * @param category2 - modified category
	 * @returns object, that indicates what fields need to rewrite
	 *
	 */
	private compareCategories(category1: Category, category2: Category) {
		const needToWrite = { name: false, subCategories: false, roles: false };

		const [name1, name2] = [category1.name, category2.name];
		const [roles1, roles2] = [
			JSON.stringify(category1.rolesFull),
			JSON.stringify(category2.rolesFull)
		];
		const [subCat1, subCat2] = [
			JSON.stringify(
				this.clearIdFromSubCategories(category1.subCategoriesFull)
			),
			JSON.stringify(category2.subCategoriesFull)
		];

		if (name1 !== name2) needToWrite.name = true;
		if (roles1 !== roles2) needToWrite.roles = true;
		if (subCat1 !== subCat2) needToWrite.subCategories = true;

		return needToWrite;
	}

	private clearIdFromSubCategories(
		subCategories: SubCategoryDB[]
	): SubCategoryDB[] {
		const result: SubCategoryDB[] = [];
		subCategories.forEach(sub => {
			result.push({ name: sub.name });
		});

		return result;
	}
}
