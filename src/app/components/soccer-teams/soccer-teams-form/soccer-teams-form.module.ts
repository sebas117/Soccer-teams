import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoccerTeamsFormRoutingModule } from './soccer-teams-form-routing.module';
import { SoccerTeamsFormComponent } from './soccer-teams-form.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SoccerTeamsFormComponent],
  imports: [
    CommonModule,
    SoccerTeamsFormRoutingModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class SoccerTeamsFormModule {}
