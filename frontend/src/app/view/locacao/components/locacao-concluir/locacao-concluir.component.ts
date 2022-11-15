import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { DateTimeUtil } from '../../../../shared/utils/date-time.util';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { ConcluirDevolucao } from '../../models/concluir-devolucao.model';
import { LocacaoList } from '../../models/locacao-list.model';
import { LocacaoService } from '../../services/locacao.service';

@Component({
	selector: 'app-locacao-concluir',
	templateUrl: './locacao-concluir.component.html',
	styleUrls: ['./locacao-concluir.component.scss']
})
export class LocacaoConcluirComponent extends DialogUtil implements OnInit {

	@BlockUI() blockUI: NgBlockUI;

	@Input() locacao: LocacaoList;

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<ConcluirDevolucao> = new EventEmitter<ConcluirDevolucao>();

	form: FormGroup;
	dataBr = DateTimeUtil.dataBr;
	disableValorMulta: boolean = true;

	constructor(
		private formBuilder: FormBuilder,
		private pageNotificationService: PageNotificationService,
		private locacaoService: LocacaoService
	) {
		super();
	}

	get dataDevolucao(): Date {
		return this.form.controls['dataDevolucao'].value;
	}

	get dialogHeader(): string {
		return `Concluir Devolução do item "${ this.locacao.tituloItem }"`;
	}

	ngOnInit(): void {
		this.iniciarForm();
		this.updateValorMulta();
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

	private fecharDialog(): void {
		this.visible = false;
	}

	private iniciarForm(): void {
		this.form = this.formBuilder.group({
			'id': new FormControl(this.locacao.id, [Validators.required]),
			'dataDevolucao': new FormControl(new Date(), [Validators.required]),
			'valorCobrado': new FormControl(this.locacao.valorCobrado, [Validators.required, Validators.min(0)]),
			'valorMulta': new FormControl(null, [])
		});
	}

	private salvar(): void {
		const entity: ConcluirDevolucao = Object.assign(new ConcluirDevolucao(), this.form.value);

		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.locacaoService.concluirDevolucao(entity)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				() => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.INSERIR_SUCESSO);
					this.onSalvar.emit(entity);
					this.fecharDialog();
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	updateValorMulta(): void {
		const disable: boolean = !this.dataDevolucao || DateTimeUtil.compareDate(this.dataDevolucao, this.locacao.dataDevolucaoPrevista) > 0;

		if (disable === this.disableValorMulta) {
			return;
		}

		this.disableValorMulta = disable;
		if (disable) {
			this.form.controls['valorMulta'].setValue(null);
			this.form.setValidators([]);
		} else {
			this.form.controls['valorMulta'].setValue(0);
			this.form.setValidators([Validators.required, Validators.min(0)]);
		}
	}
}
