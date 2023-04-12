export class PropietarioModel{
  id?: number;
  razonSocial?: string;
  rfc?: string;
  direccion?: string;
  activo?: boolean;
}

export class PropietarioFormModel {
  id?: number;
  razonSocial?: string;
  rfc?: string;
  direccion?: string;
  activo?: boolean;
  constructor(){
    this.id = 0;
    this.razonSocial = null;
    this.rfc = null;
    this.direccion = null;
    this.activo = true;
  }
}
