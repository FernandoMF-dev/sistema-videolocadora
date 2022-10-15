import { Component, OnInit } from '@angular/core';
import { PageNotificationService } from '@nuvem/primeng-components';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PageListEnum } from '../../../../shared/enums/page-list.enum';
import { MensagemService } from '../../../../shared/services/mensagem.service';
import { TituloService } from '../../services/titulo.service';

@Component({
	selector: 'app-titulo-list',
	templateUrl: './titulo-list.component.html',
	styleUrls: ['./titulo-list.component.scss']
})
export class TituloListComponent implements OnInit {

	@BlockUI() blockUI: NgBlockUI;

	pageListEnum = PageListEnum;

	constructor(
		private tituloService: TituloService,
		private mensagemService: MensagemService,
		private pageNotificationService: PageNotificationService
	) {
	}

	ngOnInit(): void {
	}

}
