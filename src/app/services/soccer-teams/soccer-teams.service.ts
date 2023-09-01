import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SoccerTeam, SoccerTeamResponse } from '../../interfaces/soccer-team';

@Injectable({
  providedIn: 'root',
})
export class SoccerTeamsService {
  readonly baseURL = 'https://wo-fifa.azurewebsites.net';

  constructor(private http: HttpClient) {}

  getAllTeams(page: number): Observable<SoccerTeamResponse> {
    return this.http.get<SoccerTeamResponse>(
      `${this.baseURL}/equipos/listar/${page}/15`,
    );
  }

  createTeam(team: SoccerTeam): Observable<SoccerTeam> {
    return this.http.post<SoccerTeam>(`${this.baseURL}/equipos/crear`, team);
  }

  getTeamById(id: number): Observable<SoccerTeam> {
    return this.http.get<SoccerTeam>(`${this.baseURL}/equipos/consultar/${id}`);
  }

  getTeamByIdFilter(id: number): Observable<SoccerTeamResponse> {
    return this.http
      .get<SoccerTeam>(`${this.baseURL}/equipos/consultar/${id}`)
      .pipe(
        map((responseData) => {
          const result: SoccerTeamResponse = {
            content: [responseData],
            totalElements: 1,
          };
          return result;
        }),
      );
  }

  getTeamsByDate(
    page: number,
    {
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    },
  ): Observable<SoccerTeamResponse> {
    return this.http
      .get<SoccerTeam[]>(
        `${this.baseURL}/equipos/consultar/${startDate}/${endDate}`,
      )
      .pipe(
        map((responseData) => {
          const size = 15;
          const paginate = (
            list: SoccerTeam[],
            pageSize: number,
            pageNumber: number,
          ) => {
            return list.slice(
              pageNumber * pageSize,
              (pageNumber + 1) * pageSize,
            );
          };
          const result: SoccerTeamResponse = {
            content: paginate(responseData, size, page),
            totalElements: responseData.length,
          };
          return result;
        }),
      );
  }

  updateTeamById(id: number, team: SoccerTeam): Observable<SoccerTeam> {
    return this.http.put<SoccerTeam>(
      `${this.baseURL}/equipos/actualizar/${id}`,
      team,
    );
  }

  deleteTeamById(id: number) {
    return this.http.delete(`${this.baseURL}/equipos/eliminar/${id}`, {
      responseType: 'text',
    });
  }
}
