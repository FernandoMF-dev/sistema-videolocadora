import { Component, OnInit } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { PageChangeEvent } from '../../../../shared/models/events/page-change.event';
import { Page } from '../../../../shared/models/page.model';
import { MensagemService } from '../../../../shared/services/mensagem.service';
import { Ator } from '../../../ator/models/ator.model';
import { Classe } from '../../../classe/models/classe.model';
import { CategoriaEnum } from '../../enums/categoria.enum';
import { TituloAtor } from '../../models/titulo-ator.model';
import { Titulo } from '../../models/titulo.model';
import { TituloService } from '../../services/titulo.service';

@Component({
	selector: 'app-titulo-list',
	templateUrl: './titulo-list.component.html',
	styleUrls: ['./titulo-list.component.scss']
})
export class TituloListComponent implements OnInit {

	@BlockUI() blockUI: NgBlockUI;

	pageListEnum = PageListEnum;
	titulos: Page<Titulo> = new Page<Titulo>();
	tituloSelecionado: Titulo;
	carregando: boolean = false;

	constructor(
		private tituloService: TituloService,
		private mensagemService: MensagemService,
		private pageNotificationService: PageNotificationService
	) {
	}

	get disableEditar(): boolean {
		return !this.tituloSelecionado;
	}

	get disableExcluir(): boolean {
		return !this.tituloSelecionado;
	}

	ngOnInit(): void {
		this.buscarTitulos();
	}

	limparSelecao(idTitulo?: number): void {
		if (idTitulo == null || this.tituloSelecionado == null || idTitulo === this.tituloSelecionado.id) {
			this.tituloSelecionado = null;
		}
	}

	inserirTitulo(): void {
		// TODO Implementar fluxo para inserir novo título
	}

	editarTitulo(): void {
		// TODO Implementar fluxo para editar título selecionado
	}

	excluirTitulo(): void {
		// TODO Implementar fluxo para excluir título selecionado
	}

	buscarTitulos(event?: PageChangeEvent): void {
		// TODO Implementar fluxo para buscar títulos no backend

		this.limparSelecao();
		this.carregando = true;

		setTimeout(() => {
			this.teste(!!event ? event.rows : PageListEnum.INITIAL_ROWS);
			this.carregando = false;
		}, 300);
	}

	// TODO Destruir essa função
	private teste(size: number): void {
		this.titulos = new Page<Titulo>();
		this.titulos.totalElements = 0;

		for (let i = 0; i < size; i++) {
			this.titulos.totalElements++;
			this.titulos.content.push(this.criarTituloTeste());
		}
	}

	// TODO Destruir essa função
	private criarTituloTeste(): Titulo {
		const classe = new Classe();
		const titulo = new Titulo();
		const ator1 = new Ator();
		const ator2 = new Ator();
		const tituloAtor1 = new TituloAtor();
		const tituloAtor2 = new TituloAtor();

		classe.nome = `Nome Classe ${ this.titulos.totalElements }`;
		classe.prazoDevolucao = this.titulos.totalElements;
		classe.valor = this.titulos.totalElements;

		ator1.nome = `Ator ${ this.titulos.totalElements }.1`;
		ator2.nome = `Ator ${ this.titulos.totalElements }.2`;

		tituloAtor1.ator = ator1;
		tituloAtor2.ator = ator2;

		titulo.id = this.titulos.totalElements;
		titulo.nome = `Nome Título ${ this.titulos.totalElements }`;
		titulo.ano = 2000 + this.titulos.totalElements;
		titulo.sinopse = '';
		titulo.classe = classe;
		titulo.atores = [tituloAtor1, tituloAtor2];
		titulo.categoria = CategoriaEnum.TESTE;

		for (let i = 0; i < this.titulos.totalElements * 5; i++) {
			titulo.sinopse += 'Sinópse ';
		}

		return titulo;
	}
}
