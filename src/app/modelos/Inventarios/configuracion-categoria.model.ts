export class ConfiguracionCategoriaModel {
  id: number
  catCategoriaProductoId: number
  categoria: string
  descripcion: string
  estatus: boolean
  inclusion: string
}

export class ConfiguracionCategoriaFormModel {
  id: number = 0
  catCategoriaProductoId: number = 0
  descripcion: string = null
}
