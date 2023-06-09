
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
import { InventariosService } from 'src/app/servicios/inventarios.service';

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
              private inventariosService: InventariosService
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
                if(propietario != null){
                  this.propietarioModel.id = this.propietario.id;
                  this.propietarioModel.razonSocial = this.propietario.razonsocial;
                  this.propietarioModel.rfc = this.propietario.rfc;
                  this.propietarioModel.sigla = this.propietario.sigla;

                } else {
                  this.propietarioModel = new PropietarioFormModel();
                }

                //this.propietarioModel = this.propietario;


                this.iniciarForm();
               }

  async ngOnInit() {
    //this.listaPropietarios = await this.obtenerAreas();
    // this.listaPropietarios = [{
    //   id: 1,
    //   razonSocial: 'Lector de huella'
    // },
    // {
    //   id: 2,
    //   razonSocial: 'VGA'
    // },
    // {
    //   id: 3,
    //   razonSocial: 'HDMI'
    // },
    // {
    //   id: 4,
    //   razonSocial: 'Disco duro'
    // }];


    this.inicializarForm();
  }


  // public async obtenerAreas(){
  //   const respuesta = await this.inventariosService.obtenerCatalogoAreas();
  //   return respuesta.exito ? respuesta.respuesta : [];
  // }


  get razonSocial() { return this.formPropietario.get('razonSocial') }
  get rfc() { return this.formPropietario.get('rfc') }
  get sigla() { return this.formPropietario.get('sigla') }


  public iniciarForm(){
    this.formPropietario = this.formBuilder.group({
      razonSocial: ['', [Validators.required]],
      rfc: ['', [Validators.required]],
      sigla: ['', [Validators.required]],
    });
  }


  public inicializarForm() {
    this.razonSocial.setValue(this.propietarioModel.razonSocial);
    this.rfc.setValue(this.propietarioModel.rfc);
    this.sigla.setValue(this.propietarioModel.sigla);
  }

  public async guardarPropietario(){
    //this.propietarioModel.id = 0;
    this.propietarioModel.razonSocial = this.razonSocial.value;
    this.propietarioModel.rfc = this.rfc.value;
    this.propietarioModel.sigla = this.sigla.value;

    const respuesta = this.propietarioModel.id > 0 ? await this.inventariosService.actualizarPropietario(this.propietarioModel) : await this.inventariosService.insertarPropietario(this.propietarioModel);

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

}
