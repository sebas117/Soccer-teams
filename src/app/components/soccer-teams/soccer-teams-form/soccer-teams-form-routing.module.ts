import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoccerTeamsFormComponent } from './soccer-teams-form.component';

const routes: Routes = [
  {
    path: '',
    component: SoccerTeamsFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoccerTeamsFormRoutingModule {}
