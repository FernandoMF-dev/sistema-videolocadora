import { Component } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { MensagemService } from '../../../../shared/services/mensagem.service';
import { ConversionUtil } from '../../../../shared/utils/conversion.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { Classe } from '../../models/classe.model';
import { ClasseService } from '../../services/classe.service';

@Component({
	selector: 'app-classe-list',
	templateUrl: './classe-list.component.html',
	styleUrls: ['./classe-list.component.scss']
})
export class ClasseListComponent {

	@BlockUI() blockUI: NgBlockUI;

	classes: Page<Classe> = new Page();
	classeSelecionada: Classe;
	filtro: Classe = new Classe();
	loader: boolean = false;

	pageListEnum = PageListEnum;
	viewClasseForm: boolean = false;
	cols = [
		{ header: 'Nome', field: 'nome', text: true },
		{ header: 'Valor', field: 'valor', currency: true },
		{ header: 'Prazo de Devolução', field: 'prazoDevolucao', sufix: ' Dias', integer: true }
	];

	constructor(
		private classeService: ClasseService,
		private mensagemService: MensagemService,
		private pageNotificationService: PageNotificationService
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
		this.loader = true;
		this.classeService.filter<Classe>(this.filtro, event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.classes = res,
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
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
			'EXCLUIR CLASSE',
			`Tem certeza que deseja excluir a classe "${ this.classeSelecionada.nome }"?`,
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
		this.blockUI.start(MensagemUtil.BLOCKUI_EXCLUINDO);
		this.classeService.delete(this.classeSelecionada.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				() => {
					this.pageNotificationService.addSuccessMessage('Classe excluida com sucesso', 'Sucesso');
					this.buscarClasses();
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

}
