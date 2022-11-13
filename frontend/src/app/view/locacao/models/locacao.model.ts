import { Cliente } from '../../cliente/models/cliente.model';
import { Item } from '../../item/models/item.model';
import { SituacaoLocacaoEnum } from '../enums/situacao-locacao.enum';

export class Locacao {
	id?: number;
	dataLocacao?: Date;
	dataDevolucaoPrevista?: Date;
	dataDevolucaoEfetiva?: Date;
	valorCobrado?: number;
	valorMulta?: number;
	situacao?: SituacaoLocacaoEnum;
	item?: Item;
	cliente?: Cliente;
}
