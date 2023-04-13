import { AreaModel } from 'src/app/modelos/area.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';
import { ClienteFormModel,  ClienteModel } from 'src/app/modelos/Inventarios/propietario.model';
import { Observable, map, startWith } from 'rxjs';
import { InventariosService } from 'src/app/servicios/inventarios.service';

@Component({
  selector: 'vex-modal-cliente-catalogo',
  templateUrl: './modal-cliente-catalogo.component.html',
  styleUrls: ['./modal-cliente-catalogo.component.scss']
})
export class ModalClienteCatalogoComponent implements OnInit {

  sesionUsuarioActual: SesionModel;
  listaPropietarios: ClienteModel[] = [];
  formPropietario: FormGroup;
  propietarioModel: ClienteFormModel = new ClienteFormModel();
  filteredPropietarios: Observable<ClienteModel[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public propietario: ClienteModel,
              private dialogRef: MatDialogRef<ModalClienteCatalogoComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private inventariosService: InventariosService
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
                if(propietario != null){
                  this.propietarioModel.id = this.propietario.id;
                  this.propietarioModel.razonsocial = this.propietario.razonsocial;
                  this.propietarioModel.rfc = this.propietario.rfc;
                  this.propietarioModel.sigla = this.propietario.sigla;
                  this.propietarioModel.nombre = this.propietario.nombre;
                  this.propietarioModel.latitud = this.propietario.latitud;
                  this.propietarioModel.longitud = this.propietario.longitud;
                  this.propietarioModel.direccion = this.propietario.direccion;

                } else {
                  this.propietarioModel = new ClienteFormModel();
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


  get nombre() { return this.formPropietario.get('nombre') }
  get latitud() { return this.formPropietario.get('latitud') }
  get longitud() { return this.formPropietario.get('longitud') }
  get direccion() { return this.formPropietario.get('direccion') }
  get razonSocial() { return this.formPropietario.get('razonSocial') }
  get rfc() { return this.formPropietario.get('rfc') }
  get sigla() { return this.formPropietario.get('sigla') }


  public iniciarForm(){
    this.formPropietario = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      razonSocial: ['', [Validators.required]],
      rfc: ['', [Validators.required]],
      sigla: ['', [Validators.required]],
    });
  }


  public inicializarForm() {
    this.razonSocial.setValue(this.propietarioModel.razonsocial);
    this.rfc.setValue(this.propietarioModel.rfc);
    this.sigla.setValue(this.propietarioModel.sigla);
    this.nombre.setValue(this.propietarioModel.nombre);
    this.direccion.setValue(this.propietarioModel.direccion);
    this.latitud.setValue(this.propietarioModel.latitud);
    this.longitud.setValue(this.propietarioModel.longitud);
  }

  public async guardarPropietario(){
    //this.propietarioModel.id = 0;
    this.propietarioModel.nombre = this.nombre.value;
    this.propietarioModel.latitud = this.latitud.value;
    this.propietarioModel.longitud = this.longitud.value;
    this.propietarioModel.direccion = this.direccion.value;
    this.propietarioModel.razonsocial = this.razonSocial.value;
    this.propietarioModel.rfc = this.rfc.value;
    this.propietarioModel.sigla = this.sigla.value;

    const respuesta = this.propietarioModel.id > 0 ? await this.inventariosService.actualizarCliente(this.propietarioModel) : await this.inventariosService.insertarCliente(this.propietarioModel);

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
