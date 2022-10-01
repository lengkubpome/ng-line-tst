import { NgModule } from '@angular/core';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiHintModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';

const TaigaModules = [
  TuiIslandModule,
  TuiButtonModule,
  TuiInputModule,
  TuiErrorModule,
  TuiHintModule,
  TuiTextAreaModule,
  TuiTextfieldControllerModule,
  TuiDataListWrapperModule,
  TuiInputPasswordModule,
  TuiFieldErrorPipeModule,
];

@NgModule({
  imports: [...TaigaModules],
  exports: [...TaigaModules],
})
export class TaigaModule {}
