import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-files-page',
  templateUrl: './my-files-page.component.html',
  styleUrls: ['./my-files-page.component.css']
})
export class MyFilesPageComponent implements OnInit {

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.cdRef.detectChanges(); // Workaround for ExpressionChangedAfterItHasBeenCheckedError
  }

}
