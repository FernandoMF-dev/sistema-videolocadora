import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { MensagemService } from '../../../../shared/services/mensagem.service';
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
	viewDiretorForm: boolean = false;

	constructor(
		private diretorService: DiretorService,
		private mensagemService: MensagemService
	) {
	}

	get disableEditar(): boolean {
		return this.diretoresSelecionados.length !== 1;
	}

	get disableExcluir(): boolean {
		return !this.diretoresSelecionados.length;
	}

	get diretorSelecionado(): Diretor {
		if (this.diretoresSelecionados.length < 1) {
			return null;
		}
		return this.diretoresSelecionados[0];
	}

	get mensagemExcluirAtores(): string {
		return 'Tem certeza que seja excluir o(s) diretor(es)' +
			this.diretoresSelecionados.map(value => `<em>"${ value.nome }"</em>`).join(', ') +
			'?';
	}

	buscarDiretores(event?: LazyLoadEvent): void {
		this.diretoresSelecionados = [];
		// TODO Implementar esse fluxo
	}

	inserirDiretor(): void {
		this.diretoresSelecionados = [];
		this.viewDiretorForm = true;
	}

	editarDiretor(): void {
		this.viewDiretorForm = true;
	}

	excluirDiretores(): void {
		this.mensagemService.exibirMensagem(
			'EXCLUIR DIRETOR(ES)',
			this.mensagemExcluirAtores,
			this,
			() => this.excluir()
		);
	}

	limparFiltro(): void {
		this.filtro = new Diretor();
		this.buscarDiretores();
	}

	private excluir(): void {
		// TODO Implementar esse fluxo
	}

}
