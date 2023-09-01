import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SoccerTeam } from '../../../interfaces/soccer-team';
import { SoccerTeamsService } from '../../../services/soccer-teams/soccer-teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-soccer-teams-form',
  templateUrl: './soccer-teams-form.component.html',
  styleUrls: ['./soccer-teams-form.component.css'],
})
export class SoccerTeamsFormComponent implements OnInit {
  @ViewChild('f') soccerTeamForm: NgForm;
  editMode = false;
  teamId: number;

  soccerTeam: SoccerTeam = {
    nombre: '',
    estadio: '',
    sitioWeb: '',
    nacionalidad: '',
    fundacion: '',
    entrenador: '',
    capacidad: 0,
    valor: 0,
  };

  constructor(
    private soccerTeamsService: SoccerTeamsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;

    if (params['id']) {
      this.editMode = true;
      this.soccerTeamsService.getTeamById(params['id']).subscribe({
        next: (soccerTeam) => {
          delete soccerTeam.id;
          this.soccerTeamForm.setValue({
            ...soccerTeam,
            fundacion: new Date(soccerTeam.fundacion)
              .toISOString()
              .slice(0, 10),
          });
          this.teamId = params['id'];
        },
      });
    }
  }

  onSubmit() {
    this.soccerTeam = this.soccerTeamForm.value;
    this.soccerTeamsService.createTeam(this.soccerTeam).subscribe({
      next: (response) => {
        this.toastr.success(
          `Equipo ${response.nombre} creado satisfactoriamente`,
          'Creación de equipo',
        );
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(`Algo salió mal`, 'Error');
      },
    });
  }

  onUpdate() {
    this.soccerTeam = this.soccerTeamForm.value;
    this.soccerTeamsService
      .updateTeamById(this.teamId, this.soccerTeam)
      .subscribe({
        next: (response) => {
          this.toastr.success(
            `Equipo ${response.nombre} actualizado satisfactoriamente`,
            'Actualización de equipo',
          );
          this.router.navigate(['/teams']);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(`Algo salió mal`, 'Error');
        },
      });
  }
}
