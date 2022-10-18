import { SelectItem } from 'primeng';
import { ConversionUtil } from '../../../shared/utils/conversion.util';

export class TipoItemEnum {
	public static readonly TESTE = 'TIPO_TESTE';
}

export class TipoItem {
	public static readonly TESTE = new TipoItem(TipoItemEnum.TESTE, 'Tipo de Item de Teste');

	private constructor(
		public id: TipoItemEnum,
		public label: string
	) {
	}

	public static getValues(): TipoItem[] {
		return [
			TipoItem.TESTE
		];
	}

	public static getSelectItens(): SelectItem[] {
		return ConversionUtil.arrayToSelectItens(this.getValues(), 'label', 'id');
	}

	public static findById(id: TipoItemEnum): TipoItem {
		return TipoItem.getValues().find(element => element.id === id);
	}

}
