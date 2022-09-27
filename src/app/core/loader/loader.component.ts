import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  // templateUrl: './loader.component.html',
  template: `
    <div class="backdrop">
      <div class="loading-spinner">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
        <div class="text">Loading...</div>
      </div>
    </div>
  `,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
