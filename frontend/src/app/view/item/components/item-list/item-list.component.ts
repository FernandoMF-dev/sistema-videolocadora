import { Component } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SelectItem } from 'primeng';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { MensagemService } from '../../../../shared/services/mensagem.service';
import { ConversionUtil } from '../../../../shared/utils/conversion.util';
import { DateTimeUtil } from '../../../../shared/utils/date-time.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { Categoria, CategoriaEnum } from '../../../titulo/enums/categoria.enum';
import { TipoItem, TipoItemEnum } from '../../enums/tipo-item.enum';
import { ItemList } from '../../models/item-list.model';
import { ItemService } from '../../services/item.service';

@Component({
	selector: 'app-item-list',
	templateUrl: './item-list.component.html',
	styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {

	@BlockUI() blockUI: NgBlockUI;

	itens: Page<ItemList> = new Page();
	filtro: ItemList = new ItemList();
	itemSelecionado: ItemList;
	loader: boolean = false;

	optionsTipoItem: SelectItem[] = TipoItem.getSelectItens();
	optionsCategoria: SelectItem[] = Categoria.getSelectItens();

	pageListEnum = PageListEnum;
	dataBr = DateTimeUtil.dataBr;
	cols = [
		{ header: 'Nº Série', field: 'numeroSerie', width: '7.5%', integer: true },
		{ header: 'Título', field: 'nomeTitulo', text: true },
		{ header: 'Aquisição', field: 'dataAquisicao', width: '10%', date: true },
		{ header: 'Tipo', field: 'tipoItem', tipoItem: true },
		{ header: 'Categoria', field: 'categoria', categoria: true },
		{ header: 'Classe', field: 'nomeClasse', text: true },
		{ header: 'Valor', field: 'valor', width: '10%', currency: true },
		{ header: 'Prazo de Devolução', field: 'prazoDevolucao', sufix: ' Dias', integer: true }
	];

	viewItemForm: boolean = false;

	constructor(
		private itemService: ItemService,
		private mensagemService: MensagemService,
		private pageNotificationService: PageNotificationService
	) {
	}

	get disableEditar(): boolean {
		return !this.itemSelecionado;
	}

	get disableExcluir(): boolean {
		return !this.itemSelecionado;
	}

	limparFiltro(): void {
		this.filtro = new ItemList();
		this.buscarItens();
	}

	inserirItem(): void {
		this.itemSelecionado = null;
		this.viewItemForm = true;
	}

	editarItem(): void {
		this.viewItemForm = true;
	}

	buscarItens(event?: LazyLoadEvent): void {
		this.loader = true;
		this.itemService.filter<ItemList>(this.filtro, event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.itens = res,
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	excluirItem(): void {
		this.mensagemService.exibirMensagem(
			'EXCLUIR ITEM',
			`Tem certeza que deseja excluir o item "[${ this.itemSelecionado.numeroSerie }] ${ this.itemSelecionado.nomeTitulo }"?`,
			this,
			() => this.excluir()
		);
	}

	formatCurrency(value: number): string {
		return ConversionUtil.numberToCurrency(value);
	}

	formatTipoItem(tipoItem: TipoItemEnum): string {
		return TipoItem.findById(tipoItem).label;
	}

	formatCategoria(categoria: CategoriaEnum): string {
		return Categoria.findById(categoria).label;
	}

	private excluir(): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_EXCLUINDO);
		this.itemService.delete(this.itemSelecionado.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				() => {
					this.pageNotificationService.addSuccessMessage('Item excluido com sucesso', 'Sucesso');
					this.buscarItens();
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}
}
