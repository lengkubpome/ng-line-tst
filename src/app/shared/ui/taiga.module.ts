import { NgModule } from '@angular/core';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiHintModule,
  TuiLinkModule,
  TuiModeModule,
  TuiTextfieldControllerModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import {
  TuiCheckboxLabeledModule,
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
  TuiThemeNightModule,
  TuiModeModule,
  TuiCheckboxLabeledModule,
  TuiLinkModule,
];

@NgModule({
  imports: [...TaigaModules],
  exports: [...TaigaModules],
})
export class TaigaModule {}
