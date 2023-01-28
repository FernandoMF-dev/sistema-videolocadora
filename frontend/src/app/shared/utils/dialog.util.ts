import { EventEmitter, Input, Output } from '@angular/core';

export class DialogUtil {

	@Output() onClose = new EventEmitter<void>();
	@Output() visibleChange = new EventEmitter<boolean>();

	private _visible = false;

	@Input() get visible(): boolean {
		return this._visible;
	}

	set visible(b: boolean) {
		if (!b) {
			this.onClose.emit();
		}
		this._visible = b;
		this.visibleChange.emit(b);
	}

	protected fecharDialog(): void {
		this.visible = false;
	}

}
