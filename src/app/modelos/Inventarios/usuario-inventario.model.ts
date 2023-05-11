export class CatUsuarioModel {
  id: number
  nombre: string
  cuenta: string
  correo: string
  ubicacion: string
}


export class UsuarioInventarioFormModel {
  id: number
  tblInventarioId: number
  nombre: string
  cuenta: string
  correo: string

  catUsuarioId: number
  responsiva: string
  configuracion: ConfiguracionUsuarioInventario[] = []

  constructor(){

    this.id = 0;
    this.tblInventarioId = 0;
    this.catUsuarioId = 0;
    this.responsiva = null;
  }
}

export class ConfiguracionUsuarioInventario {
  catConfiguracionProductoId?: number
  valor?: string
}


export class ProductosInventarioDisponiblesModel {
  idinventario: number
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
  catEstatusinventarioId: number
  catEstatusinventario: string
}


export class UsuarioInventarioModel {
  archivos: ArchivoUsuarioInventario[]
  configuracion: any[]
  idrelusuarioinventario: number
  responsiva: string
  idusuario: number
  nombreusuario: string
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
  accesorios: any
}

export class ArchivoUsuarioInventario {
  id: number
  relUsuarioInventarioId: number
  archivo: string
  estatus: boolean
  inclusion: string
  relUsuarioInventario: any
  url: string
}


export class UsuarioInventarioContenedorModel {
  id: number = 0
  contenedor: string
  relUsuarioInventarioId: number = 0
  inclusion?: string
  relUsuarioInventario?: any
  tblUsuarioInventarioContenedorImagenes: ImagenUsuarioInventarioContenedor[] = []
}

export class ImagenUsuarioInventarioContenedor {
  id: number = 0
  imagen: string
  descripcion: string
  tblUsuarioInventarioContenedorId: number = 0
  inclusion?: string
  tblUsuarioInventarioContenedor?: any
}
/*

export class UsuarioInventarioContenedorFormModel {
  id: number = 0
  contenedor: string
  relUsuarioInventarioId: number = 0
  tblUsuarioInventarioContenedorImagenes: ImagenUsuarioInventarioContenedor[] = []
}

export class ImagenUsuarioInventarioContenedorForm {
  id: number = 0
  imagen: string
  descripcion: string
  tblUsuarioInventarioContenedorId: number = 0
  inclusion?: string
  tblUsuarioInventarioContenedor?: any
} */
