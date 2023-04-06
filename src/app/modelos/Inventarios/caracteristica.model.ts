//CATALOGO
export class CaracteristicaModel{
  id?: number;
  caracteristica?: string;
}


export class CaracteristicaArticuloModel{
  id?: number;
  idCaracteristica?: number;
  caracteristicaArticulo?: string;
}


export class CaracteristicaArticuloFormModel {
  id?: number;
  idCaracteristica?: number;
  caracteristicaArticulo?: string;
  constructor(){
    this.id = 0;
    this.idCaracteristica = 0;
    this.caracteristicaArticulo = null;

  }
}
