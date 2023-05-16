import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpreadSheetComponent } from './containers/spread-sheet/spread-sheet.component';
import { FileComponent } from './containers/file/file.component';
import { SpreadSheetDetailComponent } from '@app/spread-sheet-detail/spread-sheet-detail.component';

const routes: Routes = [
    {
        path: '',
        component: FileComponent,
        pathMatch: 'full'
    },
    {
        path: 'templates',
        component: SpreadSheetComponent
    },
    {
        path: 'template/:templateId',
        component: SpreadSheetDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
