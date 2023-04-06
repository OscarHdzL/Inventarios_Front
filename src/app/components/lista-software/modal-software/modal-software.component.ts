
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';


import { SoftwareFormModel, SoftwareModel } from 'src/app/modelos/Inventarios/software.model';
@Component({
  selector: 'vex-modal-software',
  templateUrl: './modal-software.component.html',
  styleUrls: ['./modal-software.component.scss']
})
export class ModalSoftwareComponent implements OnInit {
  sesionUsuarioActual: SesionModel;
  tokenSoftware: string;
  formSoftware: FormGroup;
  softwareModel: SoftwareFormModel = new SoftwareFormModel();
  archivoEditableNombreEdicion: string

  listaPropietario: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public software: SoftwareModel,
              private dialogRef: MatDialogRef<ModalSoftwareComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private mesaValidacionService: MesaValidacionService
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
                if(software != null){
                  this.softwareModel.id = this.software.id;
                  this.softwareModel.proveedor = this.software.proveedor;
                  this.softwareModel.contactoProveedor = this.software.contactoProveedor;
                  this.softwareModel.soporte = this.software.soporte;
                  this.softwareModel.contactoSoporte = this.software.contactoSoporte;
                  this.softwareModel.nombre = this.software.nombre;
                  this.softwareModel.fabricante = this.software.fabricante;
                  this.softwareModel.objetivo = this.software.objetivo;
                  this.softwareModel.tokenManualInstalacion = this.software.tokenManualInstalacion;
                  this.softwareModel.numeroLicencias = this.software.numeroLicencias;
                  this.softwareModel.propietario = this.software.propietario;
                  this.softwareModel.notasInstalacion = this.software.notasInstalacion;

                } else {
                  this.softwareModel = new SoftwareFormModel();
                }

                //this.softwareModel = this.software;


                this.iniciarForm();
               }

  async ngOnInit() {

    this.listaPropietario = [{id: 1, descripcion:'Propietario 1'}];
    this.inicializarForm();

  }



  get proveedor() { return this.formSoftware.get('proveedor')}
  get contactoProveedor() { return this.formSoftware.get('contactoProveedor')}
  get soporte() { return this.formSoftware.get('soporte')}
  get contactoSoporte() { return this.formSoftware.get('contactoSoporte')}
  get nombre() { return this.formSoftware.get('nombre')}
  get fabricante() { return this.formSoftware.get('fabricante')}
  get objetivo() { return this.formSoftware.get('objetivo')}
  get tokenManualInstalacion() { return this.formSoftware.get('tokenManualInstalacion')}
  get numeroLicencias() { return this.formSoftware.get('numeroLicencias')}
  get propietario() { return this.formSoftware.get('propietario')}
  get notasInstalacion() { return this.formSoftware.get('notasInstalacion')}




  public iniciarForm(){
    this.formSoftware = this.formBuilder.group({
      proveedor: ['', [Validators.required]],
      contactoProveedor: ['', [Validators.required]],
      soporte: ['', [Validators.required]],
      contactoSoporte: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      fabricante: ['', [Validators.required]],
      objetivo: ['', [Validators.required]],
      tokenManualInstalacion: ['', [Validators.required]],
      numeroLicencias: ['', [Validators.required]],
      propietario: ['', [Validators.required]],
      notasInstalacion: ['', [Validators.required]]
    });
  }


  public inicializarForm() {

    this.proveedor.setValue(this.softwareModel.proveedor);
    this.contactoProveedor.setValue(this.softwareModel.contactoProveedor);
    this.soporte.setValue(this.softwareModel.soporte);
    this.contactoSoporte.setValue(this.softwareModel.contactoSoporte);
    this.nombre.setValue(this.softwareModel.nombre);
    this.fabricante.setValue(this.softwareModel.fabricante);
    this.objetivo.setValue(this.softwareModel.objetivo);
    this.tokenManualInstalacion.setValue(this.softwareModel.tokenManualInstalacion);
    this.numeroLicencias.setValue(this.softwareModel.numeroLicencias);
    this.propietario.setValue(this.softwareModel.propietario);
    this.notasInstalacion.setValue(this.softwareModel.notasInstalacion);
  }

  public async guardarSoftware(){
    //this.softwareModel.id = 0;

    this.softwareModel.proveedor = this.proveedor.value;
    this.softwareModel.contactoProveedor = this.contactoProveedor.value;
    this.softwareModel.soporte = this.soporte.value;
    this.softwareModel.contactoSoporte = this.contactoSoporte.value;
    this.softwareModel.nombre = this.nombre.value;
    this.softwareModel.fabricante = this.fabricante.value;
    this.softwareModel.objetivo = this.objetivo.value;
    this.softwareModel.tokenManualInstalacion = this.tokenManualInstalacion.value;
    this.softwareModel.numeroLicencias = this.numeroLicencias.value;
    this.softwareModel.propietario = this.propietario.value;
    this.softwareModel.notasInstalacion = this.notasInstalacion.value;


    const respuesta = {exito: true} //this.softwareModel.id > 0 ? await this.mesaValidacionService.actualizarSoftware(this.softwareModel) : await this.mesaValidacionService.insertarSoftware(this.softwareModel);

    if(respuesta.exito){
      this.swalService.alertaPersonalizada(true, 'Exito');
      this.close(true);
    } else {
      this.swalService.alertaPersonalizada(false, 'Error');
    }
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  async editableSeleccionadoEdicion(event) {
    if(event.target.files.length > 0)
     {
       const formData: any = new FormData();
      formData.append('file', event.target.files[0]);

      const respuesta = {exito: true }//await this.filemanagerService.cargarArchivo(formData);

      if(respuesta.exito){

        this.archivoEditableNombreEdicion = event.target.files[0].name;


      } else {
        this.swalService.alertaPersonalizada(false, 'No se pudo cargar el archivo');
      }
     }
   }

}
