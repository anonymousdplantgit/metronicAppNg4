import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { ThemePanelComponent } from '../layout/theme-panel/theme-panel.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent]
})
export class DashboardModule {
  constructor(public translate: TranslateService) { }
 }
