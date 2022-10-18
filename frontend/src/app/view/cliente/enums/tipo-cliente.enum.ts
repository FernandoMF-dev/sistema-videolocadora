import { SelectItem } from 'primeng';
import { ConversionUtil } from '../../../shared/utils/conversion.util';

export class TipoClienteEnum {
	public static readonly SOCIO = 'SOCIO';
	public static readonly DEPENDENTE = 'DEPENDENTE';
}

export class TipoCliente {
	public static readonly SOCIO = new TipoCliente(TipoClienteEnum.SOCIO, 'Sócio');
	public static readonly DEPENDENTE = new TipoCliente(TipoClienteEnum.DEPENDENTE, 'Dependente');

	private constructor(
		public id: TipoClienteEnum,
		public label: string
	) {
	}

	public static getValues(): TipoCliente[] {
		return [
			TipoCliente.SOCIO,
			TipoCliente.DEPENDENTE
		];
	}

	public static getSelectItens(): SelectItem[] {
		return ConversionUtil.arrayToSelectItens(this.getValues(), 'label', 'id');
	}

	public static findById(id: TipoClienteEnum): TipoCliente {
		return TipoCliente.getValues().find(element => element.id === id);
	}

}
