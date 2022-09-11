import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AtorRoutingModule } from './ator-routing.module';
import { AtorFormComponent } from './components/ator-form/ator-form.component';
import { AtorListComponent } from './components/ator-list/ator-list.component';
import { AtorService } from './services/ator.service';


@NgModule({
	declarations: [
		AtorListComponent,
		AtorFormComponent
	],
	imports: [
		CommonModule,
		AtorRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		AtorService
	]
})
export class AtorModule {
}
