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

  currentRoute = window.location.pathname

  // eslint-disable-next-line no-useless-constructor
  constructor(private themeSwitcherService: ThemeSwitcherService) {} // only kicks on the styles for local dev

  static sortChronologically(data) {
    return data.slice().sort(({ created: created1 }, { created: created2 }) => {
      if (created1 > created2) {
        return -1
      }
      if (created1 < created2) {
        return 1
      }
      return 0
    })
  }

  static sortAlphabetically(data) {
    return data
      .slice()
      .sort(
        (
          { data: { procurementTitle: procurementTitle1 } },
          { data: { procurementTitle: procurementTitle2 } }
        ) => procurementTitle1.localeCompare(procurementTitle2)
      )
  }

  static createFilters(data) {
    const uniqueRequestStatus = Array.from(
      new Set(data.map(d => d.data.requestStatus))
    )
    return uniqueRequestStatus.map(d => ({ label: d, value: d }))
  }

  ngOnInit() {
    if (environment.production === false) {
      this.themeSwitcherService.setStyle('theme', 'uswds-styles.css')
    }

    this.selectedOptions = {
      filter: 'all',
      sort: 'recent',
    }
    const requestURL = window.location.pathname.includes('/waivers/')
      ? `https://api.github.com/repos/GSA/made-in-america-data/contents/waivers-data-updated.json?ref=${environment.dataBranch}`
      : `https://api.github.com/repos/GSA/made-in-america-data/contents/urgent-waivers-data.json?ref=${environment.urgentBranch}`

    const waiversCsvUrl = `https://api.github.com/repos/GSA/made-in-america-data/contents/waivers.csv?ref=${environment.dataBranch}`
    fetch(waiversCsvUrl)
      .then(response => response.json())
      .then(({ content }) => {
        const dataString = decodeURIComponent(
          Array.prototype.map
            .call(
              atob(content),
              c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
            )
            .join('')
        )
        const a = document.getElementById('waivers-download')
        const file = new Blob([dataString], { type: 'text' })
        a.setAttribute('href', URL.createObjectURL(file))
        a.setAttribute('download', 'waivers.csv')
      })

    fetch(requestURL)
      .then(response => response.json())
      .then(({ content }) => {
        const dataString = decodeURIComponent(
          Array.prototype.map
            .call(
              atob(content),
              c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
            )
            .join('')
        )
        this.data = JSON.parse(dataString)
        this.filterOptions = [
          { label: 'All', value: 'all' },
          ...AppComponent.createFilters(this.data),
        ]
        this.displayedData = this.data.slice(0, 10)
        this.last = Math.ceil(this.data.length / 10)
      })
      .then(() => {
        this.onSortChange(this.sortOptions[0])
      })
  }

  onSortChange(selectedOption) {
    const currentData =
      this.filteredData.length > 0 ? this.filteredData : this.data
    const sortedData =
      selectedOption === 'alphabetical'
        ? AppComponent.sortAlphabetically(currentData)
        : AppComponent.sortChronologically(currentData)
    this.filteredData = sortedData
    this.displayedData = this.filteredData.slice(0, 10)
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
    if (
      this.filterOptions.findIndex(obj =>
        Object.values(obj).includes($event.value)
      ) !== -1
    ) {
      this.selectedOptions = {
        filter: $event.value,
        sort: this.selectedOptions.sort,
      }
    } else {
      this.selectedOptions = {
        filter: this.selectedOptions.filter,
        sort: $event.value,
      }
    }
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
