import { MesaValidacionService } from './../../../servicios/mesa-validacion.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { CaracteristicaProductoModel, ProductoFormModel, ProductoModel } from 'src/app/modelos/Inventarios/producto.model';
import { MatAccordion } from '@angular/material/expansion';



import { ModalCaracteristicaProductoComponent } from '../modal-caracteristica-producto/modal-caracteristica-producto.component';
import { MatFormFieldAppearance } from '@angular/material/form-field';


@Component({
  selector: 'vex-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss']
})
export class ModalProductoComponent implements OnInit {
  app: MatFormFieldAppearance
  abierto = true;
  formProducto: FormGroup;
  productoModel: ProductoFormModel = new ProductoFormModel();
  listaCategoria: any[] = [];
  listaFabricante: any[] = [];
  listaProveedor: any[] = [];
  listaPropietario: any[] = [];
  panelOpenState = false;
  @ViewChild('accordion',{static:true}) Accordion: MatAccordion

  constructor(@Inject(MAT_DIALOG_DATA) public producto: ProductoModel,
              private dialogRef: MatDialogRef<ModalProductoComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private mesaValidacionService: MesaValidacionService,
              private dialog: MatDialog,
              ) {

                debugger
                if(producto != null){
                  this.productoModel.id = this.producto.id;
                  this.productoModel.modelo = this.producto.modelo;
                  this.productoModel.fabricante = this.producto.fabricante;
                } else {
                  this.productoModel = new ProductoFormModel();
                }


                this.iniciarForm();
               }

  async ngOnInit() {

    this.inicializarForm();
  }

  get modelo() { return this.formProducto.get('modelo')};
  get anio() { return this.formProducto.get('anio')};
  get categoria() { return this.formProducto.get('categoria')};
  get fabricante() { return this.formProducto.get('fabricante')};
  get nuevo() { return this.formProducto.get('nuevo')};
  //get proveedor() { return this.formProducto.get('proveedor')};
  //get propietario() { return this.formProducto.get('propietario')};
  //get cantidad() { return this.formProducto.get('cantidad')};
  //get valorUnitario() { return this.formProducto.get('valorUnitario')};
  get vidaUtil() { return this.formProducto.get('vidaUtil')};
  //get observaciones() { return this.formProducto.get('observaciones')};

  public iniciarForm(){
    debugger
    this.formProducto = this.formBuilder.group({
      modelo: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      fabricante: ['', [Validators.required]],
      nuevo: ['', [Validators.required]],
     //proveedor: ['', [Validators.required]],
     //propietario: ['', [Validators.required]],
     //cantidad: ['', [Validators.required]],
     //valorUnitario: ['', [Validators.required]],
      vidaUtil: ['', [Validators.required]],
      //observaciones: ['', [Validators.required]],

    });
  }

  public inicializarForm() {
    this.modelo.setValue(this.productoModel.modelo);
    this.fabricante.setValue(this.productoModel.fabricante);
    this.anio.setValue(this.productoModel.anio)
    this.categoria.setValue(this.productoModel.categoria)
    /*this.fabricante.setValue(this.productoModel.fabricante)
    this.proveedor.setValue(this.productoModel.proveedor)
    this.propietario.setValue(this.productoModel.propietario)
    this.cantidad.setValue(this.productoModel.cantidad)
    this.valorUnitario.setValue(this.productoModel.valorUnitario) */
    this.vidaUtil.setValue(this.productoModel.vidaUtil)
    //this.observaciones.setValue(this.productoModel.observaciones)
  }

  public async guardarProducto(){

    this.productoModel.modelo = this.modelo.value;
    this.productoModel.fabricante = this.fabricante.value;
    this.productoModel.anio = this.anio.value;
    this.productoModel.categoria = this.categoria.value;
/*     this.productoModel.fabricante = this.fabricante.value;
    this.productoModel.proveedor = this.proveedor.value;
    this.productoModel.cantidad = this.cantidad.value;
    this.productoModel.valorUnitario = this.valorUnitario.value; */
    this.productoModel.vidaUtil = this.vidaUtil.value;
    //this.productoModel.observaciones = this.observaciones.value;

    const respuesta =  {
      exito: true
    }
    //this.productoModel.id > 0 ? await this.mesaValidacionService.actualizarProducto(this.productoModel) : await this.mesaValidacionService.insertarProducto(this.productoModel);


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


  openModalCaracteristica(caracteristica: CaracteristicaProductoModel){
    this.dialog.open(ModalCaracteristicaProductoComponent,{
      height: '50%',
      width: '100%',
      autoFocus: true,
      data: caracteristica,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    });

  }


}
