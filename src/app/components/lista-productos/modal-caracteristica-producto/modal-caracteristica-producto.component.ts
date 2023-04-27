
import { AreaModel } from 'src/app/modelos/area.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';

import { Observable, map, startWith } from 'rxjs';
import { CaracteristicaProductoFormModel, CaracteristicaProductoModel } from 'src/app/modelos/Inventarios/producto.model';

@Component({
  selector: 'vex-modal-caracteristica-producto',
  templateUrl: './modal-caracteristica-producto.component.html',
  styleUrls: ['./modal-caracteristica-producto.component.scss']
})
export class ModalCaracteristicaProductoComponent implements OnInit {
  sesionUsuarioActual: SesionModel;
  listaCaracteristicas: CaracteristicaProductoModel[] = [];
  formCaracteristica: FormGroup;
  caracteristicaModel: CaracteristicaProductoFormModel = new CaracteristicaProductoFormModel();
  filteredCaracteristicas: Observable<CaracteristicaProductoModel[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public caracteristica: CaracteristicaProductoModel,
              private dialogRef: MatDialogRef<ModalCaracteristicaProductoComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private mesaValidacionService: MesaValidacionService
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
                if(caracteristica != null){
                  this.caracteristicaModel.id = this.caracteristica.id;
                  this.caracteristicaModel.idCaracteristica = this.caracteristica.idCaracteristica;
                  this.caracteristicaModel.caracteristicaProducto = this.caracteristica.caracteristicaProducto;

                } else {
                  this.caracteristicaModel = new CaracteristicaProductoFormModel();
                }

                //this.caracteristicaModel = this.caracteristica;


                this.iniciarForm();
               }

  async ngOnInit() {
    //this.listaCaracteristicas = await this.obtenerAreas();
    this.listaCaracteristicas = [{
      id: 1,
      caracteristica: 'Lector de huella'
    },
    {
      id: 2,
      caracteristica: 'VGA'
    },
    {
      id: 3,
      caracteristica: 'HDMI'
    },
    {
      id: 4,
      caracteristica: 'Disco duro'
    }];


    this.inicializarForm();

    this.filteredCaracteristicas = this.caracteristica_.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  public async obtenerAreas(){
    const respuesta = await this.mesaValidacionService.obtenerCatalogoAreas();
    return respuesta.exito ? respuesta.respuesta : [];
  }


  get caracteristica_() { return this.formCaracteristica.get('caracteristica') }
  get caracteristicaProducto() { return this.formCaracteristica.get('caracteristicaProducto') }


  public iniciarForm(){
    this.formCaracteristica = this.formBuilder.group({
      caracteristica: ['', [Validators.required]],
      caracteristicaProducto: ['', [Validators.required]],
    });
  }


  public inicializarForm() {
    this.caracteristica_.setValue(this.caracteristicaModel.idCaracteristica);
    this.caracteristicaProducto.setValue(this.caracteristicaModel.caracteristicaProducto);
  }

  public async guardarCaracteristica(){
    //this.caracteristicaModel.id = 0;
    this.caracteristicaModel.idCaracteristica = this.caracteristica_.value;
    this.caracteristicaModel.caracteristicaProducto = this.caracteristicaProducto.value;

    const respuesta = {exito: true} //this.caracteristicaModel.id > 0 ? await this.mesaValidacionService.actualizarCaracteristica(this.caracteristicaModel) : await this.mesaValidacionService.insertarCaracteristica(this.caracteristicaModel);

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



public async caracteristicaSeleccionado(caracteristica: CaracteristicaProductoModel){


console.log('caracteristica: ');
console.log(caracteristica);

}


private _filter(value: string): CaracteristicaProductoModel[] {
  const filterValue = this._normalizeValue(value);
  return this.listaCaracteristicas.filter(caracteristica => this._normalizeValue(caracteristica.caracteristica).includes(filterValue));
}

private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}
}
