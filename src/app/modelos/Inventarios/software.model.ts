export class SoftwareModel{
  id?: number;
  proveedor?: string;
  contactoProveedor?: string;
  soporte?: string;
  contactoSoporte?: string;
  nombre?: string;
  fabricante?: string;
  objetivo?: string;
  tokenManualInstalacion?: string;
  numeroLicencias?: number;
  propietario?: string;
  notasInstalacion?: string;
  activo?: boolean;
}


export class SoftwareFormModel {
  id?: number;
  proveedor?: string;
  contactoProveedor?: string;
  soporte?: string;
  contactoSoporte?: string;
  nombre?: string;
  fabricante?: string;
  objetivo?: string;
  tokenManualInstalacion?: string;
  numeroLicencias?: number;
  propietario?: string;
  notasInstalacion?: string;
  activo?: boolean;
  constructor(){
    this.id = 0;
    this.proveedor = null;
    this.contactoProveedor = null;
    this.soporte = null;
    this.contactoSoporte = null;
    this.nombre = null;
    this.fabricante = null;
    this.objetivo = null;
    this.tokenManualInstalacion = null;
    this.numeroLicencias = null;
    this.propietario = null;
    this.notasInstalacion = null;
    this.activo = true;
  }
}
