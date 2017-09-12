import { Component, OnInit, ViewChild } from '@angular/core';

import { DocumentListComponent } from 'ng2-alfresco-documentlist';
import { MinimalNodeEntity } from 'alfresco-js-api';

@Component({
  selector: 'app-repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css']
})
export class RepositoryPageComponent implements OnInit {

  @ViewChild(DocumentListComponent)
  documentList: DocumentListComponent;

  constructor() {
  }

  ngOnInit() {
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
}
