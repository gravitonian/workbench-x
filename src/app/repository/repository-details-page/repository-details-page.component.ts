import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CardViewUpdateService, UpdateNotification, CardViewDateItemModel, CardViewItem, CardViewTextItemModel,
         NodesApiService, AlfrescoContentService, NotificationService } from 'ng2-alfresco-core';
import { MinimalNodeEntryEntity, NodeBody } from 'alfresco-js-api';

@Component({
  selector: 'app-repository-details-page',
  templateUrl: './repository-details-page.component.html',
  styleUrls: ['./repository-details-page.component.css']
})
export class RepositoryDetailsPageComponent implements OnInit {
  nodeId: string;
  nodeName: string;
  parentFolder: MinimalNodeEntryEntity;
  isFile: boolean;
  properties: Array<CardViewItem>;
  propertiesChanged = false;
  titleProp: CardViewTextItemModel;
  descProp: CardViewTextItemModel;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private nodeService: NodesApiService,
              private contentService: AlfrescoContentService,
              private cardViewUpdateService: CardViewUpdateService,
              protected notificationService: NotificationService) {
    this.properties = new Array<CardViewItem>();
  }

  ngOnInit() {
    this.nodeId = this.activatedRoute.snapshot.params['node-id'];
    this.nodeService.getNode(this.nodeId).subscribe((entry: MinimalNodeEntryEntity) => {
      const node: MinimalNodeEntryEntity = entry;
      this.nodeName = node.name;
      this.isFile = node.isFile;

      this.nodeService.getNode(node.parentId).subscribe((parentNode: MinimalNodeEntryEntity) => {
        this.parentFolder = parentNode;
      });

      this.setupProps(node);
    });

    this.cardViewUpdateService.itemUpdated$.subscribe(this.updateNodeDetails.bind(this));
  }

  private setupProps(node: MinimalNodeEntryEntity) {
    console.log('setupProps: ', node.id);

    // Properties that are always available
    const idProp = new CardViewTextItemModel({label: 'Id:', value: node.id, key: 'nodeId'});
    const typeProp = new CardViewTextItemModel({label: 'Type:', value: node.nodeType, key: 'nodeType'});
    const secTypeProp = new CardViewTextItemModel({label: 'Secondary Types:', value: node.aspectNames, key: 'nodeSecTypes'});
    const creatorProp = new CardViewTextItemModel({label: 'Creator:', value: node.createdByUser.displayName, key: 'createdBy'});
    const createdProp = new CardViewDateItemModel({label: 'Created:', value: node.createdAt, format: 'MMM DD YYYY', key: 'createdDate' });
    const modifierProp = new CardViewTextItemModel({label: 'Modifier:', value: node.modifiedByUser.displayName, key: 'createdBy' });
    const modifiedProp = new CardViewDateItemModel({label: 'Modified:', value: node.modifiedAt, format: 'MMM DD YYYY', key: 'modifiedDate' });

    this.properties.push(idProp);
    this.properties.push(typeProp);
    this.properties.push(secTypeProp);

    if (this.isFile) {
      // Add some content file specific props
      const sizeProp = new CardViewTextItemModel({label: 'Size (bytes):', value: node.content.sizeInBytes, key: 'size'});
      const mimetypeProp = new CardViewTextItemModel({label: 'Mimetype:', value: node.content.mimeTypeName, key: 'mimetype'});
      this.properties.push(sizeProp);
      this.properties.push(mimetypeProp);
    }

    // Aspect properties
    const titledAspect = 'cm:titled';
    if (node.aspectNames.indexOf(titledAspect) > -1) {
      this.titleProp = new CardViewTextItemModel({label: 'Title:', value: node.properties['cm:title'], key: 'title', editable: true, default: ''});
      this.descProp = new CardViewTextItemModel({label: 'Description:', value: node.properties['cm:description'],
                                                  key: 'description', editable: true, default: '', multiline: true});
      this.properties.push(this.titleProp);
      this.properties.push(this.descProp);
    }

    // Author can be available if extracted during ingestion of content
    const authorPropName = 'cm:author';
    if (node.properties && node.properties[authorPropName]) {
      const authorProp = new CardViewTextItemModel({label: 'Author:', value: node.properties[authorPropName], key: 'author'});
      this.properties.push(authorProp);
    }

    this.properties.push(creatorProp);
    this.properties.push(createdProp);
    this.properties.push(modifierProp);
    this.properties.push(modifiedProp);
  }

  onGoBack($event: Event) {
    this.navigateBack2DocList();
  }

  onDownload($event: Event) {
    const url = this.contentService.getContentUrl(this.nodeId, true);
    const fileName = this.nodeName;
    this.download(url, fileName);
  }

  onDelete($event: Event) {
    this.nodeService.deleteNode(this.nodeId).subscribe(() => {
      this.navigateBack2DocList();
    });
  }

  private navigateBack2DocList() {
    this.router.navigate(['../'],
      {
        queryParams: { current_folder_id: this.parentFolder.id },
        relativeTo: this.activatedRoute
      });
  }

  private download(url: string, fileName: string) {
    if (url && fileName) {
      const link = document.createElement('a');

      link.style.display = 'none';
      link.download = fileName;
      link.href = url;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private updateNodeDetails(updateNotification: UpdateNotification) {
    const currentValue = updateNotification.target.value;
    const newValue = updateNotification.changed[updateNotification.target.key];
    if (currentValue !== newValue) {
      console.log(updateNotification.target, ' = ', updateNotification.changed);
      if (updateNotification.target.key === this.titleProp.key) {
        this.titleProp.value = updateNotification.changed[this.titleProp.key];
      }
      if (updateNotification.target.key === this.descProp.key) {
        this.descProp.value = updateNotification.changed[this.descProp.key];
      }
      this.propertiesChanged = true;
    }
  }

  /**
   * Updates the node with identifier 'nodeId'.
   * For example, you can rename a file or folder:
   * {
   *  "name": "My new name"
   * }
   *
   * You can also set or update one or more properties:
   * {
   *  "properties":
   *     {
   *      "cm:title": "Folder title"
   *     }
   * }
   *
   * If you want to add or remove aspects, then you must use **GET /nodes/{nodeId}** first to get the complete
   * set of *aspectNames*.
   * Currently there is no optimistic locking for updates, so they are applied in "last one wins" order.
   */
  onSave($event: Event) {
    console.log('this.titleProp.value = ', this.titleProp.value);
    console.log('this.descProp.value = ', this.descProp.value);

    const nodeBody = <NodeBody> {
      'properties':
        {
          'cm:title': this.titleProp.value,
          'cm:description': this.descProp.value
        }
    };

    this.nodeService.updateNode(this.nodeId, nodeBody).subscribe(
        () => {
          this.notificationService.openSnackMessage(
            `Properties for '${this.nodeName}' was saved successfully`,
            4000);
        }
      );

    this.propertiesChanged = false;
  }

  isSaveDisabled() {
    return !this.propertiesChanged;
  }
}
