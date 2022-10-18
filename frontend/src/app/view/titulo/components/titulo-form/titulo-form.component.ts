import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SelectItem } from 'primeng';
import { finalize } from 'rxjs/operators';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { MensagemUtil } from '../../../../shared/utils/mensagem.util';
import { Ator } from '../../../ator/models/ator.model';
import { Classe } from '../../../classe/models/classe.model';
import { Categoria } from '../../enums/categoria.enum';
import { Titulo } from '../../models/titulo.model';
import { TituloService } from '../../services/titulo.service';

@Component({
	selector: 'app-titulo-form',
	templateUrl: './titulo-form.component.html',
	styleUrls: ['./titulo-form.component.scss']
})
export class TituloFormComponent extends DialogUtil implements OnInit {

	@BlockUI() blockUI: NgBlockUI;

	@Input() titulo: Titulo;

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<Titulo> = new EventEmitter<Titulo>();

	form: FormGroup;
	optionsCategoria: SelectItem[] = Categoria.getSelectItens();

	viewClasseSelect: boolean = false;
	viewAtorSelect: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private pageNotificationService: PageNotificationService,
		private tituloService: TituloService
	) {
		super();
	}

	get isEdicao(): boolean {
		return !!this.titulo && !!this.titulo.id;
	}

	get tituloDialog(): string {
		return `${ this.isEdicao ? 'EDITAR' : 'NOVO' } TÍTULO`;
	}

	get classeSelecionada(): Classe {
		return this.form.controls['classe'].value;
	}

	get atoresSelecionados(): Ator[] {
		return this.form.controls['atores'].value;
	}

	ngOnInit(): void {
		this.iniciarForm();

		if (this.isEdicao) {
			this.atualizarFormEdicao();
		}
	}

	cancelar(): void {
		this.onCancelar.emit();
		this.fecharDialog();
	}

	buscarClasses(): void {
		this.viewClasseSelect = true;
	}

	buscarAtores(): void {
		this.viewAtorSelect = true;
	}

	validarSalvar(): void {
		if (!this.form.valid) {
			this.pageNotificationService.addErrorMessage(MensagemUtil.PREENCHIMENTO_OBRIGATORIO);
			return;
		}

		this.salvar();
	}

	private iniciarForm(): void {
		this.form = this.formBuilder.group({
			'id': new FormControl(null, []),
			'nome': new FormControl('', [Validators.required]),
			'sinopse': new FormControl('', []),
			'ano': new FormControl(new Date().getFullYear(), [Validators.required, Validators.min(0)]),
			'categoria': new FormControl(null, [Validators.required]),
			'classe': new FormControl(null, [Validators.required]),
			'atores': new FormControl([], [])
		});
	}

	private atualizarFormEdicao(): void {
		this.blockUI.start();
		this.tituloService.findById(this.titulo.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => this.form.patchValue(res),
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private fecharDialog(): void {
		this.onClose.emit();
		this.visible = false;
	}

	private salvar(): void {
		const titulo: Titulo = Object.assign(new Titulo(), this.form.value);

		if (this.isEdicao) {
			this.editar(titulo);
		} else {
			this.inserir(titulo);
		}
	}

	private inserir(entity: Titulo): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.tituloService.insert<Titulo>(entity)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.INSERIR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private editar(entity: Titulo): void {
		this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
		this.tituloService.update<Titulo>(entity, entity.id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(
				(res) => {
					this.pageNotificationService.addSuccessMessage(MensagemUtil.EDITAR_SUCESSO);
					this.finalizarSalvar(res);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private finalizarSalvar(entity: Titulo): void {
		this.onSalvar.emit(entity);
		this.fecharDialog();
	}

	selecionarClasse(event: Classe): void {
		this.viewClasseSelect = false;
		this.form.controls['classe'].setValue(event);
	}

	selecionarAtores(event: Ator[]): void {
		this.form.controls['atores'].setValue(event);
	}
}
