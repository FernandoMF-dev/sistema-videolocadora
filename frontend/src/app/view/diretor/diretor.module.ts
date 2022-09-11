import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DiretorFormComponent } from './components/diretor-form/diretor-form.component';
import { DiretorListComponent } from './components/diretor-list/diretor-list.component';
import { DiretorRoutingModule } from './diretor-routing.module';
import { DiretorService } from './services/diretor.service';


@NgModule({
	declarations: [
		DiretorListComponent,
		DiretorFormComponent
	],
	imports: [
		CommonModule,
		DiretorRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		DiretorService
	]
})
export class DiretorModule {
}
