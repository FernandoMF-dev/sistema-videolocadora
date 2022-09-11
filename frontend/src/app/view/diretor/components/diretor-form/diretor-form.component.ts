import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { Diretor } from '../../models/diretor.model';
import { DiretorService } from '../../services/diretor.service';

@Component({
	selector: 'app-diretor-form',
	templateUrl: './diretor-form.component.html',
	styleUrls: ['./diretor-form.component.scss']
})
export class DiretorFormComponent extends DialogUtil implements OnInit {

	@Input() diretor: Diretor;

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<Diretor> = new EventEmitter<Diretor>();

	form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private pageNotificationService: PageNotificationService,
		private diretorService: DiretorService
	) {
		super();
	}

	ngOnInit(): void {
	}

	get isEdicao(): boolean {
		return !!this.diretor && !!this.diretor.id;
	}

	get tituloDialog(): string {
		return `${ this.isEdicao ? 'EDITAR' : 'NOVO' } DIRETOR`;
	}

}
