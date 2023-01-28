import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { SelectItem } from 'primeng';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { ConversionUtil } from '../../../../shared/utils/conversion.util';
import { DateTimeUtil } from '../../../../shared/utils/date-time.util';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { Categoria, CategoriaEnum } from '../../../titulo/enums/categoria.enum';
import { TipoItem, TipoItemEnum } from '../../enums/tipo-item.enum';
import { ItemList } from '../../models/item-list.model';
import { ItemService } from '../../services/item.service';

@Component({
	selector: 'app-item-select',
	templateUrl: './item-select.component.html',
	styleUrls: ['./item-select.component.scss']
})
export class ItemSelectComponent extends DialogUtil {

	@Input() itemSelecionado: ItemList;
	@Input() locado: boolean = null;

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<ItemList> = new EventEmitter<ItemList>();

	itens: Page<ItemList> = new Page<ItemList>();
	filtro: ItemList = new ItemList();
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

	constructor(
		private itemService: ItemService,
		private pageNotificationService: PageNotificationService
	) {
		super();
	}

	cancelar(): void {
		this.onCancelar.emit();
		this.fecharDialog();
	}

	salvar(): void {
		this.onSalvar.emit(this.itemSelecionado);
		this.fecharDialog();
	}

	buscarItens(event?: LazyLoadEvent): void {
		this.loader = true;
		this.filtro.locado = this.locado;
		this.itemService.filter<ItemList>(this.filtro, event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => {
					res.content.forEach(element => element.dataAquisicao = DateTimeUtil.formatDate(element.dataAquisicao));
					this.itens = res;
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
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
}
