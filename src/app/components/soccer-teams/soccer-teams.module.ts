import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SoccerTeamsRoutingModule } from './soccer-teams-routing.module';
import { SoccerTeamsListComponent } from './soccer-teams-list/soccer-teams-list.component';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  declarations: [],
  exports: [SoccerTeamsListComponent],
  imports: [CommonModule, SoccerTeamsRoutingModule, SoccerTeamsListComponent],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SoccerTeamsModule {}
