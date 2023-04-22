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
import { PropietarioModel } from 'src/app/modelos/Inventarios/propietario.model';
import { ModalProveedorComponent } from './modal-proveedor/modal-proveedor.component';

@Component({
  selector: 'vex-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.scss']
})
export class ListaProveedorComponent implements OnInit {

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
    { label: 'Razon Social', property: 'razonsocial', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'RFC', property: 'rfc', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Correo', property: 'correo', type: 'text', visible: true, cssClasses: ['font-medium'] },
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
        val.razonsocial.toLowerCase().includes(filterValue) ||
        val.rfc.toLowerCase().includes(filterValue)||
        val.correo.toLowerCase().includes(filterValue)
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
      this.swalService.alertaPersonalizada(true, "Propietario Deshabilitado");
      this.ngOnInit();
    }
    else {
      this.swalService.alertaPersonalizada(false, "Error al deshabilitar");
    }
  }
  async ngOnInit(): Promise<void> {
    this.dataSourceOriginal = [];
    this.dataSourceOriginal = await this.obtenerPropietarios();
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
  public async obtenerPropietarios(){
    const respuesta = await this.inventariosService.obtenerCatalogoProveedores();
    return respuesta.exito ? respuesta.output : [];
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.listaItems = this.dataSourceOriginal.slice(firstCut, secondCut);
  }
  openModal(usuario: PropietarioModel){
    this.dialog.open(ModalProveedorComponent,{
      height: '80%',
      width: '100%',
      autoFocus: true,
      data: usuario,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    });
  }
  public async EliminarPropietario(propietario){
    let confirmacion = await this.swalService.confirmacion("Atención","¿Esta seguro de eliminar el registro?", "Eliminar","");
    if(confirmacion){
      const respuesta = await this.inventariosService.deshabilitarProveedor(propietario.id);
      if(respuesta.exito){
        this.swalService.alertaPersonalizada(true, 'Exito');
        this.ngOnInit();
      } else {
        this.swalService.alertaPersonalizada(false, 'Error');
      }
    }
  }

}
