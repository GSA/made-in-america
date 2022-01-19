import { Component, OnInit } from '@angular/core'
import { ThemeSwitcherService } from './shared/theme-switcher/theme-switcher.service'
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ThemeSwitcherService],
})
export class AppComponent implements OnInit {
  title = 'usa-components'
  data = []
  filteredData = []
  displayedData = []
  filter = ''
  sort = ''
  filterOptions = []
  last = 0
  sortOptions = [
    {
      label: 'Most Recent',
      value: 'recent',
    },
    {
      label: 'Alphabetical',
      value: 'alphabetical',
    },
  ]
  selectedOptions = {
    filter: this.filter,
    sort: this.sort,
  }
  current = 1

  constructor(private themeSwitcherService: ThemeSwitcherService) {}

  ngOnInit() {
    environment.production === false &&
      this.themeSwitcherService.setStyle('theme', 'uswds-styles.css')

    this.selectedOptions = {
      filter: 'all',
      sort: 'recent',
    }
    const url = `https://api.github.com/repos/GSA/made-in-america-data/contents/waivers-data.json?ref=${environment.dataBranch}`
    fetch(url)
      .then(response => response.json())
      .then(({ content }) => {
        const dataString = decodeURIComponent(
          Array.prototype.map
            .call(
              atob(content),
              c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            )
            .join('')
        )
        this.data = JSON.parse(dataString)
        this.filterOptions = [
          { label: 'All', value: 'all' },
          ...this.createFilters(this.data),
        ]
        this.displayedData = this.data.slice(0, 10)
        this.last = Math.ceil(this.data.length / 10)
      })
      .then(() => {
        this.onSortChange(this.sortOptions[0])
      })
  }

  createFilters(data) {
    const uniqueRequestStatus = Array.from(
      new Set(data.map(d => d.data.requestStatus))
    )
    return uniqueRequestStatus.map(d => ({ label: d, value: d }))
  }

  onSortChange(selectedOption) {
    const currentData =
      this.filteredData.length > 0 ? this.filteredData : this.data
    const sortedData =
      selectedOption === 'alphabetical'
        ? this.sortAlphabetically(currentData)
        : this.sortChronologically(currentData)
    this.filteredData = sortedData
    this.displayedData = this.filteredData.slice(0, 10)
  }

  sortAlphabetically(data) {
    return data
      .slice()
      .sort(
        (
          { data: { procurementTitle: procurementTitle1 } },
          { data: { procurementTitle: procurementTitle2 } }
        ) =>
          procurementTitle1 > procurementTitle2
            ? 1
            : procurementTitle2 > procurementTitle1
            ? -1
            : 0
      )
  }

  sortChronologically(data) {
    return data
      .slice()
      .sort(({ created: created1 }, { created: created2 }) =>
        created1 > created2 ? -1 : created1 < created2 ? 1 : 0
      )
  }

  onFilterChange(selectedOption) {
    this.filteredData =
      selectedOption === 'all'
        ? this.data
        : this.data.filter(d => d.data.requestStatus === selectedOption)
    this.displayedData = this.filteredData.slice(0, 10)
    this.last = Math.ceil(this.filteredData.length / 10)
  }

  handleSelectedOptions($event) {
    this.filterOptions.findIndex(obj =>
      Object.values(obj).includes($event.value)
    ) !== -1
      ? (this.selectedOptions = {
          filter: $event.value,
          sort: this.selectedOptions.sort,
        })
      : (this.selectedOptions = {
          filter: this.selectedOptions.filter,
          sort: $event.value,
        })
    this.onFilterChange(this.selectedOptions.filter)
    this.onSortChange(this.selectedOptions.sort)
    this.movePage(1)
  }

  movePage(index) {
    this.current = index
    const waiverIndex = (index - 1) * 10
    const d = this.filteredData.length > 0 ? this.filteredData : this.data
    this.displayedData = d.slice(waiverIndex, waiverIndex + 10)
  }
}
