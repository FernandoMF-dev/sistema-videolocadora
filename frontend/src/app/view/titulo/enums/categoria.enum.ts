import { SelectItem } from 'primeng';
import { ConversionUtil } from '../../../shared/utils/conversion.util';

export class CategoriaEnum {
	public static readonly CATEGORIA_TESTE = 'CATEGORIA_TESTE';
}

export class Categoria {
	public static readonly CATEGORIA_TESTE = new Categoria(CategoriaEnum.CATEGORIA_TESTE, 'Categoria de Teste');

	private constructor(
		public id: CategoriaEnum,
		public label: string
	) {
	}

	public static getValues(): Categoria[] {
		return [
			Categoria.CATEGORIA_TESTE
		];
	}

	public static getSelectItens(): SelectItem[] {
		return ConversionUtil.arrayToSelectItens(this.getValues(), 'label', 'id');
	}

	public static findById(id: CategoriaEnum): Categoria {
		return Categoria.getValues().find(element => element.id === id);
	}

}
