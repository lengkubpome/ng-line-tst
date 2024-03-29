import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialsModule, TaigaModule } from './ui';

const COMPONENTS = [LoaderComponent];

const MODULES = [CommonModule, MaterialsModule, TaigaModule];

@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, ...MODULES],
})
export class SharedModule {}
