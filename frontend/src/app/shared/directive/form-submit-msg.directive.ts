import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
	selector: '[appFormSubmitMsg]'
})
export class FormSubmitMsgDirective {

	@Input() formGroup: FormGroup;

	constructor() {
	}

	static markAsTouched(formGroup: FormGroup): void {
		formGroup.markAsTouched();
		formGroup.markAsDirty();
		formGroup.updateValueAndValidity();
		(<any>Object).values(formGroup.controls).forEach(
			control => {
				control.markAsTouched();
				control.markAsDirty();
				control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
				if (control.controls) {
					FormSubmitMsgDirective.markAsTouched(control);
				}
			});
	}

	@HostListener('click', ['$event'])
	handleClickEvent(event) {
		FormSubmitMsgDirective.markAsTouched(this.formGroup);
	}

}
