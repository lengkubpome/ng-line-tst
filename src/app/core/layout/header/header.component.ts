import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuActive = false;

  constructor() {}

  ngOnInit(): void {}

  onShowMenu(): void {
    this.menuActive = !this.menuActive;
  }

  onCloseMenu(): void {
    this.menuActive = false;
  }
}
