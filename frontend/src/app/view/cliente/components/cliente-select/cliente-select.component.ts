import { Component, EventEmitter, Output } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { SelectItem } from 'primeng';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { NodeExpandEvent } from '../../../../shared/models/events/node-expand-collapse.event';
import { Page } from '../../../../shared/models/page.model';
import { TreeNodeModel } from '../../../../shared/models/tree-node.model';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { TipoCliente, TipoClienteEnum } from '../../enums/tipo-cliente.enum';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
	selector: 'app-cliente-select',
	templateUrl: './cliente-select.component.html',
	styleUrls: ['./cliente-select.component.scss']
})
export class ClienteSelectComponent extends DialogUtil {

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<Cliente> = new EventEmitter<Cliente>();

	clientes: Page<TreeNodeModel<Cliente>> = new Page();
	filtro: Cliente = new Cliente();
	clienteSelecionado: TreeNodeModel<Cliente>;
	loader: boolean = false;

	optionsStatus: SelectItem[] = [
		{ label: 'ATIVO', value: true },
		{ label: 'INATIVO', value: false }
	];

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
		private pageNotificationService: PageNotificationService
	) {
		super();
	}

	get selectedValue(): Cliente {
		if (!this.clienteSelecionado || !this.clienteSelecionado.data) {
			return null;
		}

		return this.clienteSelecionado.data;
	}

	cancelar(): void {
		this.onCancelar.emit();
		this.fecharDialog();
	}

	salvar(): void {
		this.onSalvar.emit(this.selectedValue);
		this.fecharDialog();
	}

	formatTipoCliente(tipoItem: TipoClienteEnum): string {
		if (tipoItem) {
			return TipoCliente.findById(tipoItem).label;
		}
		return '';
	}

	buscarClientesSocios(event?: LazyLoadEvent): void {
		this.loader = true;
		this.clienteSelecionado = null;
		this.clienteService.filtrarSocioTree(this.filtro, event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.clientes = res,
				(err) => this.pageNotificationService.addErrorMessage(err.message)
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
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private fecharDialog(): void {
		this.onClose.emit();
		this.visible = false;
	}

}
