import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectItem } from 'primeng';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { Categoria } from '../../enums/categoria.enum';
import { TituloListFilter } from '../../models/titulo-list-filter.model';

@Component({
	selector: 'app-titulo-filter',
	templateUrl: './titulo-filter.component.html',
	styleUrls: ['./titulo-filter.component.scss']
})
export class TituloFilterComponent extends DialogUtil {

	@Input() filtro: TituloListFilter = new TituloListFilter();

	@Output() onCancelar: EventEmitter<TituloListFilter> = new EventEmitter<TituloListFilter>();
	@Output() onLimpar: EventEmitter<TituloListFilter> = new EventEmitter<TituloListFilter>();
	@Output() onSalvar: EventEmitter<TituloListFilter> = new EventEmitter<TituloListFilter>();

	optionsCategoria: SelectItem[] = Categoria.getSelectItens();

	cancelar(): void {
		this.onCancelar.emit(this.filtro);
		this.fecharDialog();
	}

	limpar(): void {
		this.onLimpar.emit(this.filtro);
		this.filtro = new TituloListFilter();
	}

	salvar(): void {
		this.onSalvar.emit(this.filtro);
		this.fecharDialog();
	}

}
