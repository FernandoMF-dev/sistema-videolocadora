import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DiretorListComponent } from './components/diretor-list/diretor-list.component';
import { DiretorRoutingModule } from './diretor-routing.module';
import { DiretorService } from './services/diretor.service';


@NgModule({
	declarations: [
		DiretorListComponent
	],
	imports: [
		CommonModule,
		DiretorRoutingModule,
		SharedModule
	],
	providers: [
		DiretorService
	]
})
export class DiretorModule {
}
