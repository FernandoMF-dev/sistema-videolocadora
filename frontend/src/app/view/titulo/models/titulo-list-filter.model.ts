import { CategoriaEnum } from '../enums/categoria.enum';

export class TituloListFilter {
	nome?: string = '';
	ano?: number;
	categoria?: CategoriaEnum;
	classe?: string;
	diretor?: string;
	ator?: string;
}
