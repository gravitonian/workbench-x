import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MinimalNodeEntryEntity } from 'alfresco-js-api';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.css']
})
export class SearchResultPageComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  showDetails(event) {
    const nodeEntry: MinimalNodeEntryEntity  = event.value.entry;
    this.router.navigate(['/repository/details', nodeEntry.id]);
  }
}
