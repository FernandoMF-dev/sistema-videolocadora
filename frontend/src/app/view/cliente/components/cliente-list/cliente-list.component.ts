import { Component } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SelectItem } from 'primeng';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { NodeExpandEvent } from '../../../../shared/models/events/node-expand-collapse.event';
import { Page } from '../../../../shared/models/page.model';
import { TreeNodeModel } from '../../../../shared/models/tree-node.model';
import { MensagemService } from '../../../../shared/services/mensagem.service';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { TipoCliente, TipoClienteEnum } from '../../enums/tipo-cliente.enum';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
	selector: 'app-cliente-list',
	templateUrl: './cliente-list.component.html',
	styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent {

	@BlockUI() blockUI: NgBlockUI;

	clientes: Page<TreeNodeModel<Cliente>> = new Page();
	filtro: Cliente = new Cliente();
	clienteSelecionado: Cliente;
	loader: boolean = false;

	optionsStatus: SelectItem[] = [
		{ label: 'ATIVO', value: true },
		{ label: 'INATIVO', value: false }
	];

	pageListEnum = PageListEnum;
	cols = [
		{ header: 'Nº Inscrição', field: 'numeroInscricao', width: '10%', integer: true },
		{ header: 'Nome', field: 'nome', text: true },
		{ header: 'CPF', field: 'cpf', width: '10%', text: true },
		{ header: 'Endereço', field: 'endereco', text: true },
		{ header: 'Telefone', field: 'telefone', width: '10%', text: true },
		{ header: 'Tipo', field: 'tipoCliente', width: '10%', tipoCliente: true },
		{ header: 'Status', field: 'ativo', width: '10%', status: true }
	];

	constructor(
		private clienteService: ClienteService,
		private mensagemService: MensagemService,
		private pageNotificationService: PageNotificationService
	) {
	}

	get disableEditar(): boolean {
		return !this.clienteSelecionado || this.clienteSelecionado.tipoCliente === TipoClienteEnum.DEPENDENTE;
	}

	get disableExcluir(): boolean {
		return !this.clienteSelecionado;
	}

	formatTipoCliente(tipoItem: TipoClienteEnum): string {
		return TipoCliente.findById(tipoItem).label;
	}

	inserirCliente(): void {
		// TODO Implementar fluxo para inserir novo cliente
	}

	editarCliente(): void {
		// TODO Implementar fluxo para editar cliente selecionado
	}

	limparFiltro(): void {
		this.filtro = new Cliente();
		this.buscarClientesSocios();
	}

	buscarClientesSocios(event?: LazyLoadEvent): void {
		this.loader = true;
		this.clienteService.filterSocio(this.filtro, event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.clientes = res,
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	buscarClientesDependentes(event: NodeExpandEvent<Cliente>): void {
		this.loader = true;
		this.clienteService.filterDependente(event.node.data.id)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => {
					const socio: TreeNodeModel<Cliente> = this.clientes.content.find(element => element.data.id === event.node.data.id);
					res.forEach(element => element.parent = socio);
					socio.children = socio.children.concat(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	excluirCliente(): void {
		this.mensagemService.exibirMensagem(
			'EXCLUIR ITEM',
			`Tem certeza que seja excluir o cliente "${ this.clienteSelecionado.nome }"?`,
			this,
			() => this.excluir()
		);
	}

	private excluir(): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_EXCLUINDO);
		this.clienteService.delete(this.clienteSelecionado.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				() => {
					this.pageNotificationService.addSuccessMessage('Cliente excluido com sucesso', 'Sucesso');
					this.buscarClientesSocios();
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}
}
