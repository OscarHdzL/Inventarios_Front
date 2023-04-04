export class ArticuloModel{
  id?: number;
  modelo?: string;
  anio?: string;
  categoria?: string;
  fabricante?: string;
  proveedor?: string;
  propietario?: string;
  cantidad?: number;
  valorUnitario?: number;
  vidaUtil?: string;
  activo?: boolean;
}


export class ArticuloFormModel {
  id?: number;
  modelo?: string;
  anio?: string;
  categoria?: string;
  fabricante?: string;
  proveedor?: string;
  propietario?: string;
  cantidad?: number;
  valorUnitario?: number;
  vidaUtil?: string;
  observaciones?: string;
  activo?: boolean;
  constructor(){
    this.id = 0;
    this.modelo = null;
    this.anio = null;
    this.categoria = null;
    this.fabricante = null;
    this.proveedor = null;
    this.propietario = null;
    this.cantidad = null;
    this.valorUnitario = null;
    this.vidaUtil = null;
    this.propietario = null;
    this.activo = true;
  }
}
