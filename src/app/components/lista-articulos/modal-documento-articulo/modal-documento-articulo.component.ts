
import { AreaModel } from 'src/app/modelos/area.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';

import { Observable, map, startWith } from 'rxjs';
import { DocumentoArticuloFormModel, DocumentoArticuloModel } from 'src/app/modelos/Inventarios/documento.model';

@Component({
  selector: 'vex-modal-documento-articulo',
  templateUrl: './modal-documento-articulo.component.html',
  styleUrls: ['./modal-documento-articulo.component.scss']
})
export class ModalDocumentoArticuloComponent implements OnInit {
  sesionUsuarioActual: SesionModel;
  tokenDocumento: string;
  formDocumento: FormGroup;
  documentoModel: DocumentoArticuloFormModel = new DocumentoArticuloFormModel();
  archivoEditableNombreEdicion: string

  constructor(@Inject(MAT_DIALOG_DATA) public documento: DocumentoArticuloModel,
              private dialogRef: MatDialogRef<ModalDocumentoArticuloComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private mesaValidacionService: MesaValidacionService
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
                if(documento != null){
                  this.documentoModel.id = this.documento.id;
                  this.documentoModel.documento = this.documento.documento;
                  this.documentoModel.token = this.documento.token;

                } else {
                  this.documentoModel = new DocumentoArticuloFormModel();
                }

                //this.documentoModel = this.documento;


                this.iniciarForm();
               }

  async ngOnInit() {

    this.inicializarForm();

  }



  get documento_() { return this.formDocumento.get('documento') }



  public iniciarForm(){
    this.formDocumento = this.formBuilder.group({
      documento: ['', [Validators.required]],
      documentoArticulo: ['', [Validators.required]],
    });
  }


  public inicializarForm() {
    this.documento_.setValue(this.documentoModel.documento);
  }

  public async guardarDocumento(){
    //this.documentoModel.id = 0;
    this.documentoModel.documento = this.documento_.value;
    this.documentoModel.token = this.tokenDocumento;

    const respuesta = {exito: true} //this.documentoModel.id > 0 ? await this.mesaValidacionService.actualizarDocumento(this.documentoModel) : await this.mesaValidacionService.insertarDocumento(this.documentoModel);

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
