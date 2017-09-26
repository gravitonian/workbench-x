import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RepositoryListPageComponent } from '../../repository/repository-list-page/repository-list-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { NotificationService, AlfrescoContentService } from 'ng2-alfresco-core';
import { MinimalNodeEntryEntity } from 'alfresco-js-api';

@Component({
  selector: 'app-my-files-list-page',
  templateUrl: './my-files-list-page.component.html',
  styleUrls: ['./my-files-list-page.component.css']
})
export class MyFilesListPageComponent extends RepositoryListPageComponent implements OnInit {
  currentFolderId = '-my-'; // By default display /Company Home/User Homes/<userid>

  constructor(notificationService: NotificationService,
              contentService: AlfrescoContentService,
              dialog: MdDialog,
              activatedRoute: ActivatedRoute,
              router: Router,
              cdRef: ChangeDetectorRef) {
    super(notificationService, contentService, dialog , activatedRoute, router, cdRef);
  }

  ngOnInit() {
    super.ngOnInit();

    this.cdRef.detectChanges(); // Workaround for ExpressionChangedAfterItHasBeenCheckedError
  }

  onFolderDetails(event: any) {
    const entry: MinimalNodeEntryEntity = event.value.entry;
    console.log('MyFilesListPageComponent: Navigating to details page for folder: ' + entry.name);
    this.router.navigate(['/my-files', entry.id]);
  }

  onDocumentDetails(event: any) {
    const entry: MinimalNodeEntryEntity = event.value.entry;
    console.log('MyFilesListPageComponent: Navigating to details page for document: ' + entry.name);
    this.router.navigate(['/my-files', entry.id]);
  }
}
