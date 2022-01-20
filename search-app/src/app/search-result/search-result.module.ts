import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
// eslint-disable-next-line import/no-unresolved
import { UsaAccordionModule } from 'uswds-components'
import { SearchResultComponent } from './search-result.component'

@NgModule({
  imports: [CommonModule, UsaAccordionModule],
  declarations: [SearchResultComponent],
  exports: [SearchResultComponent],
})
// eslint-disable-next-line import/prefer-default-export
export class SearchResultModule {}
