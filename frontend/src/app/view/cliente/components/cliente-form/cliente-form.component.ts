import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SelectItem } from 'primeng';
import { finalize } from 'rxjs/operators';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { TipoCliente, TipoClienteEnum } from '../../enums/tipo-cliente.enum';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
	selector: 'app-cliente-form',
	templateUrl: './cliente-form.component.html',
	styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent extends DialogUtil implements OnInit {

	@BlockUI() blockUI: NgBlockUI;

	@Input() cliente: Cliente;
	@Input() idResponsavel: number;
	@Input() tipoCliente: TipoClienteEnum = TipoClienteEnum.SOCIO;

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<Cliente> = new EventEmitter<Cliente>();

	form: FormGroup;
	responsavel: Cliente;
	optionsStatus: SelectItem[] = [
		{ label: 'ATIVO', value: true },
		{ label: 'INATIVO', value: false }
	];

	constructor(
		private formBuilder: FormBuilder,
		private pageNotificationService: PageNotificationService,
		private clienteService: ClienteService
	) {
		super();
	}

	get isEdicao(): boolean {
		return !!this.cliente && !!this.cliente.id;
	}

	get tituloDialog(): string {
		return `${ this.isEdicao ? 'EDITAR' : 'NOVO' } ${ this.formatTipoCliente(this.tipoCliente).toUpperCase() }`;
	}

	ngOnInit(): void {
		this.iniciarFormSocio();

		if (this.isEdicao) {
			this.atualizarFormEdicao();
		}

		if (this.idResponsavel) {
			this.buscarSocioResponsavel();
		}
	}

	cancelar(): void {
		this.onCancelar.emit();
		this.fecharDialog();
	}

	validarSalvar(): void {
		if (!this.form.valid) {
			this.pageNotificationService.addErrorMessage(MensagemUtil.PREENCHIMENTO_OBRIGATORIO);
			return;
		}

		this.salvar();
	}

	private formatTipoCliente(tipoItem: TipoClienteEnum): string {
		return TipoCliente.findById(tipoItem).label;
	}

	private iniciarFormSocio(): void {
		this.form = this.formBuilder.group({
			'id': new FormControl(null, []),
			'idResponsavel': new FormControl(this.idResponsavel, []),
			'numeroInscricao': new FormControl(null, []),
			'nome': new FormControl('', [Validators.required]),
			'cpf': new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
			'endereco': new FormControl('', [Validators.required]),
			'telefone': new FormControl('', [Validators.required]),
			'tipoCliente': new FormControl(this.tipoCliente, [Validators.required]),
			'ativo': new FormControl(true, [Validators.required])
		});
	}

	private atualizarFormEdicao(): void {
		this.blockUI.start();
		this.clienteService.findById<Cliente>(this.cliente.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => this.form.patchValue(res),
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private buscarSocioResponsavel(): void {
		this.clienteService.findById<Cliente>(this.idResponsavel)
			.subscribe(
				(res) => this.responsavel = res,
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private salvar(): void {
		const entity: Cliente = Object.assign(new Cliente(), this.form.value);

		if (this.isEdicao) {
			this.editar(entity);
		} else {
			this.inserir(entity);
		}
	}

	private inserir(entity: Cliente): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.clienteService.insert<Cliente>(entity)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.INSERIR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private editar(entity: Cliente): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.clienteService.update<Cliente>(entity, entity.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.EDITAR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

	private finalizarSalvar(entity: Cliente): void {
		this.onSalvar.emit(entity);
		this.fecharDialog();
	}

}
