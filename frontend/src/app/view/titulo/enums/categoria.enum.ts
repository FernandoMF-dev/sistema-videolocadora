import { SelectItem } from 'primeng';
import { ConversionUtil } from '../../../shared/utils/conversion.util';

export class CategoriaEnum {
	public static readonly ACAO = 'ACAO';
	public static readonly ACAO_AVENTURA = 'ACAO_AVENTURA';
	public static readonly AVENTURA = 'AVENTURA';
	public static readonly CINEMA_ARTE = 'CINEMA_ARTE';
	public static readonly CHANCHADA = 'CHANCHADA';
	public static readonly COMEDIA = 'COMEDIA';
	public static readonly COMEDIA_ACAO = 'COMEDIA_ACAO';
	public static readonly COMEDIA_TERROR = 'COMEDIA_TERROR';
	public static readonly COMEDIA_DRAMATICA = 'COMEDIA_DRAMATICA';
	public static readonly COMEDIA_ROMANTICA = 'COMEDIA_ROMANTICA';
	public static readonly DANCA = 'DANCA';
	public static readonly DOCUMENTARIO = 'DOCUMENTARIO';
	public static readonly DOCUFICCAO = 'DOCUFICCAO';
	public static readonly DRAMA = 'DRAMA';
	public static readonly ESPIONAGEM = 'ESPIONAGEM';
	public static readonly FANTASIA = 'FANTASIA';
	public static readonly FANTASIA_CIENTIFICA = 'FANTASIA_CIENTIFICA';
	public static readonly FICCAO_CIENTIFICA = 'FICCAO_CIENTIFICA';
	public static readonly GUERRA = 'GUERRA';
	public static readonly HISTORICO = 'HISTORICO';
	public static readonly MISTERIO = 'MISTERIO';
	public static readonly MUSICAL = 'MUSICAL';
	public static readonly POLICIAL = 'POLICIAL';
	public static readonly PORNOGRAFIA = 'PORNOGRAFIA';
	public static readonly ROMANCE = 'ROMANCE';
	public static readonly SUSPENSE = 'SUSPENSE';
	public static readonly TERROR = 'TERROR';
}

export class Categoria {
	public static readonly ACAO = new Categoria(CategoriaEnum.ACAO, 'Ação');
	public static readonly ACAO_AVENTURA = new Categoria(CategoriaEnum.ACAO_AVENTURA, 'Ação e Aventura');
	public static readonly AVENTURA = new Categoria(CategoriaEnum.AVENTURA, 'Aventura');
	public static readonly CINEMA_ARTE = new Categoria(CategoriaEnum.CINEMA_ARTE, 'Cinema da arte');
	public static readonly CHANCHADA = new Categoria(CategoriaEnum.CHANCHADA, 'Chanchada');
	public static readonly COMEDIA = new Categoria(CategoriaEnum.COMEDIA, 'Comédia');
	public static readonly COMEDIA_ACAO = new Categoria(CategoriaEnum.COMEDIA_ACAO, 'Comédia de Ação');
	public static readonly COMEDIA_TERROR = new Categoria(CategoriaEnum.COMEDIA_TERROR, 'Comédia de Terror');
	public static readonly COMEDIA_DRAMATICA = new Categoria(CategoriaEnum.COMEDIA_DRAMATICA, 'Comédia dramatica');
	public static readonly COMEDIA_ROMANTICA = new Categoria(CategoriaEnum.COMEDIA_ROMANTICA, 'Comédia romântica');
	public static readonly DANCA = new Categoria(CategoriaEnum.DANCA, 'Dança');
	public static readonly DOCUMENTARIO = new Categoria(CategoriaEnum.DOCUMENTARIO, 'Documentário');
	public static readonly DOCUFICCAO = new Categoria(CategoriaEnum.DOCUFICCAO, 'Docuficção');
	public static readonly DRAMA = new Categoria(CategoriaEnum.DRAMA, 'Drama');
	public static readonly ESPIONAGEM = new Categoria(CategoriaEnum.ESPIONAGEM, 'Espionagem');
	public static readonly FANTASIA = new Categoria(CategoriaEnum.FANTASIA, 'Fantasia');
	public static readonly FANTASIA_CIENTIFICA = new Categoria(CategoriaEnum.FANTASIA_CIENTIFICA, 'Fantasia científica');
	public static readonly FICCAO_CIENTIFICA = new Categoria(CategoriaEnum.FICCAO_CIENTIFICA, 'Ficção científica');
	public static readonly GUERRA = new Categoria(CategoriaEnum.GUERRA, 'Guerra');
	public static readonly HISTORICO = new Categoria(CategoriaEnum.HISTORICO, 'Histórico');
	public static readonly MISTERIO = new Categoria(CategoriaEnum.MISTERIO, 'Mistério');
	public static readonly MUSICAL = new Categoria(CategoriaEnum.MUSICAL, 'Musical');
	public static readonly POLICIAL = new Categoria(CategoriaEnum.POLICIAL, 'Policial');
	public static readonly PORNOGRAFIA = new Categoria(CategoriaEnum.PORNOGRAFIA, 'Pornografia');
	public static readonly ROMANCE = new Categoria(CategoriaEnum.ROMANCE, 'Romance');
	public static readonly SUSPENSE = new Categoria(CategoriaEnum.SUSPENSE, 'Suspense');
	public static readonly TERROR = new Categoria(CategoriaEnum.TERROR, 'Terror');

	private constructor(
		public id: CategoriaEnum,
		public label: string
	) {
	}

	public static getValues(): Categoria[] {
		return [
			Categoria.ACAO,
			Categoria.ACAO_AVENTURA,
			Categoria.AVENTURA,
			Categoria.CINEMA_ARTE,
			Categoria.CHANCHADA,
			Categoria.COMEDIA,
			Categoria.COMEDIA_ACAO,
			Categoria.COMEDIA_TERROR,
			Categoria.COMEDIA_DRAMATICA,
			Categoria.COMEDIA_ROMANTICA,
			Categoria.DANCA,
			Categoria.DOCUMENTARIO,
			Categoria.DOCUFICCAO,
			Categoria.DRAMA,
			Categoria.ESPIONAGEM,
			Categoria.FANTASIA,
			Categoria.FANTASIA_CIENTIFICA,
			Categoria.FICCAO_CIENTIFICA,
			Categoria.GUERRA,
			Categoria.HISTORICO,
			Categoria.MISTERIO,
			Categoria.MUSICAL,
			Categoria.POLICIAL,
			Categoria.PORNOGRAFIA,
			Categoria.ROMANCE,
			Categoria.SUSPENSE,
			Categoria.TERROR
		];
	}

	public static getSelectItens(): SelectItem[] {
		return ConversionUtil.arrayToSelectItens(this.getValues(), 'label', 'id');
	}

	public static findById(id: CategoriaEnum): Categoria {
		return Categoria.getValues().find(element => element.id === id);
	}

}
