import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent } from '@moodys/emtn-ng/auth';

export const routes: Routes = [
    { path: 'implicit/callback', component: AuthCallbackComponent },
    {
        path: '',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
    },
    {
        path: '',
        redirectTo: `/`,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
