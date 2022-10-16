import { SelectItem } from 'primeng';

export class ConversionUtil {

	public static numberToCurrency(num: number): string {
		return (!!num ? num : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	}

	public static arrayToSelectItens(array: object[], label: string, value: string = label): SelectItem[] {
		return array.map(element => this.objectToSelectItens(element, label, value));
	}

	public static objectToSelectItens(obj: object, label: string, value: string = label): SelectItem {
		return {
			label: obj[label],
			value: obj[value]
		};
	}

}
