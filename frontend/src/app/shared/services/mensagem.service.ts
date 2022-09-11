import { Injectable } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng';
import { MensagemUtil } from '../utils/mensagem.util';

@Injectable({
	providedIn: 'root'
})
export class MensagemService {

	constructor(
		private confirmationService: ConfirmationService
	) {
	}

	private static montarMensagem(titulo: string, mensagem: string): Confirmation {
		return {
			message: mensagem,
			header: titulo,
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: MensagemUtil.OK,
			rejectVisible: false,
			acceptVisible: true
		};
	}

	exibirMensagem(titulo: string, mensagem: string, componente?: Object, accept?: (...args) => void, reject?: (...args) => void): void {
		const confirmation: Confirmation = MensagemService.montarMensagem(titulo, mensagem);

		if (accept) {
			confirmation.acceptLabel = MensagemUtil.SIM;
			confirmation.rejectLabel = MensagemUtil.NAO;
			confirmation.rejectVisible = true;
			confirmation.accept = () => accept.bind(componente)();

			if (reject) {
				confirmation.reject = () => reject.bind(componente)();
			}
		}

		this.confirmationService.confirm(confirmation);
	}

}
