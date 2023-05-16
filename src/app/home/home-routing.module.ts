import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpreadSheetComponent } from './containers/spread-sheet/spread-sheet.component';
import { FileComponent } from './containers/file/file.component';

const routes: Routes = [
    {
        path: '',
        component: FileComponent,
        pathMatch: 'full'
    },
    {
        path: 'templates',
        component: SpreadSheetComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
