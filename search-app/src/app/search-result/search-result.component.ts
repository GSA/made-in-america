/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, Input } from '@angular/core'

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styles: [],
})
export class SearchResultComponent {
  @Input() data: number

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line class-methods-use-this
  mapPiids = piids => {
    const piidString = piids.map(x => x.piid).join(', ')
    return piidString === '' ? 'N/A' : piidString
  }
}
