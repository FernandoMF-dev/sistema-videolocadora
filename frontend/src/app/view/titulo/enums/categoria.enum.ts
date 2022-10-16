import { SelectItem } from 'primeng';
import { ConversionUtil } from '../../../shared/utils/conversion.util';

export class CategoriaEnum {
	public static readonly TESTE = 'CATEGORIA_TESTE';
}

export class Categoria {
	public static readonly TESTE = new Categoria(CategoriaEnum.TESTE, 'Categoria de Teste');

	private constructor(
		public id: CategoriaEnum,
		public label: string
	) {
	}

	public static getValues(): Categoria[] {
		return [
			Categoria.TESTE
		];
	}

	public static getSelectItens(): SelectItem[] {
		return ConversionUtil.arrayToSelectItens(this.getValues(), 'label', 'id');
	}

	public static findById(id: CategoriaEnum): Categoria {
		return Categoria.getValues().find(element => element.id === id);
	}

}
