import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { Ator } from '../../models/ator.model';
import { AtorService } from '../../services/ator.service';

@Component({
	selector: 'app-ator-select',
	templateUrl: './ator-select.component.html',
	styleUrls: ['./ator-select.component.scss']
})
export class AtorSelectComponent extends DialogUtil {

	@Input() atoresSelecionados: Ator[] = [];

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<Ator[]> = new EventEmitter<Ator[]>();

	atores: Page<Ator> = new Page();
	filtro: Ator = new Ator();
	loader: boolean = false;

	pageListEnum = PageListEnum;
	cols = [{ header: 'Nome', field: 'nome' }];

	constructor(
		private atorService: AtorService,
		private pageNotificationService: PageNotificationService
	) {
		super();
	}

	cancelar(): void {
		this.onCancelar.emit();
		this.fecharDialog();
	}

	salvar(): void {
		this.onSalvar.emit(this.atoresSelecionados);
		this.fecharDialog();
	}

	removerAtor(id: number): void {
		this.atoresSelecionados = this.atoresSelecionados.filter(element => element.id !== id);
	}

	buscarAtores(event?: LazyLoadEvent): void {
		this.loader = true;
		this.atorService.filter<Ator>(this.filtro, event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.atores = res,
				(err) => this.pageNotificationService.addErrorMessage(err.message)
			);
	}

	private fecharDialog(): void {
		this.onClose.emit();
		this.visible = false;
	}
}
