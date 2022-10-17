import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedState } from '@shared/state';
import { signOut } from 'app/auth/state';
import { tuiIsString } from '@taiga-ui/cdk';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  readonly collaborators = [`Member`, `Log Out`];
  readonly userMenu = [
    { title: `Profile`, link: '' },
    { title: `Log Out`, link: '' },
  ];

  readonly tabs = [`Products`, this.collaborators];

  activeElement = String(this.tabs[0]);

  open = false;

  public isScreenDesktop!: boolean;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.isScreenDesktop = window.innerWidth > 1200 ? false : true;
  }

  constructor(private store: Store<SharedState>, private router: Router) {}

  ngOnInit(): void {
    this.isScreenDesktop = window.innerWidth > 1200 ? false : true;
  }

  get activeItemIndex(): number {
    if (this.collaborators.includes(this.activeElement)) {
      return this.tabs.indexOf(this.collaborators);
    }

    return this.tabs.indexOf(this.activeElement);
  }

  stop(event: Event): void {
    // We need to stop tab custom event so parent component does not think its active
    event.stopPropagation();
  }

  onClick(activeElement: string): void {
    this.activeElement = activeElement;
    this.open = false;
  }

  onClickUser(activeElement: string): void {
    this.activeElement = activeElement;
  }

  isString(tab: unknown): tab is string {
    return tuiIsString(tab);
  }

  // =============== Old

  menuActive = false;

  onShowMenu(): void {
    this.menuActive = !this.menuActive;
  }

  onCloseMenu(): void {
    this.menuActive = false;
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(signOut({}));
  }

  onTest() {
    this.router.navigate(['auth/verify-email']);
    this.menuActive = false;
  }
}
