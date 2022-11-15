import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { DateTimeUtil } from '../../../../shared/utils/date-time.util';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { TipoCliente, TipoClienteEnum } from '../../../cliente/enums/tipo-cliente.enum';
import { Cliente } from '../../../cliente/models/cliente.model';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { TipoItem, TipoItemEnum } from '../../../item/enums/tipo-item.enum';
import { ItemList } from '../../../item/models/item-list.model';
import { ItemService } from '../../../item/services/item.service';
import { Categoria, CategoriaEnum } from '../../../titulo/enums/categoria.enum';
import { SituacaoLocacaoEnum } from '../../enums/situacao-locacao.enum';
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
	item: ItemList;
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
		return `${ this.isEdicao ? 'EDITAR' : 'NOVA' } LOCAÇÃO`;
	}

	get dataDevolucaoPrevista(): Date {
		return this.form.controls['dataDevolucaoPrevista'].value;
	}

	ngOnInit(): void {
		this.iniciarForm();

		if (this.isEdicao) {
			this.atualizarItemEdicao();
			this.atualizarClienteEdicao();
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

	formatTipoItem(tipoItem: TipoItemEnum): string {
		return TipoItem.findById(tipoItem).label;
	}

	formatCategoria(categoria: CategoriaEnum): string {
		return Categoria.findById(categoria).label;
	}

	formatTipoCliente(tipoItem: TipoClienteEnum): string {
		return TipoCliente.findById(tipoItem).label;
	}

	private iniciarForm(): void {
		this.form = this.formBuilder.group({
			'id': new FormControl(null, []),
			'dataLocacao': new FormControl(new Date(), [Validators.required]),
			'dataDevolucaoPrevista': new FormControl(null, [Validators.required]),
			'situacao': new FormControl(SituacaoLocacaoEnum.ABERTO, [Validators.required]),
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
					res.dataLocacao = DateTimeUtil.formatDate(res.dataLocacao);
					res.dataDevolucaoPrevista = DateTimeUtil.formatDate(res.dataDevolucaoPrevista);
					res.dataDevolucaoEfetiva = DateTimeUtil.formatDate(res.dataDevolucaoEfetiva);
					this.form.patchValue(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private atualizarItemEdicao(): void {
		this.blockUI.start();
		this.itemService.findByIdAsList(this.locacao.idItem)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => this.selecionarItem(res),
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private atualizarClienteEdicao(): void {
		this.blockUI.start();
		this.clienteService.findById<Cliente>(this.locacao.idCliente)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => this.selecionarCliente(res),
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

	selecionarItem(event: ItemList): void {
		this.item = event;
		this.form.patchValue({
			'idItem': event.id,
			'valorCobrado': event.valor
		});
		this.atualizarDataDevolucao();
	}

	atualizarDataDevolucao(): void {
		if (!this.form.controls['dataLocacao'].value || !this.item || !this.item.prazoDevolucao) {
			this.form.controls['dataDevolucaoPrevista'].setValue(null);
			return;
		}

		const devolucao = DateTimeUtil.addDays(this.form.controls['dataLocacao'].value, this.item.prazoDevolucao);
		this.form.controls['dataDevolucaoPrevista'].setValue(devolucao);
	}

	selecionarCliente(event: Cliente): void {
		this.cliente = event;
		this.form.patchValue({ 'idCliente': event.id });
	}
}
