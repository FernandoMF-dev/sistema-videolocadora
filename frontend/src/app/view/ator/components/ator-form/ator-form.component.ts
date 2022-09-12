import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { Ator } from '../../models/ator.model';
import { AtorService } from '../../services/ator.service';

@Component({
	selector: 'app-ator-form',
	templateUrl: './ator-form.component.html',
	styleUrls: ['./ator-form.component.scss']
})
export class AtorFormComponent extends DialogUtil implements OnInit {

	@BlockUI() blockUI: NgBlockUI;

	@Input() ator: Ator;

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<Ator> = new EventEmitter<Ator>();

	form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private pageNotificationService: PageNotificationService,
		private atorService: AtorService
	) {
		super();
	}

	get isEdicao(): boolean {
		return !!this.ator && !!this.ator.id;
	}

	get tituloDialog(): string {
		return `${ this.isEdicao ? 'EDITAR' : 'NOVO' } ATOR`;
	}

	cancelar(): void {
		this.onCancelar.emit();
		this.fecharDialog();
	}

	ngOnInit(): void {
		this.iniciarForm();

		if (this.isEdicao) {
			this.atualizarFormEdicao();
		}
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
			'nome': new FormControl('', [Validators.required])
		});
	}

	private atualizarFormEdicao(): void {
		this.blockUI.start();
		this.atorService.findById(this.ator.id).pipe(finalize(() => this.blockUI.stop()))
			.subscribe(res => this.form.patchValue(res));
	}

	private fecharDialog(): void {
		this.onClose.emit();
		this.visible = false;
	}

	private salvar(): void {
		const ator = Object.assign(new Ator(), this.form.value);

		if (this.isEdicao) {
			this.editar(ator);
		} else {
			this.inserir(ator);
		}
	}

	private inserir(entity: Ator): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.atorService.insert<Ator>(entity)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.INSERIR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private editar(entity: Ator): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.atorService.update<Ator>(entity, entity.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.EDITAR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private finalizarSalvar(entity: Ator): void {
		this.onSalvar.emit(entity);
		this.fecharDialog();
	}

}
