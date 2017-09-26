import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { SiteModel, NotificationService, AlfrescoContentService, AlfrescoApiService } from 'ng2-alfresco-core';
import { RepositoryListPageComponent } from '../../repository/repository-list-page/repository-list-page.component';
import { MinimalNodeEntity, MinimalNodeEntryEntity } from 'alfresco-js-api';


@Component({
  selector: 'app-sites-list-page',
  templateUrl: './sites-list-page.component.html',
  styleUrls: ['./sites-list-page.component.css']
})
export class SitesListPageComponent extends RepositoryListPageComponent implements OnInit {
  sitesDataStore = '-sites-'; // By default display /Company Home/Sites
  currentFolderId = this.sitesDataStore;

  constructor(notificationService: NotificationService,
              contentService: AlfrescoContentService,
              dialog: MdDialog,
              activatedRoute: ActivatedRoute,
              router: Router,
              private apiService: AlfrescoApiService,
              cdRef: ChangeDetectorRef) {
    super(notificationService, contentService, dialog , activatedRoute, router, cdRef);
  }

  ngOnInit() {
    super.ngOnInit();

    this.cdRef.detectChanges(); // Workaround for ExpressionChangedAfterItHasBeenCheckedError
  }

  getSiteContent(site: SiteModel) {
    if (site && site.guid) {
     this.getDocumentLibrarySiteContainer(site);
    } else {
      this.currentFolderId = this.sitesDataStore;
    }
  }

  onFolderDetails(event: any) {
    const entry: MinimalNodeEntryEntity = event.value.entry;
    console.log('SitesListPageComponent: Navigating to details page for folder: ' + entry.name);
    this.router.navigate(['/sites', entry.id]);
  }

  onDocumentDetails(event: any) {
    const entry: MinimalNodeEntryEntity = event.value.entry;
    console.log('SitesListPageComponent: Navigating to details page for document: ' + entry.name);
    this.router.navigate(['/sites', entry.id]);
  }

  private getDocumentLibrarySiteContainer(site: SiteModel): any {
    const include = ['properties'];
    const documentLibraryContainerId = 'documentLibrary';

    this.apiService.getInstance().core.sitesApi.getSiteContainer(
      site.id, documentLibraryContainerId, include).then((nodeEntity: MinimalNodeEntity) => {
      const node: MinimalNodeEntryEntity = nodeEntity.entry;
      this.currentFolderId = node.id;
    });
  }
}
