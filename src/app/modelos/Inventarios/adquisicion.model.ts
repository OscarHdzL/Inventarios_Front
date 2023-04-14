export class AdquisicionModel{
  iD?: number;
  cAT_PROVEEDOR_ID?: number;
  cAT_PROPIETARIO_ID?: number;
  mONTO?: number;
  iMPUESTO?: number;
  aRTICULOS?: number;
  fAC_PDF?: string;
  fAC_XML?: string;
  fECHADECOMPRA?: string;
  eSTATUS?: boolean;
  iNCLUSION?: string;

}

export class AdquisicionFormModel {
  id?: number;
  catproveedorid?: number;
  catpropietarioid?: number;
  monto?: number;
  impuesto?: number;
  articulos?: number;
  facpdf?: string;
  facxml?: string;
  fechadecompra?: string;
  detalle?: ProductoAdquisicionFormModel[];

  constructor(){
    this.id = 0;
    this.catproveedorid = 0;
    this.catpropietarioid = 0;
    this.monto = null;
    this.impuesto = null;
    this.articulos = null;
    this.facpdf = null;
    this.facxml = null;
    this.fechadecompra = null;
    this.detalle = [];
  }
}


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
}


