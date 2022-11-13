import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { DateTimeUtil } from '../../../../shared/utils/date-time.util';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { Cliente } from '../../../cliente/models/cliente.model';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { Item } from '../../../item/models/item.model';
import { ItemService } from '../../../item/services/item.service';
import { LocacaoList } from '../../models/locacao-list.model';
import { Locacao } from '../../models/locacao.model';
import { LocacaoService } from '../../services/locacao.service';

@Component({
	selector: 'app-locacao-form',
	templateUrl: './locacao-form.component.html',
	styleUrls: ['./locacao-form.component.scss']
})
export class LocacaoFormComponent extends DialogUtil implements OnInit {

	@BlockUI() blockUI: NgBlockUI;

	@Input() locacao: Locacao | LocacaoList;

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<Locacao> = new EventEmitter<Locacao>();

	form: FormGroup;
	item: Item;
	cliente: Cliente;
	dataBr = DateTimeUtil.dataBr;

	viewItemSelect: boolean = false;
	viewClienteSelect: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private pageNotificationService: PageNotificationService,
		private locacaoService: LocacaoService,
		private clienteService: ClienteService,
		private itemService: ItemService
	) {
		super();
	}

	get isEdicao(): boolean {
		return !!this.locacao && !!this.locacao.id;
	}

	get tituloDialog(): string {
		return `${ this.isEdicao ? 'EDITAR' : 'NOVO' } LOCACAO`;
	}

	ngOnInit(): void {
		this.iniciarForm();

		if (this.isEdicao) {
			this.atualizarFormEdicao();
		}
	}

	buscarItem(): void {
		this.viewItemSelect = true;
	}


	buscarCliente(): void {
		this.viewClienteSelect = true;
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
			'dataLocacao': new FormControl(new Date(), [Validators.required]),
			'dataDevolucaoPrevista': new FormControl(null, [Validators.required]),
			'dataDevolucaoEfetiva': new FormControl(null, [Validators.required]),
			'valorCobrado': new FormControl(null, [Validators.required]),
			'idItem': new FormControl(null, [Validators.required]),
			'idCliente': new FormControl(null, [Validators.required])
		});
	}

	private atualizarFormEdicao(): void {
		this.blockUI.start();
		this.locacaoService.findById<Locacao>(this.locacao.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					res.dataLocacao = new Date(res.dataLocacao);
					res.dataDevolucaoPrevista = new Date(res.dataDevolucaoPrevista);
					res.dataDevolucaoEfetiva = new Date(res.dataDevolucaoEfetiva);
					this.form.patchValue(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private fecharDialog(): void {
		this.onClose.emit();
		this.visible = false;
	}

	private salvar(): void {
		const locacao: Locacao = Object.assign(new Locacao(), this.form.value);

		if (this.isEdicao) {
			this.editar(locacao);
		} else {
			this.inserir(locacao);
		}
	}

	private inserir(entity: Locacao): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.locacaoService.insert<Locacao>(entity)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.INSERIR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private editar(entity: Locacao): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.locacaoService.update<Locacao>(entity, entity.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.EDITAR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private finalizarSalvar(entity: Locacao): void {
		this.onSalvar.emit(entity);
		this.fecharDialog();
	}
}
