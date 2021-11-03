import { Component, OnInit } from '@angular/core';
import { ThemeSwitcherService } from './shared/theme-switcher/theme-switcher.service';
import { HttpClient } from '@angular/common/http';
import testData from '../data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'usa-components';
  data = [];
  filteredData = [];
  displayedData = [];
  filter = '';
  sort = '';
  filterOptions = [];
  sortOptions = [
    {
      label: 'Most Recent',
      value: 'recent',
    },
    {
      label: 'Alphabetical',
      value: 'alphabetical',
    },
  ];
  selectedOptions = {
    filter: this.filter,
    sort: this.sort
  };
  current = 1;
  last = 3;

  constructor(
    private themeSwitcherService: ThemeSwitcherService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.themeSwitcherService.setStyle('theme', 'uswds-styles.css');
    this.data = testData;
    this.selectedOptions = {
      filter: 'all',
      sort: 'recent'
    };
    this.filterOptions = [
      { label: 'All', value: 'all' },
      ...this.createFilters(this.data),
    ];
    this.displayedData = this.data.slice(0, 10);
    this.last = Math.ceil(this.data.length / 10);
    const url =
      'https://api.forms.gov/agencydemo-prod/madeinamericawaiverrequest/submission';
    this.onSortChange(this.sortOptions[0]);
    // curl --location --request GET 'https://api.forms.gov/agencydemo-prod/madeinamericawaiverrequest/submission' --header 'x-token: <token>'
    const options = {
      // headers?: HttpHeaders | {[header: string]: string | string[]},
      // observe?: 'body' | 'events' | 'response',
      // params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
      // reportProgress?: boolean,
      // responseType?: 'arraybuffer'|'blob'|'json'|'text',
      // withCredentials?: boolean,
    };
    // https://angular.io/guide/http#requesting-data-from-a-server
    // this.http.get(url, options).subscribe((data: Config) => {
    //     this.data = data;
    //     this.last = data.length / 20
    // };
  }

  createFilters(data) {
    const uniqueRequestStatus = Array.from(
      new Set(data.map((d) => d.data.requestStatus))
    );
    return uniqueRequestStatus.map((d) => {
      return { label: d, value: d };
    });
  }
  onSortChange(selectedOption) {
    const d = this.filteredData.length > 0 ? this.filteredData : this.data
    const sortedData =
      selectedOption === 'alphabetical'
        ? d.slice().sort((a, b) =>
            a.data.procurementTitle > b.data.procurementTitle
              ? 1
              : b.data.procurementTitle > a.data.procurementTitle
              ? -1
              : 0
          )
        : d.slice().sort((a, b) =>
            a.modified > b.modified ? 1 : b.modified > a.modified ? -1 : 0
          );
    this.displayedData = sortedData.slice(0, 10);
  }

  onFilterChange(selectedOption) {
    this.filteredData =
      selectedOption === 'all'
        ? this.data
        : this.data.filter((d) => d.data.requestStatus === selectedOption);
    this.displayedData = this.filteredData.slice(0, 10);
    this.last = Math.ceil(this.filteredData.length / 10);
  }

  handleSelectedOptions($event) {

    this.filterOptions.findIndex(
          obj => Object.values(obj).includes($event.value)
        ) !== -1 ?
       this.selectedOptions = {
          filter: $event.value,
          sort: this.selectedOptions.sort
        } :
        this.selectedOptions = {
          filter: this.selectedOptions.filter,
          sort: $event.value
        }

    this.onFilterChange(this.selectedOptions.filter)
    this.onSortChange(this.selectedOptions.sort)

  }

  movePage(index) {
    const waiverIndex = (index - 1) * 10;
    const d = this.filteredData.length > 0 ? this.filteredData : this.data
    this.displayedData = d.slice(waiverIndex, waiverIndex + 10);
  }
}
