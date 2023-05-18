
import { AreaModel } from 'src/app/modelos/area.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';

import { Observable, map, startWith } from 'rxjs';
import { ProductoModel } from 'src/app/modelos/Inventarios/producto.model';

import { ModalProductoComponent } from '../../lista-productos/modal-producto/modal-producto.component';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { RelAdquisicionDetalle } from 'src/app/modelos/Inventarios/adquisicion.model';
import { InventarioModel } from 'src/app/modelos/Inventarios/inventario.model';
import { HistoricoInventarioModel } from 'src/app/modelos/Inventarios/historico-inventario';

@Component({
  selector: 'vex-modal-historico-inventario',
  templateUrl: './modal-historico-inventario.component.html',
  styleUrls: ['./modal-historico-inventario.component.scss']
})
export class ModalHistoricoInventarioComponent implements OnInit {
  sesionUsuarioActual: SesionModel;

  listaHistorial: HistoricoInventarioModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public producto: InventarioModel,
              private dialogRef: MatDialogRef<ModalHistoricoInventarioComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private inventariosService: InventariosService,
              private dialog: MatDialog,
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;

               }

  async ngOnInit() {
    //this.listaProductos = await this.obtenerAreas();
    this.listaHistorial = await this.obtenerHistorialInventario();


  }

  public async obtenerHistorialInventario(){
    const respuesta = await this.inventariosService.obtenerHistoricoInventario(this.producto.numerodeserie);
    return respuesta ? respuesta.output : [];
  }


  close(result: any) {
    this.dialogRef.close(result);
  }




}
