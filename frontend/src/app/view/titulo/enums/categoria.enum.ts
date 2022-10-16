export class CategoriaEnum {
	public static readonly TESTE = 'CATEGORIA_TESTE';
}

export class Categoria {
	public static readonly TESTE = new Categoria(CategoriaEnum.TESTE, 'Teste');

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

	public static findById(id: CategoriaEnum): Categoria {
		return Categoria.getValues().find(element => element.id === id);
	}

}
