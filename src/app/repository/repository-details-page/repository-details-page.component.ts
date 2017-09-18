import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  properties: Array<CardViewItem>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private nodeService: NodesApiService) {
    this.properties = new Array<CardViewItem>();
  }

  ngOnInit() {
    this.nodeId = this.activatedRoute.snapshot.params['node-id'];
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
      const titleProp = new CardViewTextItemModel({label: 'Title:', value: node.properties['cm:title'], key: 'title', default: ''});
      const descProp = new CardViewTextItemModel({label: 'Description:', value: node.properties['cm:description'],
                                                  key: 'description', default: '', multiline: true});
      this.properties.push(titleProp);
      this.properties.push(descProp);
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
    this.router.navigate(
      ['/repository'],
      { queryParams: { current_folder_id: this.parentFolder.id } });
  }

  onDownload($event: Event) {

  }

  onDelete($event: Event) {

  }
 }
