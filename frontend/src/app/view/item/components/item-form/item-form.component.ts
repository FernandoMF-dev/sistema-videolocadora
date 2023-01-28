import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SelectItem } from 'primeng';
import { finalize } from 'rxjs/operators';
import { DateTimeUtil } from '../../../../shared/utils/date-time.util';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { Categoria, CategoriaEnum } from '../../../titulo/enums/categoria.enum';
import { Titulo } from '../../../titulo/models/titulo.model';
import { TituloService } from '../../../titulo/services/titulo.service';
import { TipoItem } from '../../enums/tipo-item.enum';
import { ItemList } from '../../models/item-list.model';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
	selector: 'app-item-form',
	templateUrl: './item-form.component.html',
	styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent extends DialogUtil implements OnInit {

	@BlockUI() blockUI: NgBlockUI;

	@Input() item: Item | ItemList;

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<Item> = new EventEmitter<Item>();

	form: FormGroup;
	titulo: Titulo;
	dataBr = DateTimeUtil.dataBr;
	optionsTipoItem: SelectItem[] = TipoItem.getSelectItens();

	viewTituloSelect: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private pageNotificationService: PageNotificationService,
		private itemService: ItemService,
		private tituloService: TituloService
	) {
		super();
	}

	get isEdicao(): boolean {
		return !!this.item && !!this.item.id;
	}

	get tituloDialog(): string {
		return `${ this.isEdicao ? 'EDITAR' : 'NOVO' } ITEM`;
	}

	ngOnInit(): void {
		this.iniciarForm();

		if (this.isEdicao) {
			this.atualizarTituloEdicao();
			this.atualizarFormEdicao();
		}
	}

	buscarTitulos(): void {
		this.viewTituloSelect = true;
	}

	formatCategoria(categoria: CategoriaEnum): string {
		return Categoria.findById(categoria).label;
	}

	cancelar(): void {
		this.onCancelar.emit();
		this.fecharDialog();
	}

	selecionarTitulo(event: Titulo): void {
		this.titulo = event;
		this.form.patchValue({ 'idTitulo': event.id });
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
			'numeroSerie': new FormControl(null, [Validators.required]),
			'dataAquisicao': new FormControl(new Date(), [Validators.required]),
			'tipoItem': new FormControl(null, [Validators.required]),
			'idTitulo': new FormControl(null, [Validators.required])
		});
	}

	private atualizarFormEdicao(): void {
		this.blockUI.start();
		this.itemService.findById<Item>(this.item.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					res.dataAquisicao = DateTimeUtil.formatDate(res.dataAquisicao);
					this.form.patchValue(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private atualizarTituloEdicao(): void {
		this.blockUI.start();
		this.tituloService.findById<Titulo>(this.item.idTitulo)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => this.selecionarTitulo(res),
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private salvar(): void {
		const item: Item = Object.assign(new Item(), this.form.value);

		if (this.isEdicao) {
			this.editar(item);
		} else {
			this.inserir(item);
		}
	}

	private inserir(entity: Item): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.itemService.insert<Item>(entity)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.INSERIR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private editar(entity: Item): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.itemService.update<Item>(entity, entity.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.EDITAR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private finalizarSalvar(entity: Item): void {
		this.onSalvar.emit(entity);
		this.fecharDialog();
	}
}
