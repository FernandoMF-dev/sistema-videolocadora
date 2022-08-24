import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AtorRoutingModule } from './ator-routing.module';
import { AtorListComponent } from './components/ator-list/ator-list.component';


@NgModule({
	declarations: [AtorListComponent],
	imports: [
		CommonModule,
		AtorRoutingModule
	]
})
export class AtorModule {
}
