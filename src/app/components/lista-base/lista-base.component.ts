import { MesaValidacionService } from './../../servicios/mesa-validacion.service';
import { AreaModel } from 'src/app/modelos/area.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { ModalAreaComponent } from '../areas/modal-area/modal-area.component';

@Component({
  selector: 'vex-lista-base',
  templateUrl: './lista-base.component.html',
  styleUrls: ['./lista-base.component.scss']
})
export class ListaBaseComponent implements OnInit {

  pageSize = 3;
  pageSizeOptions: number[] = [this.pageSize, 6, 12, 24];
  pageEvent: PageEvent;
  datasource: AreaModel[] = [];
  listaItems: AreaModel[] = [];

  public selectedVal: string = 'cards';

  public tamanoPantalla: boolean;
  constructor(public matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private servicios: MesaValidacionService,
    private swalService: SwalServices) {


    // Assign the data to the data source for the table to render
   // this.dataSource = new MatTableDataSource(users1);

   }
   applyFilter(event: any) {
    let filterValue = event.target.value
    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
    if (filterValue == "") {
      this.listaItems = this.datasource.slice(0,this.pageSize);
    }
    else {
      this.listaItems = this.datasource.filter((val) =>
        val.descripcion.toLowerCase().includes(filterValue)
        /* val.rol.toLowerCase().includes(filterValue) ||
        val.correo.toLowerCase().includes(filterValue) ||
        val.cuenta.toLowerCase().includes(filterValue) ||
        val.cliente.toLowerCase().includes(filterValue) */
      );
    }

  }


  public onValChange(val: string) {
    this.selectedVal = val;
    console.log("Valor Selected");
    console.log(this.selectedVal);
  }

  async deshabilitarUsuario($event, item){
    console.log("Deshabilidar -> ", item);
    let res = await this.servicios.deshabilitarUsuario(item);
    if (res.exito) {
      this.swalService.alertaPersonalizada(true, "Usuario Deshabilitado");
      this.ngOnInit();
    }
    else {
      this.swalService.alertaPersonalizada(false, "Error al deshabilitar");
    }
  }
  //dataSource: MatTableDataSource<Usuarios>;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // displayedColumns = ['Empleado', 'Cuenta', 'Correo', 'Rol', 'Cliente', 'Acciones'];
  async ngOnInit(): Promise<void> {
    this.datasource = [];
    if (window.innerWidth >= 1280) {
      this.tamanoPantalla = true;
    }
    else {
      this.tamanoPantalla = false;
    }
    for (let i = 0; i < 15; i++) {
      this.datasource.push({
        id: i,
        descripcion: "Nombre " + i,
        activo: true,
        inclusion: new Date(),
        tblProcesos: null
      })
      this.listaItems = this.datasource.slice(0,this.pageSize);
    }
    // let res = await this.servicios.obtenerTodosUsuarios();
    // if (res.exito) {
    //   for (let i = 0; i < res.objeto.length; i++) {
    //     this.datasource.push({
    //       id: res.objeto[i].id,
    //       nombreUsuario: this.encriptar.Decrypt(res.objeto[i].nombre),
    //       cuenta: this.encriptar.Decrypt(res.objeto[i].cuenta),
    //       correo: this.encriptar.Decrypt(res.objeto[i].correo),
    //       rol: this.encriptar.Decrypt(res.objeto[i].catRol),
    //       cliente: this.encriptar.Decrypt(res.objeto[i].catCliente),
    //     })
    //   }
    //    this.listaItems = this.datasource.slice(0,this.pageSize);
    // }
    // this.dataSource = new MatTableDataSource(this.datasource)
    // this.listaItems = this.datasource.slice(0,this.pageSize);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.matPaginatorIntl.itemsPerPageLabel = "Usuarios por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.listaItems = this.datasource.slice(firstCut, secondCut);
  }
  openModal(id: number,bol: boolean, edit: boolean){
    let objeto = {
      id: id,
      bol: bol,
      edit: edit
    }
    if (bol) {
      this.dialog.open(ModalAreaComponent,{
        height: '80%',
        width: '100%',
        autoFocus: true,
        data: objeto,
        disableClose: true
      }).afterClosed().subscribe(result => {
        console.log(result);
        this.ngOnInit();
      });
    }
    else {
      this.dialog.open(ModalAreaComponent,{
        height: '80%',
        width: '100%',
        maxWidth: '100vw',
        autoFocus: true,
        data: objeto,
        disableClose: true
      }).afterClosed().subscribe(result => {
        console.log(result);
        this.ngOnInit();
      });
    }
  }

}
