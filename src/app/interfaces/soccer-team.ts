export interface SoccerTeam {
  id?: number;
  nombre: string;
  estadio: string;
  sitioWeb: string;
  nacionalidad: string;
  fundacion: string;
  entrenador: string;
  capacidad: number;
  valor: number;
}

export interface SoccerTeamResponse {
  content: SoccerTeam[];
  totalElements: number;
}
