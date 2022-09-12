import { Component } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
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

	@BlockUI() blockUI: NgBlockUI;

	diretores: Page<Diretor> = new Page();
	diretoresSelecionados: Diretor[] = [];
	filtro: Diretor = new Diretor();

	pageListEnum = PageListEnum;
	viewDiretorForm: boolean = false;
	cols = [{ header: 'Nome', field: 'nome' }];

	constructor(
		private diretorService: DiretorService,
		private mensagemService: MensagemService,
		private pageNotificationService: PageNotificationService
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

	get mensagemExcluirDiretores(): string {
		return 'Tem certeza que seja excluir o(s) diretor(es)' +
			this.diretoresSelecionados.map(value => `<em>"${ value.nome }"</em>`).join(', ') +
			'?';
	}

	buscarDiretores(event?: LazyLoadEvent): void {
		this.diretoresSelecionados = [];
		this.blockUI.start()
		this.diretorService.buscarTodos(event).pipe(finalize((()=> this.blockUI.stop())))
			.subscribe(res => {
				this.diretores = res
			});
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
			this.mensagemExcluirDiretores,
			this,
			() => this.excluir()
		);
	}

	limparFiltro(): void {
		this.filtro = new Diretor();
		this.buscarDiretores();
	}

	private excluir(): void {
		this.blockUI.start();
		this.diretorService.delete(this.diretorSelecionado.id).pipe(finalize(() => this.blockUI.stop()))
			.subscribe(() => {
				this.pageNotificationService.addSuccessMessage('Diretor excluido com sucesso','Sucesso')
				this.buscarDiretores();
			});	}

}
