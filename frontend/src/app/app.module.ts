import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorModule, SecurityModule, VersionTagModule } from '@nuvem/angular-base';
import { BreadcrumbModule, ErrorStackModule, MenuModule, PageNotificationModule } from '@nuvem/primeng-components';
import { BlockUIModule } from 'ng-block-ui';
import { ConfirmationService } from 'primeng';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiarioErrosComponent } from './components/diario-erros/diario-erros.component';
import { AppFooterComponent } from './components/footer/app.footer.component';
import { AppTopbarComponent } from './components/topbar/app.topbar.component';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localePt);

@NgModule({
	declarations: [
		AppComponent,
		AppTopbarComponent,
		AppFooterComponent,
		DiarioErrosComponent
	],
	imports: [
		BlockUIModule.forRoot({ message: 'Carregando...' }),
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
		HttpClientModule,
		PageNotificationModule,
		BreadcrumbModule,
		ErrorStackModule,
		ErrorModule,
		VersionTagModule,
		SecurityModule.forRoot(environment.auth),
		MenuModule
	],
	providers: [
		ConfirmationService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: LOCALE_ID, useValue: 'pt-BR' }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
