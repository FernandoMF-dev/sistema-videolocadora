import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { Classe } from '../../models/classe.model';
import { ClasseService } from '../../services/classe.service';

@Component({
	selector: 'app-classe-form',
	templateUrl: './classe-form.component.html',
	styleUrls: ['./classe-form.component.scss']
})
export class ClasseFormComponent extends DialogUtil implements OnInit {

	@BlockUI() blockUI: NgBlockUI;

	@Input() classe: Classe;

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<Classe> = new EventEmitter<Classe>();

	form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private pageNotificationService: PageNotificationService,
		private classeService: ClasseService
	) {
		super();
	}

	get isEdicao(): boolean {
		return !!this.classe && !!this.classe.id;
	}

	get tituloDialog(): string {
		return `${ this.isEdicao ? 'EDITAR' : 'NOVO' } CLASSE`;
	}


	ngOnInit(): void {
	}

}
