import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { Diretor } from '../../models/diretor.model';
import { DiretorService } from '../../services/diretor.service';

@Component({
	selector: 'app-diretor-form',
	templateUrl: './diretor-form.component.html',
	styleUrls: ['./diretor-form.component.scss']
})
export class DiretorFormComponent extends DialogUtil implements OnInit {

	@BlockUI() blockUI: NgBlockUI;

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

	get isEdicao(): boolean {
		return !!this.diretor && !!this.diretor.id;
	}

	get tituloDialog(): string {
		return `${ this.isEdicao ? 'EDITAR' : 'NOVO' } DIRETOR`;
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
		this.diretorService.findById<Diretor>(this.diretor.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => this.form.patchValue(res),
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private fecharDialog(): void {
		this.onClose.emit();
		this.visible = false;
	}

	private salvar(): void {
		const diretor = Object.assign(new Diretor(), this.form.value);

		if (this.isEdicao) {
			this.editar(diretor);
		} else {
			this.inserir(diretor);
		}
	}

	private inserir(entity: Diretor): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.diretorService.insert<Diretor>(entity)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.INSERIR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private editar(entity: Diretor): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.diretorService.update<Diretor>(entity, entity.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.EDITAR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private finalizarSalvar(entity: Diretor): void {
		this.onSalvar.emit(entity);
		this.fecharDialog();
	}

}
