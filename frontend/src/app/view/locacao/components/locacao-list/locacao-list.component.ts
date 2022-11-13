import { Component } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SelectItem } from 'primeng';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { MensagemService } from '../../../../shared/services/mensagem.service';
import { ConversionUtil } from '../../../../shared/utils/conversion.util';
import { DateTimeUtil } from '../../../../shared/utils/date-time.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { SituacaoLocacao, SituacaoLocacaoEnum } from '../../enums/situacao-locacao.enum';
import { LocacaoList } from '../../models/locacao-list.model';
import { LocacaoService } from '../../services/locacao.service';

@Component({
	selector: 'app-locacao-list',
	templateUrl: './locacao-list.component.html',
	styleUrls: ['./locacao-list.component.scss']
})
export class LocacaoListComponent {

	@BlockUI() blockUI: NgBlockUI;

	locacoes: Page<LocacaoList> = new Page();
	filtro: LocacaoList = new LocacaoList();
	locacaoSelecionada: LocacaoList;
	loader: boolean = false;

	optionsSituacaoLocacao: SelectItem[] = SituacaoLocacao.getSelectItens();

	pageListEnum = PageListEnum;
	dataBr = DateTimeUtil.dataBr;
	cols = [
		{ header: 'Item - Título', field: 'tituloItem', text: true },
		{ header: 'Cliente', field: 'nomeCliente', text: true },
		{ header: 'Locação', field: 'dataLocacao', width: '10%', date: true },
		{ header: 'Devolução (Prevista)', field: 'dataDevolucaoPrevista', width: '10%', date: true },
		{ header: 'Devolução (Efetiva)', field: 'dataDevolucaoEfetiva', width: '10%', date: true },
		{ header: 'Valor', field: 'valorCobrado', width: '10%', currency: true },
		{ header: 'Multa', field: 'valorMulta', width: '10%', currency: true },
		{ header: 'Situação', field: 'situacao', situacaoLocacao: true }
	];

	viewLocacaoForm: boolean = false;

	constructor(
		private locacaoService: LocacaoService,
		private mensagemService: MensagemService,
		private pageNotificationService: PageNotificationService
	) {
	}

	get disableEditar(): boolean {
		return !this.locacaoSelecionada || this.locacaoSelecionada.situacao !== SituacaoLocacaoEnum.ABERTO;
	}

	get disableDevolucao(): boolean {
		return !this.locacaoSelecionada || this.locacaoSelecionada.situacao !== SituacaoLocacaoEnum.ABERTO;
	}

	get disableCancelar(): boolean {
		return !this.locacaoSelecionada || this.locacaoSelecionada.situacao !== SituacaoLocacaoEnum.ABERTO;
	}

	limparFiltro(): void {
		this.filtro = new LocacaoList();
		this.buscarLocacoes();
	}

	inserirLocacao(): void {
		this.locacaoSelecionada = null;
		this.viewLocacaoForm = true;
	}

	editarLocacao(): void {
		this.viewLocacaoForm = true;
	}

	buscarLocacoes(event?: LazyLoadEvent): void {
		this.loader = true;
		this.locacaoService.filter<LocacaoList>(this.filtro, event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.locacoes = res,
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	formatCurrency(value: number): string {
		return ConversionUtil.numberToCurrency(value);
	}

	formatSituacaoLocacao(situacaoLocacao: SituacaoLocacaoEnum): string {
		return SituacaoLocacao.findById(situacaoLocacao).label;
	}

	verificarConcluirDevolucao(): void {
		this.mensagemService.exibirMensagem(
			'DEVOLUÇÃO',
			`Concluir a devolução do item "${ this.locacaoSelecionada.tituloItem }"?`,
			this,
			() => this.concluirDevolucao()
		);
	}

	verificarCancelarLocacao(): void {
		this.mensagemService.exibirMensagem(
			'CANCELAR LOCAÇÃO',
			`Tem certeza que deseja cancelar a locação do item "${ this.locacaoSelecionada.tituloItem }"?`,
			this,
			() => this.cancelarLocacao()
		);
	}

	private concluirDevolucao(): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
		this.locacaoService.concluirDevolucao(this.locacaoSelecionada.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				() => this.buscarLocacoes(),
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private cancelarLocacao(): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_CANCELANDO);
		this.locacaoService.delete(this.locacaoSelecionada.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				() => this.buscarLocacoes(),
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

}
