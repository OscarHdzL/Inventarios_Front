import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { OficinasInteractivasModel } from 'src/app/modelos/Inventarios/propietario.model';
import { FileManagerService } from 'src/app/servicios/filemanager.service';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: 'vex-modal-plano',
  templateUrl: './modal-plano.component.html',
  styleUrls: ['./modal-plano.component.scss']
})
export class ModalPlanoComponent implements OnInit {

  formPropietario: FormGroup;
  listaColaboradores: any[] = [];
  filteredColaboradores:  Observable<any[]>;
  listaInventarios: any[] = [];
  mostrarCaracteristicas: boolean = false;
  caracteristicas: any = {};
  idInventario: number;
  get colaborador() { return this.formPropietario.get('colaborador') }
  constructor(@Inject(MAT_DIALOG_DATA) public oficina: OficinasInteractivasModel,
  private dialogRef: MatDialogRef<ModalPlanoComponent>,
  private formBuilder: FormBuilder,
  private swalService: SwalServices,
  private inventariosService: InventariosService,
  private filemanagerService: FileManagerService,) {


   }
  async ngOnInit(): Promise<void> {
    this.listaInventarios = [];
    this.listaColaboradores = [];
    this.formPropietario = this.formBuilder.group({
      colaborador: ['', [Validators.required]]
    });
    let res = await this.inventariosService.obtenerInventarioUbicacionId(this.oficina.id);
    this.listaInventarios = res;
    let resFiltro = await this.inventariosService.obtenerCatalogoInventarioUbicacionFiltro();
    this.listaColaboradores = resFiltro;
    console.log("res ", res);
    this.filteredColaboradores = this.formPropietario.controls['colaborador'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', 1)),
    );
  }
  private _filter(value: string, auto: number): string[] {
    const filterValue = value.toLowerCase();
    return this.listaColaboradores.filter(option => option.filtro.toLowerCase().includes(filterValue));

  }
  async seleccionarFiltro(event){
    this.mostrarCaracteristicas = true;
    console.log("Event -> ", event);
    let indexOf = this.listaColaboradores.find(x => x.filtro == event);
    this.idInventario = indexOf.id;
    let res = await this.inventariosService.obtenerInventarioUbicacionCaracteristicasId(this.idInventario);
    this.caracteristicas = res;
  }
  public async guardarPropietario(){
    this.mostrarCaracteristicas = false;
    this.colaborador.reset();
    let agregar = {
      id: 0,
      tblInventarioId: this.idInventario,
      relClienteUbicacionOficinaId: this.oficina.id,
      confirm: false
    }
    let res = await this.inventariosService.insertarInventarioUbicacion(agregar);
    if (res.exito) {
      this.swalService.alertaPersonalizada(true, "Inventario agregado a esta ubicacion");
      this.ngOnInit();
    }
    else{
      Swal.fire({
        title: res.mensaje,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Reubicar',
        cancelButtonText: 'Cancelar'
      }).then(async(result) => {
          if (result.isConfirmed) {
            let agregar = {
              id: 0,
              tblInventarioId: this.idInventario,
              relClienteUbicacionOficinaId: this.oficina.id,
              confirm: true
            }
            let res2 = await this.inventariosService.insertarInventarioUbicacion(agregar);
            if (res2.exito) {
              this.swalService.alertaPersonalizada(true, "Inventario reubicado");
              this.ngOnInit();
            }
          }
      });
    }
  }
  close(result: boolean) {
    this.dialogRef.close(result);
  }
  public async eliminarProducto(producto: any) {
    if (producto.id > 0) {
      let confirmacion = await this.swalService.confirmacion(
        "Atención",
        "¿Esta seguro de eliminar el registro?",
        "Eliminar",
        ""
      );

      if (confirmacion) {
        const respuesta = await this.inventariosService.deshabilitarAdquisicionDetalle(
          producto.id
        );
        if (respuesta.exito) {
          this.swalService.alertaPersonalizada(true, "Exito");
          this.ngOnInit();
        } else {
          this.swalService.alertaPersonalizada(false, "Error");
        }
      }
    } else {
      const index = this.listaInventarios.indexOf(producto);
      this.listaInventarios.splice(index, 1);
      //this.calcularMontoImpuestoArticulos();
    }
  }

}
