import { Titulo } from '../../titulo/models/titulo.model';
import { TipoItemEnum } from '../enums/tipo-item.enum';

export class Item {
	id?: number;
	numeroSerie?: number;
	dataAquisicao: Date;
	tipoItem: TipoItemEnum;
	idTitulo: number;

	titulo: Titulo;
}
