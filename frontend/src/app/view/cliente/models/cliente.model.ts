import { TipoClienteEnum } from '../enums/tipo-cliente.enum';

export class Cliente {
	id?: number;
	numeroInscricao?: number;
	nome?: string = '';
	cpf?: string = '';
	endereco?: string = '';
	telefone?: string = '';
	tipoCliente?: TipoClienteEnum;
	ativo?: boolean = true;

	idResponsavel?: number;
}
