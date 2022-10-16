import { Ator } from '../../ator/models/ator.model';
import { Titulo } from './titulo.model';

export class TituloAtor {
	idTitulo: number;
	idAtor: number;

	titulo?: Titulo;
	ator?: Ator;
}
