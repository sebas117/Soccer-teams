import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SoccerTeam } from '../../../interfaces/soccer-team';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SoccerTeamsService } from '../../../services/soccer-teams/soccer-teams.service';
import {
  map,
  catchError,
  merge,
  startWith,
  switchMap,
  of as observableOf,
} from 'rxjs';
import { DatePipe, JsonPipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import * as moment from 'moment';
import { GlobalDatePipe } from './utils/globalDatePipe';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-soccer-teams-list',
  templateUrl: './soccer-teams-list.component.html',
  styleUrls: ['./soccer-teams-list.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    NgIf,
    MatProgressSpinnerModule,
    DatePipe,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatNativeDateModule,
    MatInputModule,
    GlobalDatePipe,
  ],
})
export class SoccerTeamsListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'estadio',
    'sitioWeb',
    'nacionalidad',
    'fundacion',
    'entrenador',
    'capacidad',
    'valor',
    'borrar',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: SoccerTeam[] = [];
  isLoading = true;
  resultsLength = 0;
  dateReformat: { startDate: string; endDate: string };
  hasFilter: string | null = '';

  range = new FormGroup({
    id: new FormControl<number | null>(null),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private soccerTeamsService: SoccerTeamsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngAfterViewInit() {
    this.loadTeamsTable();
  }

  private loadTeamsTable() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          if (this.hasFilter === 'byDate') {
            return this.soccerTeamsService
              .getTeamsByDate(this.paginator.pageIndex, this.dateReformat)
              .pipe(catchError(() => observableOf(null)));
          }
          if (this.hasFilter === 'byId') {
            return this.soccerTeamsService
              .getTeamByIdFilter(this.range.value.id as number)
              .pipe(catchError(() => observableOf(null)));
          }
          return this.soccerTeamsService
            .getAllTeams(this.paginator.pageIndex)
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isLoading = false;
          if (data === null || !data.content.length) {
            this.toastr.info(
              'No se encuentran resultados para tu búsqueda',
              'No hay resultados',
            );
            return [];
          }
          this.resultsLength = data.totalElements;
          return data.content;
        }),
      )
      .subscribe((data) => (this.dataSource = data));
  }

  onDeleteTeam(event: Event, element: any) {
    event.stopPropagation();
    this.soccerTeamsService.deleteTeamById(element.id).subscribe({
      next: (_) => {
        this.toastr.info(
          'Equipo ha sido eliminado correctamente',
          'Equipo eliminado',
        );
        this.loadTeamsTable();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Ha ocurrido un error!', 'Error');
      },
    });
  }

  onSelectTeam(row: any) {
    this.router.navigate([`edit/${row.id}`], { relativeTo: this.route });
  }

  onFilter() {
    if (this.range.value.id) {
      this.hasFilter = 'byId';
      this.loadTeamsTable();
      return;
    }

    if (this.range.value.start && !this.range.value.end) {
      this.toastr.warning('La fecha final es invalida', 'Advertencia');
      return;
    }

    if (!this.range.value.start && this.range.value.end) {
      this.toastr.warning('La fecha de inicio es invalida', 'Advertencia');
      return;
    }

    if (this.range.value.start && this.range.value.end) {
      this.dateReformat = {
        startDate: moment(this.range.value.start).format('DD-MM-YYYY'),
        endDate: moment(this.range.value.end).format('DD-MM-YYYY'),
      };
      this.hasFilter = 'byDate';
      this.paginator.pageIndex = 0;
      this.loadTeamsTable();
    }

    if (!this.range.value.start && !this.range.value.end) {
      this.hasFilter = null;
      this.loadTeamsTable();
    }
  }

  onClear() {
    this.range.reset();
    this.hasFilter = null;
    this.loadTeamsTable();
  }
}
