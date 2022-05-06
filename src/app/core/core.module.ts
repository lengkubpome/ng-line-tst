import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

const COMPONENTS = [HeaderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, HttpClientModule],
  exports: [...COMPONENTS],
})
export class CoreModule {}
