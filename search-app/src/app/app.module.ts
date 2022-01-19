import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { UsaAccordionModule, USWDSDropdownModule } from 'uswds-components'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ThemeSwitcherModule } from './shared/theme-switcher/theme-switcher.module'
import { SearchResultModule } from './search-result/search-result.module'
import { PaginationComponent } from './pagination/pagination.component'

@NgModule({
  declarations: [AppComponent, PaginationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ThemeSwitcherModule,
    USWDSDropdownModule,
    UsaAccordionModule,
    SearchResultModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [PaginationComponent],
})
export class AppModule {}
