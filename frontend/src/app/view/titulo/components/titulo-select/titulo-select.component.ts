import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { SelectItem } from 'primeng';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { Page } from '../../../../shared/models/page.model';
import { DialogUtil } from '../../../../shared/utils/dialog.util';
import { Categoria, CategoriaEnum } from '../../enums/categoria.enum';
import { Titulo } from '../../models/titulo.model';
import { TituloService } from '../../services/titulo.service';

@Component({
	selector: 'app-titulo-select',
	templateUrl: './titulo-select.component.html',
	styleUrls: ['./titulo-select.component.scss']
})
export class TituloSelectComponent extends DialogUtil {

	@Input() tituloSelecionado: Titulo;

	@Output() onCancelar: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSalvar: EventEmitter<Titulo> = new EventEmitter<Titulo>();

	titulos: Page<Titulo> = new Page<Titulo>();
	filtro: Titulo = new Titulo();
	loader: boolean = false;
	pageListEnum = PageListEnum;
	cols = [
		{ header: 'Nome', field: 'nome', text: true },
		{ header: 'Ano', field: 'ano', text: true },
		{ header: 'Categoria', field: 'categoria', categoria: true },
		{ header: 'Classe', field1: 'classe', field2: 'nome', double: true }
	];

	optionsCategoria: SelectItem[] = Categoria.getSelectItens();

	constructor(
		private tituloService: TituloService,
		private pageNotificationService: PageNotificationService
	) {
		super();
	}

	cancelar(): void {
		this.onCancelar.emit();
		this.fecharDialog();
	}

	salvar(): void {
		this.onSalvar.emit(this.tituloSelecionado);
		this.fecharDialog();
	}

	formatCategoria(categoria: CategoriaEnum): string {
		return Categoria.findById(categoria).label;
	}

	buscarTitulos(event?: LazyLoadEvent): void {
		this.loader = true;
		this.tituloService.filterSelect<Titulo>(this.filtro, event)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.titulos = res,
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}

}
