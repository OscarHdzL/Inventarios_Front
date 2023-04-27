import { MesaValidacionService } from './../../servicios/mesa-validacion.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';

import { InventariosService } from 'src/app/servicios/inventarios.service';


import { ModalPropietarioComponent } from '../lista-propietarios/modal-propietario/modal-propietario.component';
import { ModalCategoriaProductoComponent } from './modal-categoria-producto/modal-categoria-producto.component';

@Component({
  selector: 'vex-lista-categoria-producto',
  templateUrl: './lista-categoria-producto.component.html',
  styleUrls: ['./lista-categoria-producto.component.scss']
})
export class ListaCategoriaProductoComponent implements OnInit {

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild('paginatorCards', { static: true }) paginatorCards!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize = 3;
  pageSizeOptions: number[] = [this.pageSize, 6, 12, 24];
  pageEvent: PageEvent;
  dataSourceOriginal: any[] = [];
  dataSourceTabla:any;
  listaItems: any[] = [];

  public selectedVal: string = 'cards';

  public tamanoPantalla: boolean;


  columns: TableColumn<any>[] = [
    { label: 'Nombre', property: 'nombre', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Estatico', property: 'estatico', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(public matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private servicios: MesaValidacionService,
    private swalService: SwalServices,
    private changeDetectorRefs: ChangeDetectorRef,
    private inventariosService: InventariosService,
    ) {

   }
   get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

   applyFilter(event: any) {
    let filterValue = event.target.value
    if (filterValue == "") {
      this.listaItems = this.dataSourceOriginal.slice(0,this.pageSize);
      //ACTUALIZA EL CONTADOR DEL PAGINADOR DE CARDS
      this.paginatorCards.length = this.dataSourceOriginal.length;
      //ACTUALIZA LA TABLA
      this.dataSourceTabla = new MatTableDataSource<any>(this.dataSourceOriginal);
      this.dataSourceTabla.paginator = this.paginator;
      this.dataSourceTabla.sort = this.sort;
    }
    else {
      //SE FILTRA POR CADA UNO DE LOS CAMPOS DE LOS REGISTROS
      this.listaItems = this.dataSourceOriginal.filter((val) =>
        val.nombre.toLowerCase().includes(filterValue)
      );
      //ACTUALIZA EL CONTADOR DEL PAGINADOR DE CARDS
      this.paginatorCards.length = this.listaItems.length;
      //ACTUALIZA LA TABLA
      this.dataSourceTabla = new MatTableDataSource<any>(this.listaItems);
      this.dataSourceTabla.paginator = this.paginator;
      this.dataSourceTabla.sort = this.sort;
    }
  }
  public onValChange(val: string) {
    this.selectedVal = val;
    console.log("Valor Selected");
    console.log(this.selectedVal);
  }
  async deshabilitarPropietario(item){
    console.log("Deshabilidar -> ", item);
    let res = {exito: true} //await this.servicios.deshabilitarPropietario(item);
    if (res.exito) {
      this.swalService.alertaPersonalizada(true, "CategoriaProducto Deshabilitado");
      this.ngOnInit();
    }
    else {
      this.swalService.alertaPersonalizada(false, "Error al deshabilitar");
    }
  }
  async ngOnInit(): Promise<void> {
    this.dataSourceOriginal = [];
    this.dataSourceOriginal = await this.obtenerFabricantes();
    if (window.innerWidth >= 1280) {
      this.tamanoPantalla = true;
    }
    else {
      this.tamanoPantalla = false;
    }
    this.listaItems = this.dataSourceOriginal.slice(0,this.pageSize);
    this.paginatorCards.length = this.listaItems.length;
    this.dataSourceTabla = new MatTableDataSource<any>(this.dataSourceOriginal);
    this.dataSourceTabla.paginator = this.paginator;
    this.dataSourceTabla.sort = this.sort;
    this.matPaginatorIntl.itemsPerPageLabel = "Registros por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }
  public async obtenerFabricantes(){
    const respuesta = await this.inventariosService.obtenerCatalogoCategoriaProducto();
    return respuesta.exito ? respuesta.output : [];
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.listaItems = this.dataSourceOriginal.slice(firstCut, secondCut);
  }
  openModal(usuario: any){
    this.dialog.open(ModalCategoriaProductoComponent,{
      height: 'auto',
      width: '80%',
      autoFocus: true,
      data: usuario,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    });
  }
  public async EliminarFabricante(propietario){
    let confirmacion = await this.swalService.confirmacion("Atención","¿Esta seguro de eliminar el registro?", "Eliminar","");
    if(confirmacion){
      const respuesta = await this.inventariosService.deshabilitarCategoriaProducto(propietario.id);
      if(respuesta.exito){
        this.swalService.alertaPersonalizada(true, 'Exito');
        this.ngOnInit();
      } else {
        this.swalService.alertaPersonalizada(false, 'Error');
      }
    }
  }

}
