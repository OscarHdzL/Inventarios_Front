import { MesaValidacionService } from './../../../servicios/mesa-validacion.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { AdquisicionFormModel, AdquisicionModel, ProductoAdquisicionFormModel } from 'src/app/modelos/Inventarios/adquisicion.model';
import { MatAccordion } from '@angular/material/expansion';

import { ModalProductoAdquisicionComponent } from '../modal-producto-adquisicion/modal-producto-adquisicion.component';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { FileManagerService } from 'src/app/servicios/filemanager.service';


@Component({
  selector: 'vex-modal-adquisicion',
  templateUrl: './modal-adquisicion.component.html',
  styleUrls: ['./modal-adquisicion.component.scss']
})
export class ModalAdquisicionComponent implements OnInit {
  abierto = true;
  formAdquisicion: FormGroup;
  adquisicionModel: AdquisicionFormModel = new AdquisicionFormModel();
  listaCategoria: any[] = [];
  listaFabricante: any[] = [];
  listaProveedor: any[] = [];
  listaPropietario: any[] = [];
  panelOpenState = false;
  listaProductosAdquisicion = new Array<ProductoAdquisicionFormModel>();

  @ViewChild('accordion',{static:true}) Accordion: MatAccordion

  constructor(@Inject(MAT_DIALOG_DATA) public adquisicion: AdquisicionModel,
              private dialogRef: MatDialogRef<ModalAdquisicionComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private inventariosService: InventariosService,
              private dialog: MatDialog,
              private filemanagerService: FileManagerService,
              ) {

                if(adquisicion != null){
                  this.adquisicionModel.id = this.adquisicion.iD;
                  this.adquisicionModel.catproveedorid = this.adquisicion.cAT_PROVEEDOR_ID;
                  this.adquisicionModel.catpropietarioid = this.adquisicion.cAT_PROPIETARIO_ID;
                  this.adquisicionModel.monto = this.adquisicion.mONTO;
                  this.adquisicionModel.impuesto = this.adquisicion.iMPUESTO;
                  this.adquisicionModel.articulos = this.adquisicion.aRTICULOS;
                  this.adquisicionModel.facpdf = this.adquisicion.fAC_PDF;
                  this.adquisicionModel.facxml = this.adquisicion.fAC_XML;
                  this.adquisicionModel.fechadecompra = this.adquisicion.fECHADECOMPRA;
                } else {
                  this.adquisicionModel = new AdquisicionFormModel();
                }


                this.iniciarForm();
               }

  async ngOnInit() {

    this.inicializarForm();
  }

  get proveedor() { return this.formAdquisicion.get('proveedor')};
  get propietario() { return this.formAdquisicion.get('propietario')};
  get articulos() { return this.formAdquisicion.get('articulos')};
  get monto() { return this.formAdquisicion.get('monto')};
  get impuesto() { return this.formAdquisicion.get('impuesto')};

  get facturaPDF() { return this.formAdquisicion.get('facturaPDF')};
  get facturaXML() { return this.formAdquisicion.get('facturaXML')};
  get fechaCompra() { return this.formAdquisicion.get('fechaCompra')};

  public iniciarForm(){
    this.formAdquisicion = this.formBuilder.group({
      proveedor: ['', [Validators.required]],
      propietario: ['', [Validators.required]],
      articulos: [''],
      monto: [''],
      impuesto: [''],
      /* facturaPDF: [''],
      facturaXML: [''], */
      fechaCompra: ['']
    });
  }

  public inicializarForm() {
  this.proveedor.setValue(this.adquisicionModel.catproveedorid);
  this.propietario.setValue(this.adquisicionModel.catpropietarioid);
  this.articulos.setValue(this.adquisicionModel.articulos);
  this.monto.setValue(this.adquisicionModel.monto);
  this.impuesto.setValue(this.adquisicionModel.impuesto);
/*   this.facturaPDF.setValue(this.adquisicionModel.fAC_PDF);
  this.facturaXML.setValue(this.adquisicionModel.fAC_XML); */
  this.fechaCompra.setValue(this.adquisicionModel.fechadecompra);
  }

  public async guardarAdquisicion(){


    this.adquisicionModel.catproveedorid = this.proveedor.value;
    this.adquisicionModel.catpropietarioid = this.propietario.value;
    this.adquisicionModel.articulos = this.articulos.value;
    this.adquisicionModel.monto = this.monto.value;
    this.adquisicionModel.impuesto = this.impuesto.value;
    this.adquisicionModel.facpdf = 'tokenPrueba' //this.facturaPDF.value;
    this.adquisicionModel.facxml = 'tokenPrueba' //this.facturaXML.value;
    this.adquisicionModel.fechadecompra = this.fechaCompra.value;


    const respuesta =  this.adquisicionModel.id > 0 ? await this.inventariosService.actualizarAdquisicion(this.adquisicionModel) : await this.inventariosService.insertarAdquisicion(this.adquisicionModel);


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


  openModalCaracteristica(producto: ProductoAdquisicionFormModel){
    this.dialog.open(ModalProductoAdquisicionComponent,{
      height: '50%',
      width: '100%',
      autoFocus: true,
      data: producto,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(result => {
      debugger
      if(result){
        if(result.iD > 0){ //edita

        }
        else{ // agrega
          this.listaProductosAdquisicion.push(result)
        }
      }
      //this.ngOnInit();
    });

  }



  async pdfSeleccionado(event) {
    debugger
    if(event.target.files.length > 0)
     {
       const formData: any = new FormData();
      formData.append('file', event.target.files[0]);

      const respuesta = await this.filemanagerService.cargarArchivo(formData);

      if(respuesta.exito){
        this.adquisicionModel.facpdf = respuesta.anotacion;
       /*  this.produc = event.target.files[0].name;
        this.archivoEditableToken = respuesta.anotacion;
        //this.archivoEditableToken = respuesta.respuesta;
        this.archivoEditableExtension = this.archivoEditableNombre.split('.')[1]; */
        this.swalService.alertaPersonalizada(true, 'Carga de archivo correcta');
      } else {
        this.swalService.alertaPersonalizada(false, 'No se pudo cargar el archivo');
      }
     }
   }

  async xmlSeleccionado(event) {
    debugger
    if(event.target.files.length > 0)
     {
       const formData: any = new FormData();
      formData.append('file', event.target.files[0]);

      const respuesta = await this.filemanagerService.cargarArchivo(formData);

      if(respuesta.exito){
        this.adquisicionModel.facxml = respuesta.anotacion;
       /*  this.produc = event.target.files[0].name;
        this.archivoEditableToken = respuesta.anotacion;
        //this.archivoEditableToken = respuesta.respuesta;
        this.archivoEditableExtension = this.archivoEditableNombre.split('.')[1]; */
        this.swalService.alertaPersonalizada(true, 'Carga de archivo correcta');
      } else {
        this.swalService.alertaPersonalizada(false, 'No se pudo cargar el archivo');
      }
     }
   }
}
