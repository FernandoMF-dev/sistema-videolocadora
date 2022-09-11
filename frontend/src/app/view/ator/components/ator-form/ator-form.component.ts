import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { Ator } from '../../models/ator.model';

@Component({
	selector: 'app-ator-form',
	templateUrl: './ator-form.component.html',
	styleUrls: ['./ator-form.component.scss']
})
export class AtorFormComponent extends DialogUtil implements OnInit {

	@Input() ator: Ator;

	form: FormGroup;

	constructor(
		private formBuilder: FormBuilder
	) {
		super();
	}

	get isEdicao(): boolean {
		return !!this.ator && !!this.ator.id;
	}

	get tituloDialog(): string {
		return `${ this.isEdicao ? 'EDITAR' : 'CADASTRAR' } ATOR`;
	}

	ngOnInit(): void {
	}

}
