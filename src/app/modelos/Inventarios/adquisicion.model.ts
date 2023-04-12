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

  constructor(){
    this.iD = 0;
    this.cAT_PROVEEDOR_ID = 0;
    this.cAT_PROPIETARIO_ID = 0;
    this.mONTO = null;
    this.iMPUESTO = null;
    this.aRTICULOS = null;
    this.fAC_PDF = null;
    this.fAC_XML = null;
    this.fECHADECOMPRA = null;
    this.eSTATUS = null;
    this.iNCLUSION = null;
  }
}


export class ProductoAdquisicionFormModel {
  iD?: number;
  cANTIDAD?: number;
  tBL_ADQUISICION_ID?: number;
  cAT_PRODUCTO_ID?: number;
  cOSTOSIUNITARIO?: number;
  eSTATUS?: boolean;
  iNCLUSION?: string;

  constructor(){
    this.iD = 0;
    this.cANTIDAD = 0;
    this.tBL_ADQUISICION_ID = 0;
    this.cAT_PRODUCTO_ID = null;
    this.cOSTOSIUNITARIO = null;
    this.eSTATUS = null;
    this.iNCLUSION = null;
  }
}


