
import { AreaModel } from 'src/app/modelos/area.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';

import { Observable, map, startWith } from 'rxjs';
import { ProductoModel } from 'src/app/modelos/Inventarios/producto.model';
import { ProductoAdquisicionFormModel } from 'src/app/modelos/Inventarios/adquisicion.model';


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
              private mesaValidacionService: MesaValidacionService
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
                if(producto != null){
                  this.productoModel.iD = this.producto.iD;
                  this.productoModel.cAT_PRODUCTO_ID = this.producto.cAT_PRODUCTO_ID;
                  this.productoModel.cANTIDAD = this.producto.cANTIDAD;
                  this.productoModel.cANTIDAD = this.producto.cANTIDAD;

                } else {
                  this.productoModel = new ProductoAdquisicionFormModel();
                }

                //this.productoModel = this.producto;


                this.iniciarForm();
               }

  async ngOnInit() {
    //this.listaProductos = await this.obtenerAreas();
    this.listaProductos = [/* {
      id: 1,
      producto: 'Lector de huella'
    },
    {
      id: 2,
      producto: 'VGA'
    },
    {
      id: 3,
      producto: 'HDMI'
    },
    {
      id: 4,
      producto: 'Disco duro'
    } */];


    this.inicializarForm();

    this.filteredProductos = this.producto_.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  public async obtenerAreas(){
    const respuesta = await this.mesaValidacionService.obtenerCatalogoAreas();
    return respuesta.exito ? respuesta.respuesta : [];
  }


  get producto_() { return this.formProducto.get('producto') }
  get productoArticulo() { return this.formProducto.get('productoArticulo') }


  public iniciarForm(){
    this.formProducto = this.formBuilder.group({
      producto: ['', [Validators.required]],
      productoArticulo: ['', [Validators.required]],
    });
  }


  public inicializarForm() {
   /*  this.producto_.setValue(this.productoModel.idProducto);
    this.productoArticulo.setValue(this.productoModel.productoArticulo); */
  }

  public async guardarProducto(){
    //this.productoModel.id = 0;
   /*  this.productoModel.idProducto = this.producto_.value;
    this.productoModel.productoArticulo = this.productoArticulo.value; */

    const respuesta = {exito: true} //this.productoModel.id > 0 ? await this.mesaValidacionService.actualizarProducto(this.productoModel) : await this.mesaValidacionService.insertarProducto(this.productoModel);

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



public async productoSeleccionado(producto: ProductoModel){

debugger
console.log('producto: ');
console.log(producto);

}


private _filter(value: string): ProductoModel[] {
  const filterValue = this._normalizeValue(value);
  return this.listaProductos.filter(producto => this._normalizeValue(producto.modelo).includes(filterValue));
}

private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}
}
