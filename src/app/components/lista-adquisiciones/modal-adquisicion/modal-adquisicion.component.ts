import { MesaValidacionService } from './../../../servicios/mesa-validacion.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { AdquisicionFormModel, AdquisicionModel, ProductoAdquisicionFormModel } from 'src/app/modelos/Inventarios/adquisicion.model';
import { MatAccordion } from '@angular/material/expansion';

import { ModalProductoAdquisicionComponent } from '../modal-producto-adquisicion/modal-producto-adquisicion.component';


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
  @ViewChild('accordion',{static:true}) Accordion: MatAccordion

  constructor(@Inject(MAT_DIALOG_DATA) public adquisicion: AdquisicionModel,
              private dialogRef: MatDialogRef<ModalAdquisicionComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private mesaValidacionService: MesaValidacionService,
              private dialog: MatDialog,
              ) {

                if(adquisicion != null){
                  this.adquisicionModel.iD = this.adquisicion.iD;
                  this.adquisicionModel.cAT_PROVEEDOR_ID = this.adquisicion.cAT_PROVEEDOR_ID;
                  this.adquisicionModel.cAT_PROPIETARIO_ID = this.adquisicion.cAT_PROPIETARIO_ID;
                  this.adquisicionModel.mONTO = this.adquisicion.mONTO;
                  this.adquisicionModel.iMPUESTO = this.adquisicion.iMPUESTO;
                  this.adquisicionModel.aRTICULOS = this.adquisicion.aRTICULOS;
                  this.adquisicionModel.fAC_PDF = this.adquisicion.fAC_PDF;
                  this.adquisicionModel.fAC_XML = this.adquisicion.fAC_XML;
                  this.adquisicionModel.fECHADECOMPRA = this.adquisicion.fECHADECOMPRA;
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
  this.proveedor.setValue(this.adquisicionModel.cAT_PROVEEDOR_ID);
  this.propietario.setValue(this.adquisicionModel.cAT_PROPIETARIO_ID);
  this.articulos.setValue(this.adquisicionModel.aRTICULOS);
  this.monto.setValue(this.adquisicionModel.mONTO);
  this.impuesto.setValue(this.adquisicionModel.iMPUESTO);
/*   this.facturaPDF.setValue(this.adquisicionModel.fAC_PDF);
  this.facturaXML.setValue(this.adquisicionModel.fAC_XML); */
  this.fechaCompra.setValue(this.adquisicionModel.fECHADECOMPRA);
  }

  public async guardarAdquisicion(){


    this.adquisicionModel.cAT_PROVEEDOR_ID = this.proveedor.value;
    this.adquisicionModel.cAT_PROPIETARIO_ID = this.propietario.value;
    this.adquisicionModel.aRTICULOS = this.articulos.value;
    this.adquisicionModel.mONTO = this.monto.value;
    this.adquisicionModel.iMPUESTO = this.impuesto.value;
    this.adquisicionModel.fAC_PDF = '' //this.facturaPDF.value;
    this.adquisicionModel.fAC_XML = '' //this.facturaXML.value;
    this.adquisicionModel.fECHADECOMPRA = this.fechaCompra.value;


    const respuesta =  {
      exito: true
    }
    //this.adquisicionModel.id > 0 ? await this.mesaValidacionService.actualizarAdquisicion(this.adquisicionModel) : await this.mesaValidacionService.insertarAdquisicion(this.adquisicionModel);


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

      this.ngOnInit();
    });

  }

}
