import { AreaModel } from 'src/app/modelos/area.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';
import { FabricanteFormModel,  FabricanteModel } from 'src/app/modelos/Inventarios/propietario.model';
import { Observable, map, startWith } from 'rxjs';
import { InventariosService } from 'src/app/servicios/inventarios.service';

@Component({
  selector: 'vex-modal-fabricante',
  templateUrl: './modal-fabricante.component.html',
  styleUrls: ['./modal-fabricante.component.scss']
})
export class ModalFabricanteComponent implements OnInit {

  sesionUsuarioActual: SesionModel;
  listaPropietarios: FabricanteModel[] = [];
  formPropietario: FormGroup;
  propietarioModel: FabricanteFormModel = new FabricanteFormModel();

  constructor(@Inject(MAT_DIALOG_DATA) public propietario: FabricanteModel,
              private dialogRef: MatDialogRef<ModalFabricanteComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private inventariosService: InventariosService
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
                if(propietario != null){
                  this.propietarioModel.id = this.propietario.id;
                  this.propietarioModel.nombre = this.propietario.nombre;
                } else {
                  this.propietarioModel = new FabricanteFormModel();
                }
                this.iniciarForm();
               }

  async ngOnInit() {
    this.inicializarForm();
  }
  get nombre() { return this.formPropietario.get('nombre') }
  public iniciarForm(){
    this.formPropietario = this.formBuilder.group({
      nombre: ['', [Validators.required]]
    });
  }
  public inicializarForm() {
    this.nombre.setValue(this.propietarioModel.nombre);
  }
  public async guardarPropietario(){
    //this.propietarioModel.id = 0;
    this.propietarioModel.nombre = this.nombre.value;
    const respuesta = this.propietarioModel.id > 0 ? await this.inventariosService.actualizarFabricante(this.propietarioModel) : await this.inventariosService.insertarFabricante(this.propietarioModel);
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
