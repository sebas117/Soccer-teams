import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'teams',
    loadChildren: () =>
      import('./components/soccer-teams/soccer-teams.module').then(
        (m) => m.SoccerTeamsModule,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'teams',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
