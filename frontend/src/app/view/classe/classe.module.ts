import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ClasseRoutingModule } from './classe-routing.module';
import { ClasseListComponent } from './components/classe-list/classe-list.component';
import { ClasseService } from './services/classe.service';


@NgModule({
	declarations: [
		ClasseListComponent
	],
	imports: [
		CommonModule,
		ClasseRoutingModule,
		SharedModule
	],
	providers: [
		ClasseService
	]
})
export class ClasseModule {
}
