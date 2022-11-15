import { LocaleSettings } from 'primeng';

export class DateTimeUtil {

	public static readonly dataBr: LocaleSettings = {
		firstDayOfWeek: 1,
		dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
		dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
		dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
		monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
		today: 'Hoje',
		clear: 'Limpar',
		dateFormat: 'dd/mm/yy',
		weekHeader: 'Sem'
	};

	public static formatDate(date: Date | string | number): Date {
		if (date == null || date.toString().trim() === '') {
			return null;
		}
		return date instanceof Date ? new Date(date.getTime()) : new Date(`${ date }T00:00:00-03:00`);
	}

	public static addDays(date: Date, days: number = 1) {
		const result = new Date(date.valueOf());
		result.setDate(result.getDate() + days);
		return result;
	}

	public static compareDate(a: Date, b: Date): number {
		const _a = new Date(a.setHours(0, 0, 0, 0));
		const _b = new Date(b.setHours(0, 0, 0, 0));

		return _a.getTime() - _b.getTime();
	}

}
