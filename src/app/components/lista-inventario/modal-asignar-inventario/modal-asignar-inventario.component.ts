
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

import { ModalProductoComponent } from '../../lista-productos/modal-producto/modal-producto.component';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { RelAdquisicionDetalle } from 'src/app/modelos/Inventarios/adquisicion.model';


@Component({
  selector: 'vex-modal-asignar-inventario',
  templateUrl: './modal-asignar-inventario.component.html',
  styleUrls: ['./modal-asignar-inventario.component.scss']
})
export class ModalAsignarInventarioComponent implements OnInit {
  sesionUsuarioActual: SesionModel;
  listaProductos: ProductoModel[] = [];
  formProducto: FormGroup;
  productoModel: RelAdquisicionDetalle = new RelAdquisicionDetalle();
  filteredProductos: Observable<ProductoModel[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public producto: RelAdquisicionDetalle,
              private dialogRef: MatDialogRef<ModalAsignarInventarioComponent>,
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

                } else {
                  this.productoModel = new RelAdquisicionDetalle();
                }

                this.productoModel.accionAuxiliar = this.producto.accionAuxiliar;

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
  public iniciarForm(){
    this.formProducto = this.formBuilder.group({
      producto: ['', [Validators.required]]
    });
  }


  public inicializarForm() {
   /*  this.producto_.setValue(this.productoModel.idProducto);
    this.productoArticulo.setValue(this.productoModel.productoArticulo); */
  }

  public async guardarProducto(){

    //SE ACTUALIZA EL ID CUANDO SE SELECCIONA O ENCUENTRA EL RESULTADO EN EL AUTOCOMPLETE
    //this.productoModel.cAT_PRODUCTO_ID = this.producto_.value;

    let lista = [];
    lista.push(this.productoModel);

    const respuesta =   this.productoModel.tblAdquisicionId == 0 ? { exito: true} : await this.inventariosService.insertarAdquisicionDetalle(
      this.productoModel
    );

    if (respuesta.exito) {
      this.swalService.alertaPersonalizada(true, "Exito");
      this.close(this.productoModel);
    } else {
      this.swalService.alertaPersonalizada(false, "Error");
    }
  }

  close(result: any) {
    this.dialogRef.close(result);
  }



public async productoSeleccionado(producto: ProductoModel){
  console.log('Producto seleccionado: ');
  console.log(producto);
  this.productoModel.catProductoId = producto.idproducto;
  this.productoModel.modelo = producto.modelo;
}


private _filter(value: string): ProductoModel[] {
  const filterValue = this._normalizeValue(value);
  return this.listaProductos.filter(producto => this._normalizeValue(producto.modelo).includes(filterValue));
}

private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}

openModalProducto(producto: RelAdquisicionDetalle){
  this.dialog.open(ModalProductoComponent,{
    height: '70%',
    width: '100%',
    autoFocus: true,
    data: producto,
    disableClose: true,
    maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
  }).afterClosed().subscribe(async result => {
    this.ngOnInit();
  });
}


}
