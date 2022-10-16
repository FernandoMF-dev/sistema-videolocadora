import { Classe } from '../../classe/models/classe.model';
import { CategoriaEnum } from '../enums/categoria.enum';
import { TituloAtor } from './titulo-ator.model';

export class Titulo {
	id?: number;
	nome?: string = '';
	sinopse?: string = '';
	ano?: number;
	categoria?: CategoriaEnum;
	classe?: Classe;
	atores?: TituloAtor[] = [];
}
