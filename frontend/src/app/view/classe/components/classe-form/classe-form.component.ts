import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
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
		this.iniciarForm();

		if (this.isEdicao) {
			this.atualizarFormEdicao();
		}
	}

	cancelar(): void {
		this.onCancelar.emit();
		this.fecharDialog();
	}

	validarSalvar(): void {
		if (!this.form.valid) {
			this.pageNotificationService.addErrorMessage(MensagemUtil.PREENCHIMENTO_OBRIGATORIO);
			return;
		}

		this.salvar();
	}

	private iniciarForm(): void {
		this.form = this.formBuilder.group({
			'id': new FormControl(null, []),
			'nome': new FormControl('', [Validators.required]),
			'valor': new FormControl(0, [Validators.required, Validators.min(0)]),
			'prazoDevolucao': new FormControl(0, [Validators.required, Validators.min(0)])
		});
	}

	private atualizarFormEdicao(): void {
		this.blockUI.start();
		this.classeService.findById<Classe>(this.classe.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => this.form.patchValue(res),
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private salvar(): void {
		const classe: Classe = Object.assign(new Classe(), this.form.value);

		if (this.isEdicao) {
			this.editar(classe);
		} else {
			this.inserir(classe);
		}
	}

	private inserir(entity: Classe): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.classeService.insert<Classe>(entity)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.INSERIR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private editar(entity: Classe): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.classeService.update<Classe>(entity, entity.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.EDITAR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private finalizarSalvar(entity: Classe): void {
		this.onSalvar.emit(entity);
		this.fecharDialog();
	}

}
