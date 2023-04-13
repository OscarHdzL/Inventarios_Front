export class PropietarioModel{
  id?: number;
  sigla?: string;
  razonsocial?: string;
  rfc?: string;
  estatus?: boolean;
}

export class PropietarioFormModel {
  id?: number;
  razonSocial?: string;
  rfc?: string;
  sigla?: string;
  activo?: boolean;

  constructor(){
    this.id = 0;
    this.razonSocial = null;
    this.rfc = null;
    this.sigla = null;
    this.activo = true;

  }
}

export class ProveedorModel{
  id?: number;
  correo?: string;
  razonsocial?: string;
  rfc?: string;
  estatus?: boolean;
  contacto?: any[];
}

export class ProveedorFormModel {
  id?: number;
  razonSocial?: string;
  rfc?: string;
  correo?: string;
  activo?: boolean;
  contacto?: any[];
  constructor(){
    this.id = 0;
    this.razonSocial = null;
    this.rfc = null;
    this.correo = null;
    this.activo = true;
    this.contacto = [];
  }
}

export class FabricanteModel{
  id?: number;
  nombre?: string;
  estatus?: boolean;
}

export class FabricanteFormModel {
  id?: number;
  nombre?: string;
  estatus?: boolean;
  constructor(){
    this.id = 0;
    this.nombre = null;
    this.estatus = true;
  }
}

export class CategoriaProductoModel{
  id?: number;
  nombre?: string;
  estatus?: boolean;
  estatico?: boolean;
}

export class CategoriaProductoFormModel {
  id?: number;
  nombre?: string;
  estatus?: boolean;
  estatico?: boolean;
  constructor(){
    this.id = 0;
    this.nombre = null;
    this.estatus = true;
    this.estatico = true;
  }
}

export class ClienteModel{
  id?: number;
  nombre?: string;
  direccion?: string;
  latitud?: string;
  longitud?: string;
  sigla?: string;
  razonsocial?: string;
  rfc?: string;
  estatus?: boolean;
}

export class ClienteFormModel {
  id?: number;
  nombre?: string;
  direccion?: string;
  latitud?: string;
  longitud?: string;
  sigla?: string;
  razonsocial?: string;
  rfc?: string;
  estatus?: boolean;
  constructor(){
    this.id = 0;
    this.razonsocial = null;
    this.nombre = null;
    this.direccion = null;
    this.latitud = null;
    this.longitud = null;
    this.rfc = null;
    this.sigla = null;
    this.estatus = true;
  }
}

