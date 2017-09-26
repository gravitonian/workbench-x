import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css']
})
export class RepositoryPageComponent implements OnInit {

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.cdRef.detectChanges(); // Workaround for ExpressionChangedAfterItHasBeenCheckedError
  }
}
