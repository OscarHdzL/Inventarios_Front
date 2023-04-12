
import { AreaModel } from 'src/app/modelos/area.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';
import { PropietarioFormModel,  PropietarioModel } from 'src/app/modelos/Inventarios/propietario.model';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'vex-modal-propietario',
  templateUrl: './modal-propietario.component.html',
  styleUrls: ['./modal-propietario.component.scss']
})
export class ModalPropietarioComponent implements OnInit {

  sesionUsuarioActual: SesionModel;
  listaPropietarios: PropietarioModel[] = [];
  formPropietario: FormGroup;
  propietarioModel: PropietarioFormModel = new PropietarioFormModel();
  filteredPropietarios: Observable<PropietarioModel[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public propietario: PropietarioModel,
              private dialogRef: MatDialogRef<ModalPropietarioComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private mesaValidacionService: MesaValidacionService
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
                if(propietario != null){
                  this.propietarioModel.id = this.propietario.id;
                  this.propietarioModel.razonSocial = this.propietario.razonSocial;
                  this.propietarioModel.rfc = this.propietario.rfc;
                  this.propietarioModel.direccion = this.propietario.direccion;

                } else {
                  this.propietarioModel = new PropietarioFormModel();
                }

                //this.propietarioModel = this.propietario;


                this.iniciarForm();
               }

  async ngOnInit() {
    //this.listaPropietarios = await this.obtenerAreas();
    this.listaPropietarios = [{
      id: 1,
      razonSocial: 'Lector de huella'
    },
    {
      id: 2,
      razonSocial: 'VGA'
    },
    {
      id: 3,
      razonSocial: 'HDMI'
    },
    {
      id: 4,
      razonSocial: 'Disco duro'
    }];


    this.inicializarForm();

    this.filteredPropietarios = this.razonSocial.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  public async obtenerAreas(){
    const respuesta = await this.mesaValidacionService.obtenerCatalogoAreas();
    return respuesta.exito ? respuesta.respuesta : [];
  }


  get razonSocial() { return this.formPropietario.get('razonSocial') }
  get rfc() { return this.formPropietario.get('rfc') }
  get direccion() { return this.formPropietario.get('direccion') }


  public iniciarForm(){
    this.formPropietario = this.formBuilder.group({
      razonSocial: ['', [Validators.required]],
      rfc: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }


  public inicializarForm() {
    this.razonSocial.setValue(this.propietarioModel.razonSocial);
    this.rfc.setValue(this.propietarioModel.rfc);
    this.direccion.setValue(this.propietarioModel.direccion);
  }

  public async guardarPropietario(){
    //this.propietarioModel.id = 0;
    this.propietarioModel.razonSocial = this.razonSocial.value;
    this.propietarioModel.rfc = this.propietario.rfc;
    this.propietarioModel.direccion = this.propietario.direccion;

    const respuesta = {exito: true} //this.propietarioModel.id > 0 ? await this.mesaValidacionService.actualizarPropietario(this.propietarioModel) : await this.mesaValidacionService.insertarPropietario(this.propietarioModel);

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



public async propietarioSeleccionado(propietario: PropietarioModel){

debugger
console.log('propietario: ');
console.log(propietario);

}


private _filter(value: string): PropietarioModel[] {
  const filterValue = this._normalizeValue(value);
  return this.listaPropietarios.filter(propietario => this._normalizeValue(propietario.razonSocial).includes(filterValue));
}

private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}

}
