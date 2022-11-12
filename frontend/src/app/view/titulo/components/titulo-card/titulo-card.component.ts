import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConversionUtil } from '../../../../shared/utils/conversion.util';
import { Categoria } from '../../enums/categoria.enum';
import { Titulo } from '../../models/titulo.model';

@Component({
	selector: 'app-titulo-card',
	templateUrl: './titulo-card.component.html',
	styleUrls: ['./titulo-card.component.scss']
})
export class TituloCardComponent {
	@Input() value: Titulo;
	@Output() selectedChange = new EventEmitter<boolean>();
	@Output() onSelect = new EventEmitter<Titulo>();
	@Output() onUnselect = new EventEmitter<Titulo>();

	private _selected: boolean = false;

	@Input() get selected(): boolean {
		return this._selected;
	}

	set selected(value: boolean) {
		if (this._selected === value) {
			return;
		}

		this._selected = value;
		this.selectedChange.emit(value);
		(value ? this.onSelect : this.onUnselect).emit(this.value);
	}

	getCategoriaLabel(): string {
		return Categoria.findById(this.value.categoria).label;
	}

	getClasseValor(): string {
		return ConversionUtil.numberToCurrency(this.value.classe.valor);
	}

	toogleSelected(value: boolean = !this.selected): void {
		this.selected = value;
	}

}
