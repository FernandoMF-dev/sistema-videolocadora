import { SituacaoLocacaoEnum } from '../enums/situacao-locacao.enum';

export class LocacaoList {
	id?: number;
	dataLocacao?: Date;
	dataDevolucaoPrevista?: Date;
	dataDevolucaoEfetiva?: Date;
	valorCobrado?: number;
	valorMulta?: number;
	situacao?: SituacaoLocacaoEnum;
	tituloItem?: string;
	nomeCliente?: string;
	idItem?: number;
	idCliente?: number;
}
