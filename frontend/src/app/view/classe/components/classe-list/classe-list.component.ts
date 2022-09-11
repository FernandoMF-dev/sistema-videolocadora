import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { ConversionUtil } from '../../../../shared/utils/conversion.util';
import { Classe } from '../../models/classe.model';
import { ClasseService } from '../../services/classe.service';

@Component({
	selector: 'app-classe-list',
	templateUrl: './classe-list.component.html',
	styleUrls: ['./classe-list.component.scss']
})
export class ClasseListComponent {

	classes: Page<Classe> = new Page();
	classesSelecionados: Classe[] = [];
	filtro: Classe = new Classe();

	cols = [
		{ header: 'Nome', field: 'nome', text: true },
		{ header: 'Valor', field: 'valor', currency: true },
		{ header: 'Prazo de Devolução', field: 'prazoDevolucao', days: true }
	];
	pageListEnum = PageListEnum;

	constructor(
		private classeService: ClasseService
	) {
	}

	get disableEditar(): boolean {
		return this.classesSelecionados.length !== 1;
	}

	get disableExcluir(): boolean {
		return !this.classesSelecionados.length;
	}

	buscarClasses(event?: LazyLoadEvent): void {
		this.classesSelecionados = [];
		// TODO Implementar esse fluxo
	}

	inserirClasse(): void {
		// TODO Implementar esse fluxo
	}

	editarClasse(): void {
		// TODO Implementar esse fluxo
	}

	excluirClasses(): void {
		// TODO Implementar esse fluxo
	}

	limparFiltro(): void {
		this.filtro = new Classe();
		this.buscarClasses();
	}

	formatCurrency(value: number): string {
		return ConversionUtil.numberToCurrency(value);
	}

}
