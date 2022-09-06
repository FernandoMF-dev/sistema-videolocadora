export class ConversionUtil {

	public static numberToCurrency(num: number): string {
		return (!!num ? num : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	}

}
