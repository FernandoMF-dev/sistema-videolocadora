import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { Diretor } from '../../models/diretor.model';
import { DiretorService } from '../../services/diretor.service';

@Component({
	selector: 'app-diretor-list',
	templateUrl: './diretor-list.component.html',
	styleUrls: ['./diretor-list.component.scss']
})
export class DiretorListComponent {

	diretores: Page<Diretor> = new Page();
	diretoresSelecionados: Diretor[] = [];
	filtro: Diretor = new Diretor();

	cols = [{ header: 'Nome', field: 'nome' }];
	pageListEnum = PageListEnum;

	constructor(
		private diretorService: DiretorService
	) {
	}

	get disableEditar(): boolean {
		return this.diretoresSelecionados.length !== 1;
	}

	get disableExcluir(): boolean {
		return !this.diretoresSelecionados.length;
	}

	buscarDiretores(event?: LazyLoadEvent): void {
		this.diretoresSelecionados = [];
		// TODO Implementar esse fluxo
	}

	inserirDiretor(): void {
		// TODO Implementar esse fluxo
	}

	editarDiretor(): void {
		// TODO Implementar esse fluxo
	}

	excluirDiretores(): void {
		// TODO Implementar esse fluxo
	}

	limparFiltro(): void {
		this.filtro = new Diretor();
		this.buscarDiretores();
	}

}
