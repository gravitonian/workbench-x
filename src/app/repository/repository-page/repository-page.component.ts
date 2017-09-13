import { Component, OnInit, ViewChild } from '@angular/core';

import { NotificationService, AlfrescoContentService,
  FolderCreatedEvent, CreateFolderDialogComponent } from 'ng2-alfresco-core';
import { DocumentListComponent } from 'ng2-alfresco-documentlist';
import { MinimalNodeEntity } from 'alfresco-js-api';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css']
})
export class RepositoryPageComponent implements OnInit {

  @ViewChild(DocumentListComponent)
  documentList: DocumentListComponent;

  constructor(private notificationService: NotificationService,
              private contentService: AlfrescoContentService,
              private dialog: MdDialog) {
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
}
