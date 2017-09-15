import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CardViewDateItemModel, CardViewItem, CardViewTextItemModel, NodesApiService } from 'ng2-alfresco-core';
import { MinimalNodeEntryEntity} from 'alfresco-js-api';


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
  properties: CardViewItem[];

  constructor(private route: ActivatedRoute, private nodeService: NodesApiService) {}

  ngOnInit() {
    this.nodeId = this.route.snapshot.params['node-id'];
    this.nodeService.getNode(this.nodeId).subscribe((node: MinimalNodeEntryEntity) => {
      return this.setupProps(node);
    });
  }

  private setupProps(node: MinimalNodeEntryEntity) {
    this.nodeName = node.name;
    this.isFile = node.isFile;
    this.nodeService.getNode(node.parentId).subscribe((parentNode: MinimalNodeEntryEntity) => {
      this.parentFolder = parentNode;
    });

    this.properties = [
      new CardViewTextItemModel({label: 'Id:', value: node.id, key: 'nodeId'}),
      new CardViewTextItemModel({label: 'Type:', value: node.nodeType, key: 'nodeType'}),
      new CardViewTextItemModel({label: 'Secondary Types:', value: node.aspectNames, key: 'nodeSecTypes'}),
      new CardViewTextItemModel({label: 'Title:', value: node.properties['cm:title'], key: 'title'}),
      new CardViewTextItemModel({label: 'Description:', value: node.properties['cm:description'], key: 'description'}),
      new CardViewTextItemModel({label: 'Author:', value: node.properties['cm:author'], key: 'author'}),
      new CardViewTextItemModel({label: 'Creator:', value: node.createdByUser.displayName, key: 'createdBy', default: 'No created by' }),
      new CardViewDateItemModel({label: 'Created:', value: node.createdAt, format: 'MMM DD YYYY', key: 'createdDate', default: 'No created date' }),
      new CardViewTextItemModel({label: 'Modifier:', value: node.modifiedByUser.displayName, key: 'createdBy', default: 'No modified by' }),
      new CardViewDateItemModel({label: 'Modified:', value: node.modifiedAt, format: 'MMM DD YYYY', key: 'modifiedDate', default: 'No modified date' })
    ];
  }


  onGoBack($event: Event) {

  }

  onDownload($event: Event) {

  }

  onDelete($event: Event) {

  }

  /*
  showViewerForNodeId(nodeId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.nodeService.getNode(nodeId).then(
        (node: MinimalNodeEntity) => {
          if (node && node.entry && node.entry.isFile) {
            //return this.showViewerForNode(node.entry);
          } else {
            resolve(false);
          }
        }
      );
    });
  }*/
 }
