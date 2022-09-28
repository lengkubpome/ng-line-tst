import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuActive = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onShowMenu(): void {
    this.menuActive = !this.menuActive;
  }

  goPage(linkName: string) {
    this.router.navigate(['/', 'auth/loging']);
  }
}
