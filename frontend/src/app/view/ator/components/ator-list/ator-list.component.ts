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
	atoresSelecionados: Ator[] = [];
	filtro: Ator = new Ator();

	cols = [{ header: 'Nome', field: 'nome' }];
	pageListEnum = PageListEnum;
	viewAtorForm: boolean = false;

	constructor(
		private atorService: AtorService,
		private mensagemService: MensagemService
	) {
	}

	get disableEditar(): boolean {
		return this.atoresSelecionados.length !== 1;
	}

	get disableExcluir(): boolean {
		return !this.atoresSelecionados.length;
	}

	get atorSelecionado(): Ator {
		if (this.atoresSelecionados.length < 1) {
			return null;
		}
		return this.atoresSelecionados[0];
	}

	get mensagemExcluirAtores(): string {
		return 'Tem certeza que seja excluir o(s) ator(es)' +
			this.atoresSelecionados.map(value => `<em>"${ value.nome }"</em>`).join(', ') +
			'?';
	}

	buscarAtores(event?: LazyLoadEvent): void {
		this.atoresSelecionados = [];
		// TODO Implementar esse fluxo
	}

	inserirAtor(): void {
		this.atoresSelecionados = [];
		this.viewAtorForm = true;
	}

	editarAtor(): void {
		this.viewAtorForm = true;
	}

	excluirAtores(): void {
		this.mensagemService.exibirMensagem(
			'EXCLUIR ATOR(ES)',
			this.mensagemExcluirAtores,
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
