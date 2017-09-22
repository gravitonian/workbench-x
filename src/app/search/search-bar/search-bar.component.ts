import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MinimalNodeEntity } from 'alfresco-js-api';
import { AlfrescoAuthenticationService } from 'ng2-alfresco-core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  fileNodeId: string;
  showViewer = false;
  searchTerm = '';

  @Output()
  expand = new EventEmitter();

  constructor(public router: Router,
              public authService: AlfrescoAuthenticationService) {
  }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /**
   * Called when the user submits the search, e.g. hits enter or clicks submit
   *
   * @param event Parameters relating to the search
   */
  onSearchSubmit(event) {
    const searchTerm = event.value;
    this.router.navigate(['/search', {
      'q': searchTerm
    }]);
  }

  /**
   * On clicking an item we show preview for files and the repo details page for folders.
   *
   * @param {AlfrescoApi.MinimalNodeEntity} event
   */
  onItemClicked(event: MinimalNodeEntity) {
    if (event.entry.isFile) {
      this.fileNodeId = event.entry.id;
      this.showViewer = true;
    } else if (event.entry.isFolder) {
      this.router.navigate(['/repository/details', event.entry.id]);
    }
  }

  onSearchTermChange(event) {
    this.searchTerm = event.value;
  }

  onExpandToggle(event) {
    const expandedInput: boolean = event.expanded;
    console.log('Expand toggle called, search field is expanded?: ', expandedInput);
    this.expand.emit(event);
  }
}
