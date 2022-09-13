import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { MensagemService } from '../../../../shared/services/mensagem.service';
import { Ator } from '../../models/ator.model';
import { AtorService } from '../../services/ator.service';

@Component({
	selector: 'app-ator-list',
	templateUrl: './ator-list.component.html',
	styleUrls: ['./ator-list.component.scss']
})
export class AtorListComponent {

	atores: Page<Ator> = new Page();
	atorSelecionado: Ator;
	filtro: Ator = new Ator();

	pageListEnum = PageListEnum;
	viewAtorForm: boolean = false;
	cols = [{ header: 'Nome', field: 'nome' }];

	constructor(
		private atorService: AtorService,
		private mensagemService: MensagemService
	) {
	}

	get disableEditar(): boolean {
		return !this.atorSelecionado;
	}

	get disableExcluir(): boolean {
		return !this.atorSelecionado;
	}

	buscarAtores(event?: LazyLoadEvent): void {
		this.atorSelecionado = null;
		// TODO Implementar esse fluxo
	}

	inserirAtor(): void {
		this.atorSelecionado = null;
		this.viewAtorForm = true;
	}

	editarAtor(): void {
		this.viewAtorForm = true;
	}

	excluirAtores(): void {
		this.mensagemService.exibirMensagem(
			'EXCLUIR ATOR(ES)',
			`Tem certeza que seja excluir o/a ator/atriz "${ this.atorSelecionado.nome }"`,
			this,
			() => this.excluir()
		);
	}

	limparFiltro(): void {
		this.filtro = new Ator();
		this.buscarAtores();
	}

	private excluir(): void {
		// TODO Implementar esse fluxo
	}

}
