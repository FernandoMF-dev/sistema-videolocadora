import { NgModule } from '@angular/core';
import { PRIMENG_IMPORTS } from './imports/primeng-imports';

@NgModule({
	imports: [
		PRIMENG_IMPORTS
	],
	providers: [],
	exports: [
		PRIMENG_IMPORTS
	]
})
export class SharedModule {
}
