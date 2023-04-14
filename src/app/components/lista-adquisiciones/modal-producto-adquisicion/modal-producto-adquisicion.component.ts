
import { AreaModel } from 'src/app/modelos/area.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';

import { Observable, map, startWith } from 'rxjs';
import { ProductoModel } from 'src/app/modelos/Inventarios/producto.model';
import { ProductoAdquisicionFormModel } from 'src/app/modelos/Inventarios/adquisicion.model';
import { ModalProductoComponent } from '../../lista-productos/modal-producto/modal-producto.component';
import { InventariosService } from 'src/app/servicios/inventarios.service';


@Component({
  selector: 'vex-modal-producto-adquisicion',
  templateUrl: './modal-producto-adquisicion.component.html',
  styleUrls: ['./modal-producto-adquisicion.component.scss']
})
export class ModalProductoAdquisicionComponent implements OnInit {
  sesionUsuarioActual: SesionModel;
  listaProductos: ProductoModel[] = [];
  formProducto: FormGroup;
  productoModel: ProductoAdquisicionFormModel = new ProductoAdquisicionFormModel();
  filteredProductos: Observable<ProductoModel[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public producto: ProductoAdquisicionFormModel,
              private dialogRef: MatDialogRef<ModalProductoAdquisicionComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private inventariosService: InventariosService,
              private dialog: MatDialog,
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
                if(producto != null){
                  this.productoModel.id = this.producto.id;
                  this.productoModel.catProductoId = this.producto.catProductoId;
                  this.productoModel.cantidad = this.producto.cantidad;
                  this.productoModel.costosiunitario = this.producto.costosiunitario;
                  this.productoModel.tblAdquisicionId = this.producto.tblAdquisicionId;

                } else {
                  this.productoModel = new ProductoAdquisicionFormModel();
                }

                //this.productoModel = this.producto;


                this.iniciarForm();
               }

  async ngOnInit() {
    //this.listaProductos = await this.obtenerAreas();
    this.listaProductos = await this.obtenerProductos();


    this.inicializarForm();

    this.filteredProductos = this.producto_.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  public async obtenerProductos(){
    const respuesta = await this.inventariosService.obtenerCatalogoProductos();
    return respuesta ? respuesta : [];
  }


  get producto_() { return this.formProducto.get('producto') }
  get cantidad() { return this.formProducto.get('cantidad') }
  get costoUnitario() { return this.formProducto.get('costoUnitario') }


  public iniciarForm(){
    this.formProducto = this.formBuilder.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      costoUnitario: ['', [Validators.required]],
    });
  }


  public inicializarForm() {
   /*  this.producto_.setValue(this.productoModel.idProducto);
    this.productoArticulo.setValue(this.productoModel.productoArticulo); */
  }

  public async guardarProducto(){

    //SE ACTUALIZA EL ID CUANDO SE SELECCIONA O ENCUENTRA EL RESULTADO EN EL AUTOCOMPLETE
    //this.productoModel.cAT_PRODUCTO_ID = this.producto_.value;
    this.productoModel.cantidad = this.cantidad.value;
    this.productoModel.costosiunitario = this.costoUnitario.value;

    //const respuesta = this.productoModel.id > 0 ? await this.inventariosService.actualizarProducto(this.productoModel) : await this.inventariosService.insertarProdcutoAdquisicion(this.productoModel);

    //const respuesta = await this.inventariosService.insertarProdcutoAdquisicion(this.productoModel);
    const respuesta = {exito: true}
    if(respuesta.exito){
      this.swalService.alertaPersonalizada(true, 'Exito');
      //this.close(true);
      this.dialogRef.close(this.productoModel);

    } else {
      this.swalService.alertaPersonalizada(false, 'Error');
    }
  }

  close(result: boolean) {
    this.dialogRef.close(null);
  }



public async productoSeleccionado(producto: ProductoModel){
  console.log('Producto seleccionado: ');
console.log(producto);
this.productoModel.catProductoId = producto.idproducto;
}


private _filter(value: string): ProductoModel[] {
  const filterValue = this._normalizeValue(value);
  return this.listaProductos.filter(producto => this._normalizeValue(producto.modelo).includes(filterValue));
}

private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}

openModalProducto(producto: ProductoAdquisicionFormModel){
  this.dialog.open(ModalProductoComponent,{
    height: '80%',
    width: '100%',
    autoFocus: true,
    data: producto,
    disableClose: true,
    maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
  }).afterClosed().subscribe(result => {

  });

}

}
