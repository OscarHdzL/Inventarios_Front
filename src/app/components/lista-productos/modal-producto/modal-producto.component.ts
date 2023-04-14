import { CategoriaProductoModel } from './../../../modelos/Inventarios/propietario.model';
import { MesaValidacionService } from './../../../servicios/mesa-validacion.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { CaracteristicaProductoModel, ProductoFormModel, ProductoModel } from 'src/app/modelos/Inventarios/producto.model';
import { MatAccordion } from '@angular/material/expansion';



import { ModalCaracteristicaProductoComponent } from '../modal-caracteristica-producto/modal-caracteristica-producto.component';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { FabricanteModel } from 'src/app/modelos/Inventarios/propietario.model';


@Component({
  selector: 'vex-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss']
})
export class ModalProductoComponent implements OnInit {
  app: MatFormFieldAppearance
  abierto = true;
  formProducto: FormGroup;
  formCaracteristica: FormGroup;
  productoModel: ProductoFormModel = new ProductoFormModel();
  listaCategoria: CategoriaProductoModel[] = [];
  listaFabricante: FabricanteModel[] = [];
  listaCaracteristicas: string[] = [];

  listaPropietario: any[] = [];
  panelOpenState = false;
  @ViewChild('accordion',{static:true}) Accordion: MatAccordion

  constructor(@Inject(MAT_DIALOG_DATA) public producto: ProductoModel,
              private dialogRef: MatDialogRef<ModalProductoComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private mesaValidacionService: MesaValidacionService,
              private dialog: MatDialog,
              private inventariosService: InventariosService,
              ) {

                debugger
                if(producto != null){
                  this.productoModel.id = this.producto.idproducto;
                  this.productoModel.catFabricanteId = this.producto.idfabricante;
                  this.productoModel.catCategoriaProductoId = this.producto.idcategoria;
                  this.productoModel.modelo = this.producto.modelo;
                  this.productoModel.anio = this.producto.anio;
                  this.productoModel.vidautil = this.producto.vidautil;
                  this.productoModel.nuevo= this.producto.nuevo;

                } else {
                  this.productoModel = new ProductoFormModel();
                }


                this.iniciarForm();
               }

  async ngOnInit() {

    this.listaFabricante = await this.obtenerFabricantes();
    this.listaCategoria = await this.obtenerCategoriasProducto();

    this.inicializarForm();
  }

  get modelo() { return this.formProducto.get('modelo')};
  get anio() { return this.formProducto.get('anio')};
  get categoria() { return this.formProducto.get('categoria')};
  get fabricante() { return this.formProducto.get('fabricante')};
  get nuevo() { return this.formProducto.get('nuevo')};
  get vidaUtil() { return this.formProducto.get('vidaUtil')};
  get caracteristica() { return this.formCaracteristica.get('caracteristica')};

  public async obtenerFabricantes(){
    const respuesta = await this.inventariosService.obtenerCatalogoFabricantes();
    return respuesta.exito ? respuesta.output : [];
  }

  public async obtenerCategoriasProducto(){
    const respuesta = await this.inventariosService.obtenerCategoriasProducto();
    return respuesta.exito ? respuesta.output : [];
  }

  public iniciarForm(){

    this.formProducto = this.formBuilder.group({
      modelo: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      fabricante: ['', [Validators.required]],
      nuevo: ['', [Validators.required]],
      vidaUtil: ['', [Validators.required]],
    });

    this.formCaracteristica = this.formBuilder.group({
      caracteristica: ['',Validators.required]
    });
  }


  public agregarCaracteristica(){
    if(this.caracteristica.value){
      this.listaCaracteristicas.push(this.caracteristica.value);
      this.formCaracteristica.reset();
    }
  }

  public inicializarForm() {
    this.modelo.setValue(this.productoModel.modelo);
    this.fabricante.setValue(this.productoModel.catFabricanteId);
    this.anio.setValue(this.productoModel.anio)
    this.categoria.setValue(this.productoModel.catCategoriaProductoId)
    this.vidaUtil.setValue(this.productoModel.vidautil)
    this.nuevo.setValue(this.productoModel.nuevo)
  }

  public async guardarProducto(){
    this.productoModel.modelo = this.modelo.value;
    this.productoModel.catFabricanteId = this.fabricante.value;
    this.productoModel.anio = this.anio.value;
    this.productoModel.catCategoriaProductoId = this.categoria.value;
    this.productoModel.vidautil = this.vidaUtil.value;
    this.productoModel.nuevo= this.nuevo.value;


    const respuesta = this.productoModel.id > 0 ? await this.inventariosService.actualizarProducto(this.productoModel) : await this.inventariosService.insertarProducto(this.productoModel);

    if(respuesta.exito){
      this.swalService.alertaPersonalizada(true, 'Exito');
      this.close(true);
    } else {
      this.swalService.alertaPersonalizada(false, 'Error');
    }

  }

  public eliminarCaracteristica(caracteristica: string ){
    const index = this.listaCaracteristicas.indexOf(caracteristica);
    const x =  this.listaCaracteristicas.splice(index, 1);

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
