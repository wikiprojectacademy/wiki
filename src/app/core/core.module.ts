import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [],
	imports: [HttpClientModule],
	exports: []
})
export class CoreModule {
	// It will throw error, in console, if you try to import CoreModule somewhere else than AppModule
	constructor(@Optional() @SkipSelf() core: CoreModule) {
		if (core) {
			throw new Error('You should import core module only in the root module');
		}
	}
}
