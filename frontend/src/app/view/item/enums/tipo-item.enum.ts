import { SelectItem } from 'primeng';
import { ConversionUtil } from '../../../shared/utils/conversion.util';

export class TipoItemEnum {
	public static readonly TIPO_ITEM_TESTE = 'TIPO_ITEM_TESTE';
}

export class TipoItem {
	public static readonly TIPO_ITEM_TESTE = new TipoItem(TipoItemEnum.TIPO_ITEM_TESTE, 'Tipo de Item de Teste');

	private constructor(
		public id: TipoItemEnum,
		public label: string
	) {
	}

	public static getValues(): TipoItem[] {
		return [
			TipoItem.TIPO_ITEM_TESTE
		];
	}

	public static getSelectItens(): SelectItem[] {
		return ConversionUtil.arrayToSelectItens(this.getValues(), 'label', 'id');
	}

	public static findById(id: TipoItemEnum): TipoItem {
		return TipoItem.getValues().find(element => element.id === id);
	}

}
