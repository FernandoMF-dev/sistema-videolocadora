import { Component, OnInit } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { PageChangeEvent } from '../../../../shared/models/events/page-change.event';
import { Page } from '../../../../shared/models/page.model';
import { MensagemService } from '../../../../shared/services/mensagem.service';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
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
	loader: boolean = false;
	viewTituloForm: boolean = false;

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
		this.tituloSelecionado = null;
		this.viewTituloForm = true;
	}

	editarTitulo(): void {
		this.viewTituloForm = true;
	}

	excluirTitulo(): void {
		this.mensagemService.exibirMensagem(
			'EXCLUIR TÍTULO',
			`Tem certeza que seja excluir o título "${ this.tituloSelecionado.nome }"`,
			this,
			() => this.excluir()
		);
	}

	buscarTitulos(event?: PageChangeEvent): void {
		this.limparSelecao();
		this.loader = true;

		this.tituloService.findAll<Titulo>(event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.titulos = res,
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private excluir(): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_EXCLUINDO);
		this.tituloService.delete(this.tituloSelecionado.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				() => {
					this.pageNotificationService.addSuccessMessage('Título excluido com sucesso', 'Sucesso');
					this.buscarTitulos();
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

}
