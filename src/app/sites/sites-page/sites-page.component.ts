import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sites-page',
  templateUrl: './sites-page.component.html',
  styleUrls: ['./sites-page.component.css']
})
export class SitesPageComponent implements OnInit {

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.cdRef.detectChanges(); // Workaround for ExpressionChangedAfterItHasBeenCheckedError
  }

}
