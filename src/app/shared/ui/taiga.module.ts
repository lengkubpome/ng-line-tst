import { NgModule } from '@angular/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

import {
  TuiElasticStickyModule,
  TuiMobileCalendarDialogModule,
  TuiMobileDialogModule,
  TuiMobileTabsModule,
} from '@taiga-ui/addon-mobile';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  tuiIconsPathFactory,
  TuiLinkModule,
  TuiModeModule,
  TuiNotificationModule,
  TuiRootModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
  TuiThemeNightModule,
  TUI_ICONS_PATH,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import {
  TuiCheckboxLabeledModule,
  TuiDataListDropdownManagerModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiMultiSelectModule,
  TuiTabsModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { TuiElementModule } from '@taiga-ui/cdk';

const TaigaModules = [
  TuiRootModule,
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
  TuiAlertModule,
  TuiDataListModule,
  TuiTabsModule,
  TuiSvgModule,
  TuiMobileTabsModule,
  TuiDataListDropdownManagerModule,
  TuiMultiSelectModule,
  TuiHostedDropdownModule,
  TuiMobileDialogModule,
  TuiElementModule,
  TuiMarkerIconModule,
  TuiNotificationModule,
  TuiMobileCalendarDialogModule,
  TuiDialogModule,
  TuiInputDateRangeModule,
  TuiElasticStickyModule,
  TuiScrollbarModule,
];

@NgModule({
  imports: [...TaigaModules],
  exports: [...TaigaModules],
  providers: [
    {
      provide: TUI_ICONS_PATH,
      useValue: tuiIconsPathFactory(
        'https://taiga-ui.dev/assets/taiga-ui/icons'
      ),
    },
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
  ],
})
export class TaigaModule {}
