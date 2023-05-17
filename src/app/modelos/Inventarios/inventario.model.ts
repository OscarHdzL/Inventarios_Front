export class InventarioModel{
  idinventario: number
  idadquisicion: number
  idproducto: number
  idfabricante: number
  fabricante: string
  modelo: string
  idcategoria: number
  categoria: string
  esestatico: boolean
  anio: number
  nuevo: boolean
  vidautil: number
  caracteristicas: string
  numerodeserie: string
  inventarioclv: string
  notainventario: any
  catEstatusinventario: string
  catEstatusinventarioId: number
  cliente: string
  direccioncliente: string
  latitudcliente: string
  longitudcliente: string
  edificio: string
  piso: string
  oficina: string
  autorizasalida: string
  autorizaentrada: string
  ubicacionnotas: any
  accesorios: string
}




export class InventarioFormModel {
  id: number
  tblAdquisicionId: number
  catProductoId: number
  catEstatusinventarioId: number
  numerodeserie: string
  inventarioclv: string
  notas: string
  usuarioAppid: number
  accesorios: AccesorioInventario[]

  constructor(){
    this.id = 0;
    this.tblAdquisicionId = 0;
    this.catEstatusinventarioId = 0;
    this.numerodeserie = null;
    this.inventarioclv = null;
    this.notas = null;
    this.accesorios = [];
    this.usuarioAppid = 0;

  }
}


export class AccesorioInventario {
  id: number
  tblInventarioId: number
  nombre: string
  detalle: string
  usuarioAppid: number
  constructor(){
    this.id = 0;
    this.tblInventarioId = 0;
    this.nombre = null;
    this.detalle = null;
    this.usuarioAppid = 0;
  }
}


export class EstatusInventarioModel {
  id: number
  estatus: string
  inclusion: string
  tblInventarios: any[]
}

