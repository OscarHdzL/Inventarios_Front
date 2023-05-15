


export type AuditoriaModel = AuditoriaInventarioModel[][]

export class AuditoriaInventarioModel {
  id: number
  tipoObjeto: string
  objeto: string
  objetoParsed: any
  usuariosAppId: number
  inclusionHistorico: string
}
