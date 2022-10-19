import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { ConversionUtil } from '../../../../shared/utils/conversion.util';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { Classe } from '../../models/classe.model';
import { ClasseService } from '../../services/classe.service';

@Component({
	selector: 'app-classe-select',
	templateUrl: './classe-select.component.html',
	styleUrls: ['./classe-select.component.scss']
})
export class ClasseSelectComponent extends DialogUtil {

	@Input() classeSelecionada: Classe;

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<Classe> = new EventEmitter<Classe>();

	classes: Page<Classe> = new Page();
	filtro: Classe = new Classe();
	loader: boolean = false;
	pageListEnum = PageListEnum;
	cols = [
		{ header: 'Nome', field: 'nome', text: true },
		{ header: 'Valor', field: 'valor', currency: true },
		{ header: 'Prazo de Devolução', field: 'prazoDevolucao', days: true }
	];

	constructor(
		private classeService: ClasseService,
		private pageNotificationService: PageNotificationService
	) {
		super();
	}

	cancelar(): void {
		this.onCancelar.emit();
		this.fecharDialog();
	}

	salvar(): void {
		this.onSalvar.emit(this.classeSelecionada);
		this.fecharDialog();
	}

	formatCurrency(value: number): string {
		return ConversionUtil.numberToCurrency(value);
	}

	buscarClasses(event?: LazyLoadEvent): void {
		this.loader = true;
		this.classeService.filter<Classe>(this.filtro, event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.classes = res,
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private fecharDialog(): void {
		this.onClose.emit();
		this.visible = false;
	}

}
