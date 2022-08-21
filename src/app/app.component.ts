import { getLoading, getErrorMessage } from './shared/state/shared.selector';
import { Observable } from 'rxjs';
import { SharedState } from './shared/state/shared.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  template: ` <!-- <mat-progress-bar
      mode="indeterminate"
      *ngIf="showLoading | async"
    ></mat-progress-bar> -->
    <app-header></app-header>
    <div class="container">
      <router-outlet></router-outlet>
    </div>`,
  styles: ['.container { margin: 1em; }'],
})
export class AppComponent implements OnInit {
  showLoading!: Observable<boolean>;
  constructor(private store: Store<SharedState>) {}

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);

    this.store.select(getErrorMessage).subscribe((error) => {
      console.log(error);
    });
  }
}
