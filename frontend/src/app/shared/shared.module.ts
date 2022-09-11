import { NgModule } from '@angular/core';
import { FormSubmitMsgDirective } from './directive/form-submit-msg.directive';
import { PRIMENG_IMPORTS } from './imports/primeng-imports';

@NgModule({
	imports: [
		PRIMENG_IMPORTS
	],
	providers: [],
	exports: [
		PRIMENG_IMPORTS,
		FormSubmitMsgDirective
	],
	declarations: [
		FormSubmitMsgDirective
	]
})
export class SharedModule {
}
