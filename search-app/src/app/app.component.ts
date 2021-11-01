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
  displayedData = [];
  filter = null;
  sort = 'value1';
  filterOptions = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Submitted',
      value: 'submitted',
    },
    {
      label: 'Reviewed',
      value: 'reviewed',
    },
  ];

  sortOptions = [
    {
      label: 'Most Recent',
      value: 'value1',
    },
    {
      label: 'Alphabetical',
      value: 'value2',
    },
  ];
  selectedOption = '';
  current = 1;
  last = 3;

  constructor(
    private themeSwitcherService: ThemeSwitcherService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.themeSwitcherService.setStyle('theme', 'uswds-styles.css');
    this.data = testData;
    this.displayedData = this.data.slice(0, 10);
    this.last = Math.ceil(this.data.length / 10);
    const url =
      'https://api.forms.gov/agencydemo-prod/madeinamericawaiverrequest/submission';

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

  onSortChange($event) {
    this.sort = $event;
  }

  onFilterChange($event) {
    const filterValue = $event.value;

    this.displayedData =
      filterValue === 'all'
        ? this.data
        : this.data.filter((d) => d.data.requestStatus === filterValue);

    this.last = Math.round(this.displayedData.length / 10);
  }
  movePage(index) {
    const waiverIndex = (index - 1) * 10;
    this.displayedData = this.data.slice(waiverIndex, waiverIndex + 10);
  }
}