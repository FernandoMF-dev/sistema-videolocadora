import { Component } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { MensagemService } from '../../../../shared/services/mensagem.service';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
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
	diretorSelecionado: Diretor;
	filtro: Diretor = new Diretor();
	loader: boolean = false;

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
		return !this.diretorSelecionado;
	}

	get disableExcluir(): boolean {
		return !this.diretorSelecionado;
	}

	buscarDiretores(event?: LazyLoadEvent): void {
		this.diretorSelecionado = null;
		if (this.filtro.nome) {
			this.filtrar(event);
			return;
		}
		this.buscarTodosDiretores(event);
	}

	private buscarTodosDiretores(event: LazyLoadEvent): void {
		this.blockUI.start();
		this.diretorService.findAll<Diretor>(event)
			.pipe(finalize((() => this.blockUI.stop())))
			.subscribe(
				(res) => this.diretores = res,
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private filtrar(event: LazyLoadEvent): void {
		this.loader = true;
		this.diretorService.filter<Diretor>(this.filtro, event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.diretores = res,
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	inserirDiretor(): void {
		this.diretorSelecionado = null;
		this.viewDiretorForm = true;
	}

	editarDiretor(): void {
		this.viewDiretorForm = true;
	}

	excluirDiretores(): void {
		this.mensagemService.exibirMensagem(
			'EXCLUIR DIRETOR(ES)',
			`Tem certeza que seja excluir o/a diretor(a) "${ this.diretorSelecionado.nome }"`,
			this,
			() => this.excluir()
		);
	}

	limparFiltro(): void {
		this.filtro = new Diretor();
		this.buscarDiretores();
	}

	private excluir(): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_EXCLUINDO);
		this.diretorService.delete(this.diretorSelecionado.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				() => {
					this.pageNotificationService.addSuccessMessage('Diretor excluido com sucesso', 'Sucesso');
					this.buscarDiretores();
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

}
