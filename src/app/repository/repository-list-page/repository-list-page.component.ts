import { Component, OnInit, ViewChild } from '@angular/core';

import { NotificationService, AlfrescoContentService,
  FolderCreatedEvent, CreateFolderDialogComponent } from 'ng2-alfresco-core';
import { DocumentListComponent, DocumentActionsService } from 'ng2-alfresco-documentlist';
import { MinimalNodeEntity } from 'alfresco-js-api';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-repository-list-page',
  templateUrl: './repository-list-page.component.html',
  styleUrls: ['./repository-list-page.component.css']
})
export class RepositoryListPageComponent implements OnInit {

  @ViewChild(DocumentListComponent)
  documentList: DocumentListComponent;

  constructor(private notificationService: NotificationService,
              private contentService: AlfrescoContentService,
              private documentActions: DocumentActionsService,
              private dialog: MdDialog,
              private router: Router) {
    this.setupActionHandlers();
  }

  ngOnInit() {
    this.contentService.folderCreated.subscribe(value => this.onFolderCreated(value));
  }

  onDragAndDropUploadSuccess($event: Event) {
    console.log('Drag and Drop upload successful!');

    this.documentList.reload();
  }

  /**
   * This method is called as part of the permission check (adf-node-permission)
   * so we can determine if the user has 'create' permission for
   * the folder that is currently displayed in the Document List
   *
   * @returns {AlfrescoApi.MinimalNodeEntity[]}
   */
  getNodesForPermissionCheck(): MinimalNodeEntity[] {
    if (this.documentList.folderNode) {
      return [{entry: this.documentList.folderNode}];
    } else {
      return [];
    }
  }

  onDeleteActionPermissionError(event: any) {
    this.notificationService.openSnackMessage(
      // Will display a message something like
      // "You don't have the 'delete' permission to do a 'delete' operation on the content"
      `You don't have the '${event.permission}' permission to do a '${event.action}' operation on the ${event.type}`,
      4000);
  }

  onDeleteActionSuccess(node) {
    // Will print something like "Successfully deleted a node: 4fdf9fe4-c5fe-4313-bb50-9edbada9216b"
    console.log('Successfully deleted a node: ' + node);
  }

  onFolderCreated(event: FolderCreatedEvent) {
    if (event && event.parentId === this.documentList.currentFolderId) {
      this.documentList.reload();
    }
  }

  onCreateFolder($event: Event) {
    const dialogRef = this.dialog.open(CreateFolderDialogComponent);
    dialogRef.afterClosed().subscribe(folderName => {
      if (folderName) {
        this.contentService.createFolder('', folderName, this.documentList.currentFolderId).subscribe(
          node => console.log(node),
          err => console.log(err)
        );
      }
    });
  }

  private setupActionHandlers() {
    this.documentActions.setHandler('folder-details', this.onFolderDetails.bind(this));
    this.documentActions.setHandler('document-details', this.onDocumentDetails.bind(this));
  }

  private onFolderDetails(event: any): Observable<boolean> {
    const entry = event.entry;
    return Observable.fromPromise(this.router.navigate(['/repository/details', entry.id]));
  }

  private onDocumentDetails(event: any): Observable<boolean> {
    const entry = event.entry;
    return Observable.fromPromise(this.router.navigate(['/repository/details', entry.id]));
  }
}
