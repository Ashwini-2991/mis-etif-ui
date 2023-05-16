import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageContainerComponent } from './containers/home-page-container.component';
import { SharedModule } from '../shared/shared.module';
import { SpreadSheetComponent } from './containers/spread-sheet/spread-sheet.component';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { FileComponent } from './containers/file/file.component';
import { TemplateListComponent } from './containers/template-list/template-list.component';

@NgModule({
    declarations: [HomePageContainerComponent, SpreadSheetComponent, FileComponent, TemplateListComponent],
    imports: [HomeRoutingModule, SharedModule, SpreadsheetAllModule]
})
export class HomeModule {}
