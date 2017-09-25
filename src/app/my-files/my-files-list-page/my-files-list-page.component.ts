import { Component, OnInit } from '@angular/core';
import { RepositoryListPageComponent } from '../../repository/repository-list-page/repository-list-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { NotificationService, AlfrescoContentService } from 'ng2-alfresco-core';

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
              router: Router) {
    super(notificationService, contentService, dialog , activatedRoute, router);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
