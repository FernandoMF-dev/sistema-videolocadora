import { Component } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
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

	@BlockUI() blockUI: NgBlockUI;

	classes: Page<Classe> = new Page();
	classesSelecionados: Classe[] = [];
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
		private mensagemService: MensagemService,
		private pageNotificationService: PageNotificationService
	) {
	}

	get disableEditar(): boolean {
		return this.classesSelecionados.length !== 1;
	}

	get disableExcluir(): boolean {
		return !this.classesSelecionados.length;
	}

	get classeSelecionado(): Classe {
		if (this.classesSelecionados.length < 1) {
			return null;
		}
		return this.classesSelecionados[0];
	}

	get mensagemExcluirClasses(): string {
		return 'Tem certeza que seja excluir a(s) classe(s)' +
			this.classesSelecionados.map(value => `<em>"${ value.nome }"</em>`).join(', ') +
			'?';
	}

	buscarClasses(event?: LazyLoadEvent): void {
		this.classesSelecionados = [];
		this.blockUI.start()
		this.classeService.buscarTodos(event).pipe(finalize((()=> this.blockUI.stop())))
			.subscribe(res => {
				this.classes = res
			});	}

	inserirClasse(): void {
		this.classesSelecionados = [];
		this.viewClasseForm = true;
	}

	editarClasse(): void {
		this.viewClasseForm = true;
	}

	excluirClasses(): void {
		this.mensagemService.exibirMensagem(
			'EXCLUIR CLASSE(S)',
			this.mensagemExcluirClasses,
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
		this.blockUI.start();
		this.classeService.delete(this.classeSelecionado.id).pipe(finalize(() => this.blockUI.stop()))
			.subscribe(() => {
				this.pageNotificationService.addSuccessMessage('Classe excluida com sucesso','Sucesso')
				this.buscarClasses();
			});	}

}
