import { SelectItem } from 'primeng';
import { ConversionUtil } from '../../../shared/utils/conversion.util';

export class TipoItemEnum {
	public static readonly FLOPPY_DISK = 'FLOPPY_DISK';
	public static readonly DISQUETE = 'DISQUETE';
	public static readonly FITA = 'FITA';
	public static readonly CD = 'CD';
	public static readonly DVD = 'DVD';
	public static readonly BLURAY = 'BLURAY';
	public static readonly OUTRO = 'OUTRO';
}

export class TipoItem {
	public static readonly FLOPPY_DISK = new TipoItem(TipoItemEnum.FLOPPY_DISK, 'Floppy disk');
	public static readonly DISQUETE = new TipoItem(TipoItemEnum.DISQUETE, 'Disquete');
	public static readonly FITA = new TipoItem(TipoItemEnum.FITA, 'Fita cassete');
	public static readonly CD = new TipoItem(TipoItemEnum.CD, 'CD');
	public static readonly DVD = new TipoItem(TipoItemEnum.DVD, 'DVD');
	public static readonly BLURAY = new TipoItem(TipoItemEnum.BLURAY, 'Blu-ray');
	public static readonly OUTRO = new TipoItem(TipoItemEnum.OUTRO, 'Outro');

	private constructor(
		public id: TipoItemEnum,
		public label: string
	) {
	}

	public static getValues(): TipoItem[] {
		return [
			TipoItem.FLOPPY_DISK,
			TipoItem.DISQUETE,
			TipoItem.FITA,
			TipoItem.CD,
			TipoItem.DVD,
			TipoItem.BLURAY,
			TipoItem.OUTRO
		];
	}

	public static getSelectItens(): SelectItem[] {
		return ConversionUtil.arrayToSelectItens(this.getValues(), 'label', 'id');
	}

	public static findById(id: TipoItemEnum): TipoItem {
		return TipoItem.getValues().find(element => element.id === id);
	}

}
