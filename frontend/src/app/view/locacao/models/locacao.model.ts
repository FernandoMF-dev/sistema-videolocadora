import { SituacaoLocacaoEnum } from '../enums/situacao-locacao.enum';

export class Locacao {
	id?: number;
	dataLocacao?: Date;
	dataDevolucaoPrevista?: Date;
	dataDevolucaoEfetiva?: Date;
	valorCobrado?: number;
	valorMulta?: number;
	situacao?: SituacaoLocacaoEnum;
	idItem?: number;
	idCliente?: number;
}
