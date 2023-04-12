import { Timestamp } from "rxjs";

export class Proyecto {
  id: number;
  nombre: string;
}

export class Periodo {
  id: number;
  nombre: string;
  proyectos: Proyecto[];
}

export class Proceso {
  id: number;
  nombre: string;
  area: string;
  idRol: number;
  rol: string;
  periodos: Periodo[];
}

export class Partida {
  id: number;
  nombre: string;
  procesos: Proceso[];
}

export class Cliente {
  id: number;
  nombre: string;
  identificador: string;
  partidas: Partida[];
}

export class SesionModel {
  id: number = 0;
  nombre: string = '';
  correo: string = '';
  clientes: Cliente[] = [];
  administrador: boolean = true;
  funciones: Funcion[] = []
  vigenciaSesion : number = 0;
}


export class Funcion {
  id:      number;
  modulo:  string;
  funcion: string;
  activo: boolean;
}
