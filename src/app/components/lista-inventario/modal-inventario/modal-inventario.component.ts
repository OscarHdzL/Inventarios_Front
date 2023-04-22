
import { MesaValidacionService } from './../../../servicios/mesa-validacion.service';
import { Component, Inject, OnInit, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import {  AccesorioInventario, EstatusInventarioModel, InventarioFormModel, InventarioModel } from 'src/app/modelos/Inventarios/inventario.model';
import { MatAccordion } from '@angular/material/expansion';

import { MatFormFieldAppearance } from '@angular/material/form-field';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { FabricanteModel } from 'src/app/modelos/Inventarios/propietario.model';
import { id } from 'date-fns/locale';


@Component({
  selector: 'vex-modal-inventario',
  templateUrl: './modal-inventario.component.html',
  styleUrls: ['./modal-inventario.component.scss']
})
export class ModalInventarioComponent implements OnInit {

  app: MatFormFieldAppearance
  abierto = true;
  formInventario: FormGroup;
  formAccesorio: FormGroup;

  inventarioModel: InventarioFormModel = new InventarioFormModel();
  listaAccesorios: AccesorioInventario[] = [];
  listaEstatusInventario: EstatusInventarioModel[] = [];
  listaPropietario: any[] = [];
  panelOpenState = false;
  @ViewChild('accordion',{static:true}) Accordion: MatAccordion

  constructor(@Inject(MAT_DIALOG_DATA) public inventario: InventarioModel,
              private dialogRef: MatDialogRef<ModalInventarioComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private dialog: MatDialog,
              private inventariosService: InventariosService,
              ) {


                if(inventario != null){
                  this.llenarFormModel(inventario);


                } else {
                  this.inventarioModel = new InventarioFormModel();
                }


                this.iniciarForm();
               }

  async ngOnInit() {

/*     const InventarioModel = this.inventario ? await this.obtenerInventario() : new InventarioFormModel();
    console.log('InventarioModel: ', InventarioModel);
    this.llenarFormModel(InventarioModel); */

    this.listaEstatusInventario = await this.obtenerEstatusInventario();
    this.inicializarForm();
  }

  get numerodeserie() { return this.formInventario.get('numerodeserie')};
  get inventarioclv() { return this.formInventario.get('inventarioclv')};
  get notas() { return this.formInventario.get('notas')};
  get estatus() { return this.formInventario.get('estatus')};
  get accesorio() { return this.formAccesorio.get('accesorio')};


  public iniciarForm(){
    this.formInventario = this.formBuilder.group({
      numerodeserie: ['', [Validators.required]],
      inventarioclv: ['', [Validators.required]],
      notas: [''],
      estatus: ['', [Validators.required]],
    });

    this.formAccesorio = this.formBuilder.group({
      accesorio: ['', [Validators.required]],
    });
  }


  public inicializarForm() {

    this.numerodeserie.setValue(this.inventarioModel.numerodeserie);
    this.inventarioclv.setValue(this.inventarioModel.inventarioclv);
    this.notas.setValue(this.inventarioModel.notas);
    this.estatus.setValue(this.inventarioModel.catEstatusinventarioId);

 /*    this.inventarioModel.accesorios.forEach((x)=>{
      this.listaAccesorios.push(x);
    }); */
  }


  public async obtenerEstatusInventario() {
    const respuesta = await this.inventariosService.obtenerEstatusInventario();
    return respuesta.exito ? respuesta.output : [];
  }


  public async obtenerInventario() {
    const respuesta = await this.inventariosService.obtenerInventarioId(
      this.inventario.idinventario
    );
    return respuesta ? respuesta[0] : new InventarioModel();
  }


  public async obtenerInventarioAccesorios() {
    const respuesta = await this.inventariosService.obtenerInventarioAccesorios(
      this.inventario.idinventario
    );
    return respuesta ? respuesta : [];
  }





  public async llenarFormModel(inventario){

    this.inventarioModel.id = inventario.idinventario;
    this.inventarioModel.tblAdquisicionId = inventario.idadquisicion;
    this.inventarioModel.catProductoId = inventario.idproducto;
    this.inventarioModel.catEstatusinventarioId = inventario.catEstatusinventarioId;
    this.inventarioModel.numerodeserie = inventario.numerodeserie;
    this.inventarioModel.inventarioclv = inventario.inventarioclv;
    this.inventarioModel.notas= inventario.notainventario;

    //const lista = inventario.accesorios ? inventario.accesorios.split('|'): [];
    this.listaAccesorios = await this.obtenerInventarioAccesorios();

/*
    lista.forEach((x=> {

      let accesorio = new AccesorioInventario();
      accesorio.nombre = x;
      this.listaAccesorios.push(accesorio);
    })); */

  }


  public async agregarAccesorio(){

    if(this.accesorio.value){
      let lista = [];

      let accesorio = new AccesorioInventario();
      accesorio.nombre = this.accesorio.value;
      accesorio.tblInventarioId = this.inventarioModel.id;
      lista.push(accesorio);

      const respuesta = await this.inventariosService.insertarAccesorioInventario(lista);
      if(respuesta.exito){
        //this.swalService.alertaPersonalizada(true, 'Exito');
        //this.ngOnInit();
        accesorio.id = respuesta.id;
        this.accesorio.reset()
        this.listaAccesorios.push(accesorio);
      } else {
        this.swalService.alertaPersonalizada(false, 'Error');
      }
    }
  }

  public async guardarInventario(){

    let lista = [];
    this.inventarioModel.catEstatusinventarioId = this.estatus.value;
    this.inventarioModel.numerodeserie = this.numerodeserie.value;
    this.inventarioModel.inventarioclv = this.inventarioclv.value;
    this.inventarioModel.notas = this.notas.value;
    this.inventarioModel.accesorios = [];
  /*   this.listaAccesorios.forEach((x)=>{
      this.inventarioModel.accesorios.push(x);
    }); */

    lista.push(this.inventarioModel);

    const respuesta = await this.inventariosService.actualizarInventario(lista);

    if(respuesta.exito){
      this.swalService.alertaPersonalizada(true, 'Exito');
      this.close(true);
    } else {
      this.swalService.alertaPersonalizada(false, 'Error');
    }

  }

  public async eliminarAccesorio(Accesorio: AccesorioInventario ){


    if (this.inventarioModel.id > 0) {
      let confirmacion = await this.swalService.confirmacion(
        "Atención",
        "¿Esta seguro de eliminar el registro?",
        "Eliminar",
        ""
      );
      if (confirmacion) {
        const respuesta = await this.inventariosService.deshabilitarAccesorioInventario(Accesorio.id);
      if (respuesta.exito) {
        //this.swalService.alertaPersonalizada(true, 'Exito');
        //this.ngOnInit();
        const index = this.listaAccesorios.indexOf(Accesorio);
        const x = this.listaAccesorios.splice(index, 1);
      } else {
        this.swalService.alertaPersonalizada(false, "Error");
      }
    }
    } else {
      const index = this.listaAccesorios.indexOf(Accesorio);
      const x = this.listaAccesorios.splice(index, 1);
    }



/*

    const respuesta = await this.inventariosService.deshabilitarAccesorioInventario(Accesorio.id);
    if(respuesta.exito){
      //this.swalService.alertaPersonalizada(true, 'Exito');
      //this.ngOnInit();
      const index = this.listaAccesorios.indexOf(Accesorio);
    const x =  this.listaAccesorios.splice(index, 1);
    } else {
      this.swalService.alertaPersonalizada(false, 'Error');
    } */


  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }



}
