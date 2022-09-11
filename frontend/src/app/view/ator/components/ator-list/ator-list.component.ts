import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { Ator } from '../../models/ator.model';
import { AtorService } from '../../services/ator.service';

@Component({
	selector: 'app-ator-list',
	templateUrl: './ator-list.component.html',
	styleUrls: ['./ator-list.component.scss']
})
export class AtorListComponent {

	atores: Page<Ator> = new Page();
	atoresSelecionados: Ator[] = [];
	filtro: Ator = new Ator();

	cols = [{ header: 'Nome', field: 'nome' }];
	pageListEnum = PageListEnum;

	constructor(
		private atorService: AtorService
	) {
	}

	get disableEditar(): boolean {
		return this.atoresSelecionados.length !== 1;
	}

	get disableExcluir(): boolean {
		return !this.atoresSelecionados.length;
	}

	buscarAtores(event?: LazyLoadEvent): void {
		this.atoresSelecionados = [];
		// TODO Implementar esse fluxo
	}

	inserirAtor(): void {
		// TODO Implementar esse fluxo
	}

	editarAtor(): void {
		// TODO Implementar esse fluxo
	}

	excluirAtores(): void {
		// TODO Implementar esse fluxo
	}

	limparFiltro(): void {
		this.filtro = new Ator();
		this.buscarAtores();
	}

}
