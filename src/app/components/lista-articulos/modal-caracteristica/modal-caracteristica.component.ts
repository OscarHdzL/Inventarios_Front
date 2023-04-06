
import { AreaModel } from 'src/app/modelos/area.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';
import { CaracteristicaArticuloFormModel, CaracteristicaArticuloModel, CaracteristicaModel } from 'src/app/modelos/Inventarios/caracteristica.model';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'vex-modal-caracteristica',
  templateUrl: './modal-caracteristica.component.html',
  styleUrls: ['./modal-caracteristica.component.scss']
})
export class ModalCaracteristicaComponent implements OnInit {
  sesionUsuarioActual: SesionModel;
  listaCaracteristicas: CaracteristicaModel[] = [];
  formCaracteristica: FormGroup;
  caracteristicaModel: CaracteristicaArticuloFormModel = new CaracteristicaArticuloFormModel();
  filteredCaracteristicas: Observable<CaracteristicaModel[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public caracteristica: CaracteristicaArticuloModel,
              private dialogRef: MatDialogRef<ModalCaracteristicaComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private mesaValidacionService: MesaValidacionService
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
                if(caracteristica != null){
                  this.caracteristicaModel.id = this.caracteristica.id;
                  this.caracteristicaModel.idCaracteristica = this.caracteristica.idCaracteristica;
                  this.caracteristicaModel.caracteristicaArticulo = this.caracteristica.caracteristicaArticulo;

                } else {
                  this.caracteristicaModel = new CaracteristicaArticuloFormModel();
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
  get caracteristicaArticulo() { return this.formCaracteristica.get('caracteristicaArticulo') }


  public iniciarForm(){
    this.formCaracteristica = this.formBuilder.group({
      caracteristica: ['', [Validators.required]],
      caracteristicaArticulo: ['', [Validators.required]],
    });
  }


  public inicializarForm() {
    this.caracteristica_.setValue(this.caracteristicaModel.idCaracteristica);
    this.caracteristicaArticulo.setValue(this.caracteristicaModel.caracteristicaArticulo);
  }

  public async guardarCaracteristica(){
    //this.caracteristicaModel.id = 0;
    this.caracteristicaModel.idCaracteristica = this.caracteristica_.value;
    this.caracteristicaModel.caracteristicaArticulo = this.caracteristicaArticulo.value;

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



public async caracteristicaSeleccionado(caracteristica: CaracteristicaModel){

debugger
console.log('caracteristica: ');
console.log(caracteristica);

}


private _filter(value: string): CaracteristicaModel[] {
  const filterValue = this._normalizeValue(value);
  return this.listaCaracteristicas.filter(caracteristica => this._normalizeValue(caracteristica.caracteristica).includes(filterValue));
}

private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}
}
