import { Component } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
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

	@BlockUI() blockUI: NgBlockUI;

	atores: Page<Ator> = new Page();
	atoresSelecionados: Ator[] = [];
	filtro: Ator = new Ator(null);
	loader: boolean = false;

	pageListEnum = PageListEnum;
	viewAtorForm: boolean = false;
	cols = [{ header: 'Nome', field: 'nome' }];

	constructor(
		private atorService: AtorService,
		private mensagemService: MensagemService,
		private pageNotificationService: PageNotificationService,
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
		if(this.filtro.nome){
			this.filtrar(event);
			return;
		}
		this.buscarTodosAtores(event);
	}

	private buscarTodosAtores(event: LazyLoadEvent): void {
		this.blockUI.start();
		this.atorService.buscarTodos(event).pipe(finalize((() => this.blockUI.stop())))
			.subscribe(res => this.atores = res);
	}

	private filtrar(event: LazyLoadEvent): void {
		this.loader = true;
		this.atorService.filtrar(new Ator(this.filtro.nome), event).pipe(finalize(() => this.loader = false))
			.subscribe(res => this.atores = res);
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
		this.filtro = new Ator(null);
		this.buscarAtores();
	}

	private excluir(): void {
		this.blockUI.start();
		this.atorService.delete(this.atorSelecionado.id).pipe(finalize(() => this.blockUI.stop()))
			.subscribe(() => {
				this.pageNotificationService.addSuccessMessage('Ator excluido com sucesso','Sucesso')
				this.buscarAtores();
			});
	}

}
