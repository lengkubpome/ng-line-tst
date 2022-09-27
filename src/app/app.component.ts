import { getLoading, getErrorMessage } from './core/state/core.selectors';
import { Observable, of } from 'rxjs';
import { SharedState } from './shared/state/shared.reducer';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  template: ` <app-header></app-header>
    <app-loader *ngIf="loading"></app-loader>
    <div class="container is-max-desktop">
      <router-outlet></router-outlet>
    </div>`,
  styles: ['.container { margin: 1em; }'],
})
export class AppComponent implements AfterViewInit, OnInit {
  loading = false;

  constructor(
    private store: Store<SharedState>,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.store.select(getLoading).subscribe((res) => {
      this.loading = res;
      this.cd.detectChanges();
    });
  }

  ngOnInit(): void {}
}
