import { MesaValidacionService } from './../../../servicios/mesa-validacion.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { ArticuloFormModel, ArticuloModel } from 'src/app/modelos/Inventarios/articulo.model';

@Component({
  selector: 'vex-modal-articulo',
  templateUrl: './modal-articulo.component.html',
  styleUrls: ['./modal-articulo.component.scss']
})
export class ModalArticuloComponent implements OnInit {

  formArticulo: FormGroup;
  articuloModel: ArticuloFormModel = new ArticuloFormModel();
  listaCategoria: any[] = [];
  listaFabricante: any[] = [];
  listaProveedor: any[] = [];
  listaPropietario: any[] = [];
  panelOpenState = false;

  constructor(@Inject(MAT_DIALOG_DATA) public articulo: ArticuloModel,
              private dialogRef: MatDialogRef<ModalArticuloComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private mesaValidacionService: MesaValidacionService
              ) {

                if(articulo != null){
                  this.articuloModel.id = this.articulo.id;
                  this.articuloModel.modelo = this.articulo.modelo;
                  this.articuloModel.fabricante = this.articulo.fabricante;
                } else {
                  this.articuloModel = new ArticuloFormModel();
                }


                this.iniciarForm();
               }

  async ngOnInit() {
    this.inicializarForm();
  }

  get modelo() { return this.formArticulo.get('modelo')};
  get anio() { return this.formArticulo.get('anio')};
  get categoria() { return this.formArticulo.get('categoria')};
  get fabricante() { return this.formArticulo.get('fabricante')};
  get proveedor() { return this.formArticulo.get('proveedor')};
  get propietario() { return this.formArticulo.get('propietario')};
  get cantidad() { return this.formArticulo.get('cantidad')};
  get valorUnitario() { return this.formArticulo.get('valorUnitario')};
  get vidaUtil() { return this.formArticulo.get('vidaUtil')};
  get observaciones() { return this.formArticulo.get('observaciones')};

  public iniciarForm(){
    this.formArticulo = this.formBuilder.group({
      modelo: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      fabricante: ['', [Validators.required]],
      proveedor: ['', [Validators.required]],
      propietario: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      valorUnitario: ['', [Validators.required]],
      vidaUtil: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],

    });
  }

  public inicializarForm() {
    this.modelo.setValue(this.articuloModel.modelo);
    this.fabricante.setValue(this.articuloModel.fabricante);
    this.anio.setValue(this.articuloModel.anio)
    this.categoria.setValue(this.articuloModel.categoria)
    this.fabricante.setValue(this.articuloModel.fabricante)
    this.proveedor.setValue(this.articuloModel.proveedor)
    this.propietario.setValue(this.articuloModel.propietario)
    this.cantidad.setValue(this.articuloModel.cantidad)
    this.valorUnitario.setValue(this.articuloModel.valorUnitario)
    this.vidaUtil.setValue(this.articuloModel.vidaUtil)
    this.observaciones.setValue(this.articuloModel.observaciones)
  }

  public async guardarArticulo(){
   
    this.articuloModel.modelo = this.modelo.value;
    this.articuloModel.fabricante = this.fabricante.value;
    this.articuloModel.anio = this.anio.value;
    this.articuloModel.categoria = this.categoria.value;
    this.articuloModel.fabricante = this.fabricante.value;
    this.articuloModel.proveedor = this.proveedor.value;
    this.articuloModel.cantidad = this.cantidad.value;
    this.articuloModel.valorUnitario = this.valorUnitario.value;
    this.articuloModel.vidaUtil = this.vidaUtil.value;
    this.articuloModel.observaciones = this.observaciones.value;

    const respuesta =  {
      exito: true
    }
    //this.articuloModel.id > 0 ? await this.mesaValidacionService.actualizarArticulo(this.articuloModel) : await this.mesaValidacionService.insertarArticulo(this.articuloModel);

    
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
