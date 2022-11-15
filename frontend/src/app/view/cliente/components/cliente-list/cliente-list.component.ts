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
	clienteSelecionado: TreeNodeModel<Cliente>;
	loader: boolean = false;

	optionsStatus: SelectItem[] = [
		{ label: 'ATIVO', value: true },
		{ label: 'INATIVO', value: false }
	];

	viewClienteForm: boolean = false;
	responsavelClienteForm: Partial<Cliente>;
	tipoClienteClienteForm: TipoClienteEnum;

	pageListEnum = PageListEnum;
	cols = [
		{ header: 'Nº Inscrição', field: 'numeroInscricao', width: '15%', integer: true },
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
		return !this.clienteSelecionado;
	}

	get disableAtribuirDependente(): boolean {
		return this.disableEditar || this.clienteSelecionado.data.tipoCliente !== TipoClienteEnum.SOCIO;
	}

	get disableExcluir(): boolean {
		return !this.clienteSelecionado;
	}

	formatTipoCliente(tipoItem: TipoClienteEnum): string {
		if (tipoItem) {
			return TipoCliente.findById(tipoItem).label;
		}
		return '';
	}

	inserirCliente(): void {
		this.clienteSelecionado = null;
		this.responsavelClienteForm = null;
		this.tipoClienteClienteForm = TipoClienteEnum.SOCIO;
		this.viewClienteForm = true;
	}

	editarCliente(): void {
		this.responsavelClienteForm = null;
		this.tipoClienteClienteForm = this.clienteSelecionado.data.tipoCliente;

		if (this.tipoClienteClienteForm === TipoClienteEnum.DEPENDENTE) {
			this.responsavelClienteForm = { id: this.clienteSelecionado.data.idResponsavel };
		}

		this.viewClienteForm = true;
	}

	atribuirDependente(): void {
		this.responsavelClienteForm = this.clienteSelecionado.data;
		this.clienteSelecionado = null;
		this.tipoClienteClienteForm = TipoClienteEnum.DEPENDENTE;
		this.viewClienteForm = true;
	}

	patchAtivo(): void {
		this.clienteSelecionado.data.ativo = !this.clienteSelecionado.data.ativo;
		this.clienteService.patchAtivo(this.clienteSelecionado.data.id, this.clienteSelecionado.data.ativo).subscribe();
	}

	limparFiltro(): void {
		this.filtro = new Cliente();
		this.buscarClientesSocios();
	}

	buscarClientesSocios(event?: LazyLoadEvent): void {
		this.loader = true;
		this.clienteSelecionado = null;
		this.clienteService.filtrarSocioTree(this.filtro, event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.clientes = res,
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	buscarClientesDependentes(event: NodeExpandEvent<Cliente>): void {
		this.loader = true;
		this.clienteService.buscarDependentesPorResponsavelTree(event.node.data.id)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => {
					const socio: TreeNodeModel<Cliente> = this.clientes.content.find(element => element.data.id === event.node.data.id);
					res.forEach(element => element.parent = socio);
					socio.children = res;
					this.clientes.content = [...this.clientes.content];
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	excluirCliente(): void {
		this.mensagemService.exibirMensagem(
			'EXCLUIR ITEM',
			`Tem certeza que deseja excluir o cliente "${ this.clienteSelecionado.data.nome }"?`,
			this,
			() => this.excluir()
		);
	}

	private excluir(): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_EXCLUINDO);
		this.clienteService.delete(this.clienteSelecionado.data.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				() => {
					this.pageNotificationService.addSuccessMessage('Cliente excluido com sucesso', 'Sucesso');
					this.buscarClientesSocios();
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}
}
