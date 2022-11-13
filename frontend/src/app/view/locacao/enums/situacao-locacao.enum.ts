import { SelectItem } from 'primeng';
import { ConversionUtil } from '../../../shared/utils/conversion.util';

export class SituacaoLocacaoEnum {
	public static readonly ABERTO = 'ABERTO';
	public static readonly DEVOLVIDO = 'DEVOLVIDO';
	public static readonly CANCELADO = 'CANCELADO';
}

export class SituacaoLocacao {

	public static readonly ABERTO = new SituacaoLocacao(SituacaoLocacaoEnum.ABERTO, 'Aberto');
	public static readonly DEVOLVIDO = new SituacaoLocacao(SituacaoLocacaoEnum.DEVOLVIDO, 'Devolvido');
	public static readonly CANCELADO = new SituacaoLocacao(SituacaoLocacaoEnum.CANCELADO, 'Cancelado');

	private constructor(
		public id: SituacaoLocacaoEnum,
		public label: string
	) {
	}

	public static getValues(): SituacaoLocacao[] {
		return [
			SituacaoLocacao.ABERTO,
			SituacaoLocacao.DEVOLVIDO,
			SituacaoLocacao.CANCELADO
		];
	}

	public static getSelectItens(): SelectItem[] {
		return ConversionUtil.arrayToSelectItens(this.getValues(), 'label', 'id');
	}

	public static findById(id: SituacaoLocacaoEnum): SituacaoLocacao {
		return SituacaoLocacao.getValues().find(element => element.id === id);
	}

}
