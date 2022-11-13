import { SelectItem } from 'primeng';
import { ConversionUtil } from '../../../shared/utils/conversion.util';

export class SituacaoLocacaoEnum {
	public static readonly ABERTO = 'ABERTO';
	public static readonly PAGO = 'PAGO';
	public static readonly CANCELADO = 'CANCELADO';
}

export class SituacaoLocacao {

	public static readonly ABERTO = new SituacaoLocacao(SituacaoLocacaoEnum.ABERTO, 'Aberto');
	public static readonly PAGO = new SituacaoLocacao(SituacaoLocacaoEnum.PAGO, 'Pago');
	public static readonly CANCELADO = new SituacaoLocacao(SituacaoLocacaoEnum.CANCELADO, 'Cancelado');

	private constructor(
		public id: SituacaoLocacaoEnum,
		public label: string
	) {
	}

	public static getValues(): SituacaoLocacao[] {
		return [
			SituacaoLocacao.ABERTO,
			SituacaoLocacao.PAGO,
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
