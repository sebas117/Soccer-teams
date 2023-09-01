import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoccerTeamsComponent } from './soccer-teams.component';

const routes: Routes = [
  {
    path: '',
    component: SoccerTeamsComponent,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('../soccer-teams/soccer-teams-form/soccer-teams-form.module').then(
        (m) => m.SoccerTeamsFormModule,
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('../soccer-teams/soccer-teams-form/soccer-teams-form.module').then(
        (m) => m.SoccerTeamsFormModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoccerTeamsRoutingModule {}
