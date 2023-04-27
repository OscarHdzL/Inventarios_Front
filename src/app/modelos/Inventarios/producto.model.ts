export class ProductoModel{
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
}




export class ProductoFormModel {
  id: number
  catCategoriaProductoId: number
  catFabricanteId: number
  modelo: string
  anio: number
  nuevo: boolean
  vidautil: number
  caracteristicas_: string[]

  constructor(){
    this.id = 0;
    this.catCategoriaProductoId = 0;
    this.catFabricanteId = 0;
    this.modelo = null;
    this.anio = null;
    this.nuevo = false;
    this.vidautil = null;
    this.caracteristicas_ = [];

  }
}



export class CaracteristicaProductoModel{
  id?: number;
  caracteristica: string;
  idCaracteristica?: number;
  caracteristicaProducto?: string;
}


export class CaracteristicaProductoFormModel {
  id?: number;
  idCaracteristica?: number;
  caracteristicaProducto?: string;
  constructor(){
    this.id = 0;
    this.idCaracteristica = 0;
    this.caracteristicaProducto = null;

  }
  }




  export class CategoriaProductoModel{
    id: number
    nombre: string
    estatus: boolean
    estatico: boolean
    inclusion: string
    catProductos: any[]
  }


  export class CaracteristicaProductoFormModel_ {
    id?: number;
    catProductoId?: number;
    nombre?: string;
    constructor(){
      this.id = 0;
      this.catProductoId = 0;
      this.nombre = null;
    }
    }
