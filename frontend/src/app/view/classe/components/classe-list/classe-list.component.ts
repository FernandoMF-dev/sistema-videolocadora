import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { MensagemService } from '../../../../shared/services/mensagem.service';
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
	classeSelecionada: Classe;
	filtro: Classe = new Classe();

	pageListEnum = PageListEnum;
	viewClasseForm: boolean = false;
	cols = [
		{ header: 'Nome', field: 'nome', text: true },
		{ header: 'Valor', field: 'valor', currency: true },
		{ header: 'Prazo de Devolução', field: 'prazoDevolucao', days: true }
	];

	constructor(
		private classeService: ClasseService,
		private mensagemService: MensagemService
	) {
	}

	get disableEditar(): boolean {
		return !this.classeSelecionada;
	}

	get disableExcluir(): boolean {
		return !this.classeSelecionada;
	}

	buscarClasses(event?: LazyLoadEvent): void {
		this.classeSelecionada = null;
		// TODO Implementar esse fluxo
	}

	inserirClasse(): void {
		this.classeSelecionada = null;
		this.viewClasseForm = true;
	}

	editarClasse(): void {
		this.viewClasseForm = true;
	}

	excluirClasses(): void {
		this.mensagemService.exibirMensagem(
			'EXCLUIR CLASSE(S)',
			`Tem certeza que seja excluir a classe "${ this.classeSelecionada.nome }"`,
			this,
			() => this.excluir()
		);
	}

	limparFiltro(): void {
		this.filtro = new Classe();
		this.buscarClasses();
	}

	formatCurrency(value: number): string {
		return ConversionUtil.numberToCurrency(value);
	}

	private excluir(): void {
		// TODO Implementar esse fluxo
	}

}
