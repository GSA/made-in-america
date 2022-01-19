import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UsaAccordionModule } from 'uswds-components'
import { SearchResultComponent } from './search-result.component'

@NgModule({
  imports: [CommonModule, UsaAccordionModule],
  declarations: [SearchResultComponent],
  exports: [SearchResultComponent],
})
export class SearchResultModule {}
