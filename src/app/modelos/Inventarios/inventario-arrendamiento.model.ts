export class ConfiguracionProducto {
  id: number
  catCategoriaProductoId: number
  categoria: string
  descripcion: string
  estatus: boolean
  inclusion: string
}

export class InventarioArrendamientoAgrupadoModel{
  cantidad: number
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
  catEstatusinventarioId: number
  catEstatusinventario: string
  idcliente: number
  cliente: string
  direccioncliente: string
}


export class InventarioArrendamientoDisponibleModel{
  idinventarioarrendamiento: number
  estatus: boolean
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
  catEstatusinventarioId: number
  catEstatusinventario: string
  idcliente: number
  cliente: string
  direccioncliente: string
  latitudcliente: string
  longitudcliente: string
  accesorios: any
}


export class EmpleadoInventarioArrendamientoModel {
  idrelempleadoinventarioarrendamiento: number
  responsiva: string
  cuentaEmpleadoCliente: string
  nombreEmpleadoCliente: string
  estatus: boolean
  idinventarioarrendamiento: number
  idinventario: number
  idadquisicion: number
  idproducto: number
  idfabricante: number
  fabricante: string
  modelo: string = ''
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
  catEstatusinventarioId: number
  catEstatusinventario: string
  idcliente: number = 0
  cliente: string
  direccioncliente: string
  latitudcliente: string
  longitudcliente: string
  accesorios: any
  archivos: ArchivoEmpleadoInventario[] = []
}

export class ArchivoEmpleadoInventario {
  id?: number
  relEmpleadoInventarioArrendamientoId?: number
  archivo?: string
  estatus?: boolean = true
  inclusion?: Date = new Date();
  url?: string = null
}


export class InventarioProductosDisponibleModel {
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
  catEstatusinventarioId: number
  catEstatusinventario: string
  disponibles: number
}


export class InventarioArrendamientoFormModel {
  id: number
  catProductoId: number
  catClienteId: number
  cantidad: number

  constructor(){
    this.id = 0;
    this.catProductoId = 0;
    this.catClienteId = 0;
    this.cantidad = 0;
  }
}


export class EmpleadoInventarioArrendamientoFormModel {
  id: number
  idCliente?: number
  tblInventarioArrendamientoId: number
  cuentaEmpleadoCliente: string
  responsiva: string
  nombreEmpleadoCliente: string
  configuracion: ConfiguracionEmpleadoInventario[] = []


  constructor(){
    this.id = 0;
    this.idCliente = 0;
    this.tblInventarioArrendamientoId = 0;
    this.cuentaEmpleadoCliente = null;
    this.responsiva = null;
    this.nombreEmpleadoCliente = null;
  }
}

export class ConfiguracionEmpleadoInventario {
  catConfiguracionProductoId?: number
  valor?: string
}


export class EmpleadoLDAP {
  nombre: string
  correo: string
  cuenta: string
}
