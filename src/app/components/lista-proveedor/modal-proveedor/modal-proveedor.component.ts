
import { AreaModel } from 'src/app/modelos/area.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';
import { ProveedorFormModel,  ProveedorModel } from 'src/app/modelos/Inventarios/propietario.model';
import { Observable, map, startWith } from 'rxjs';
import { InventariosService } from 'src/app/servicios/inventarios.service';

@Component({
  selector: 'vex-modal-proveedor',
  templateUrl: './modal-proveedor.component.html',
  styleUrls: ['./modal-proveedor.component.scss']
})
export class ModalProveedorComponent implements OnInit {

  sesionUsuarioActual: SesionModel;
  listaPropietarios: ProveedorModel[] = [];
  formPropietario: FormGroup;
  propietarioModel: ProveedorFormModel = new ProveedorFormModel();
  filteredPropietarios: Observable<ProveedorModel[]>;
  listaSubs: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public propietario: ProveedorModel,
              private dialogRef: MatDialogRef<ModalProveedorComponent>,
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
                  this.propietarioModel.correo = this.propietario.correo;
                  this.listaSubs = this.propietario.contacto

                } else {
                  this.propietarioModel = new ProveedorFormModel();
                }

                //this.propietarioModel = this.propietario;


                this.iniciarForm();
               }

  async ngOnInit() {
    if(this.propietario != null){
      this.listaSubs = this.propietario.contacto
    }
    else{
      this.listaSubs = []
    }
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
  get correo() { return this.formPropietario.get('correo') }
  get correoCon() { return this.formPropietario.get('correoCon') }
  get nombreCon() { return this.formPropietario.get('nombreCon') }
  get telefonoCon() { return this.formPropietario.get('telefonoCon') }


  public iniciarForm(){
    this.formPropietario = this.formBuilder.group({
      razonSocial: ['', [Validators.required]],
      rfc: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      correoCon: ['',],
      nombreCon: ['',],
      telefonoCon: ['',],

    });
  }
  async eliminarSubordinado(item: string){
    this.listaSubs.splice(this.listaSubs.findIndex(x => x.id == item),1)
  }
  agregarContacto(){
    console.log("Contacto -> ");
    this.listaSubs.push({
      id: 0,
      nombre: this.nombreCon.value,
      correo: this.correoCon.value,
      telefono: this.telefonoCon.value
    })
    this.formPropietario.controls['correoCon'].reset()
    this.formPropietario.controls['nombreCon'].reset()
    this.formPropietario.controls['telefonoCon'].reset()
  }


  public inicializarForm() {
    this.razonSocial.setValue(this.propietarioModel.razonSocial);
    this.rfc.setValue(this.propietarioModel.rfc);
    this.correo.setValue(this.propietarioModel.correo);
  }

  public async guardarPropietario(){
    //this.propietarioModel.id = 0;
    this.propietarioModel.razonSocial = this.razonSocial.value;
    this.propietarioModel.rfc = this.rfc.value;
    this.propietarioModel.correo = this.correo.value;
    this.propietarioModel.contacto = this.listaSubs

    const respuesta = this.propietarioModel.id > 0 ? await this.inventariosService.actualizarProveedor(this.propietarioModel) : await this.inventariosService.insertarProveedor(this.propietarioModel);

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
