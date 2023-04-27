export class AdquisicionModel{
  id: number
  catProveedorId: number
  proveedor: string
  catPropietarioId: number
  propietario: string
  monto: number
  impuesto: number
  articulos: number
  facPdf: string
  facXml: string
  fechadecompra: string
  relAdquisicionDetalles: RelAdquisicionDetalle[]
  tblInventarios: TblInventario[]
}



export class RelAdquisicionDetalle {
  id: number
  cantidad: number
  tblAdquisicionId: number
  catProductoId: number
  costosiunitario: number
  accionAuxiliar: string
  modelo?:string;
  categoria?:string;
  constructor(){
    this.id = 0;
    this.cantidad = 0;
    this.tblAdquisicionId = 0;
    this.catProductoId = null;
    this.costosiunitario = null;
  }
}

export class TblInventario {
  id: number
  tblAdquisicionId: number
  catProductoId: number
  catEstatusinventarioId: number
  estatusinventario: string
  numerodeserie: string
  inventarioclv: string
  notas: any
}



export class AdquisicionFormModel {
  id?: number;
  catProveedorId: number
  catPropietarioId: number
  monto?: number;
  impuesto?: number;
  articulos?: number;
  facpdf?: string;
  facxml?: string;
  fechadecompra?: string;
  detalle?: RelAdquisicionDetalle[];

  constructor(){
    this.id = 0;
    this.catProveedorId = 0;
    this.catPropietarioId = 0;
    this.monto = 0;
    this.impuesto = 0;
    this.articulos = 0;
    this.facpdf = null;
    this.facxml = null;
    this.fechadecompra = null;
    this.detalle = [];
  }
}

/*
export class ProductoAdquisicionFormModel {
  id?: number;
  cantidad?: number;
  tblAdquisicionId?: number;
  catProductoId?: number;
  costosiunitario?: number;
  constructor(){
    this.id = 0;
    this.cantidad = 0;
    this.tblAdquisicionId = 0;
    this.catProductoId = null;
    this.costosiunitario = null;
  }
} */


