
import { AreaModel } from 'src/app/modelos/area.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';
import { CategoriaProductoFormModel,  CategoriaProductoModel, ClienteModel } from 'src/app/modelos/Inventarios/propietario.model';
import { Observable, map, startWith } from 'rxjs';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { InventarioArrendamientoAgrupadoModel, InventarioArrendamientoDisponibleModel, InventarioArrendamientoFormModel, InventarioProductosDisponibleModel } from 'src/app/modelos/Inventarios/inventario-arrendamiento.model';


@Component({
  selector: 'vex-modal-asignacion-inventario-cliente',
  templateUrl: './modal-asignacion-inventario-cliente.component.html',
  styleUrls: ['./modal-asignacion-inventario-cliente.component.scss']
})
export class ModalAsignacionInventarioClienteComponent implements OnInit {

  sesionUsuarioActual: SesionModel;
  listaPropietarios: CategoriaProductoModel[] = [];

  listaClientes: ClienteModel[] = [];
  listaInventarioProductoDisponible: InventarioProductosDisponibleModel[] = [];

  formPropietario: FormGroup;
  asignacionInventarioFormModel: InventarioArrendamientoFormModel = new InventarioArrendamientoFormModel();

  constructor(@Inject(MAT_DIALOG_DATA) public asignacionInventario: InventarioArrendamientoAgrupadoModel,
              private dialogRef: MatDialogRef<ModalAsignacionInventarioClienteComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private inventariosService: InventariosService
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;

                this.asignacionInventarioFormModel = new InventarioArrendamientoFormModel();

                /* if(propietario != null){
                  this.asignacionInventarioFormModel.id = this.propietario.id;
                  this.asignacionInventarioFormModel.catClienteId = this.propietario.nombre;
                  this.asignacionInventarioFormModel.catProductoId = this.propietario.estatico;
                  this.asignacionInventarioFormModel.cantidad = this.propietario.estatico;
                } else {
                  this.asignacionInventarioFormModel = new InventarioArrendamientoFormModel();
                } */
                this.iniciarForm();
               }

  async ngOnInit() {
    this.listaClientes = await this.obtenerClientes();
    this.listaInventarioProductoDisponible = await this.obtenerInventarioProductoDisponible();
    this.inicializarForm();
  }

  get cliente() { return this.formPropietario.get('cliente') }
  get modelo() { return this.formPropietario.get('modelo') }
  get cantidad() { return this.formPropietario.get('cantidad') }



  public iniciarForm(){
    this.formPropietario = this.formBuilder.group({
      cliente: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      cantidad: ['', [Validators.required]]
    });
  }
  public inicializarForm() {
    this.cliente.setValue(this.asignacionInventarioFormModel.catClienteId);
    this.modelo.setValue(this.asignacionInventarioFormModel.catProductoId);
    this.cantidad.setValue(this.asignacionInventarioFormModel.cantidad);

    /* this.cliente.valueChanges.subscribe(async (x)=>{

      this.listaInventarioProductoDisponible = await this.obtenerInventarioProductoDisponible();
      if(this.listaInventarioProductoDisponible.length == 0){
        this.swalService.alertaPersonalizada(false, 'No se encontro inventario disponible');
      }
    }); */

  }
  public async guardarPropietario(){

    //this.asignacionInventarioFormModel.id = 0;
    this.asignacionInventarioFormModel.catClienteId = this.cliente.value;
    this.asignacionInventarioFormModel.catProductoId = this.modelo.value;
    this.asignacionInventarioFormModel.cantidad = this.cantidad.value;
    const respuesta = await this.inventariosService.insertarInventarioArrendamiento(this.asignacionInventarioFormModel);
    if(respuesta.exito){
      this.swalService.alertaPersonalizada(true, 'Exito');
      this.close(true);
    } else {
      this.swalService.alertaPersonalizada(false, 'Error');
    }
  }


  public async obtenerClientes() {
    const respuesta =
      await this.inventariosService.obtenerCatalogoClientes();
    return respuesta ? respuesta.output : [];
  }

  public async obtenerInventarioProductoDisponible() {
    const respuesta =
      await this.inventariosService.obtenerInventarioProductosDisponibles();
    return respuesta ? respuesta : [];
  }



  close(result: boolean) {
    this.dialogRef.close(result);
  }

}
