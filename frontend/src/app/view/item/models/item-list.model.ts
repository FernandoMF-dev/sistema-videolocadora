import { CategoriaEnum } from '../../titulo/enums/categoria.enum';
import { TipoItemEnum } from '../enums/tipo-item.enum';

export class ItemList {
	id?: number;
	numeroSerie?: number;
	nomeTitulo?: string = '';
	dataAquisicao?: Date;
	tipoItem?: TipoItemEnum;
	categoria?: CategoriaEnum;
	nomeClasse?: string = '';
	valor?: number;
	prazoDevolucao?: number;
	sinopse?: string = '';
}
