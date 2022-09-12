import { NgModule } from '@angular/core';
import { FormSubmitMsgDirective } from './directive/form-submit-msg.directive';
import { PRIMENG_IMPORTS } from './imports/primeng-imports';
import { MensagemService } from './services/mensagem.service';

@NgModule({
	imports: [
		PRIMENG_IMPORTS
	],
	providers: [
		MensagemService
	],
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
