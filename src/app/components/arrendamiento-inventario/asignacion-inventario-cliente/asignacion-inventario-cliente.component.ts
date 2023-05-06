
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';

import { InventariosService } from 'src/app/servicios/inventarios.service';
import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { ModalCategoriaProductoComponent } from '../../lista-categoria-producto/modal-categoria-producto/modal-categoria-producto.component';
import { ModalAsignacionEquipoComponent } from '../../asignacion-equipo-usuario/modal-asignacion-equipo/modal-asignacion-equipo.component';
import { ModalAsignacionInventarioClienteComponent } from './modal-asignacion-inventario-cliente/modal-asignacion-inventario-cliente.component';


@Component({
  selector: 'vex-asignacion-inventario-cliente',
  templateUrl: './asignacion-inventario-cliente.component.html',
  styleUrls: ['./asignacion-inventario-cliente.component.scss']
})
export class AsignacionInventarioClienteComponent implements OnInit {

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild('paginatorCards', { static: true }) paginatorCards!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize = 6;
  pageSizeOptions: number[] = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*4];
  pageEvent: PageEvent;
  dataSourceOriginal: any[] = [];
  dataSourceTabla:any;
  listaItems: any[] = [];

  public selectedVal: string = 'cards';

  public tamanoPantalla: boolean;


  columns: TableColumn<any>[] = [
    { label: 'cliente', property: 'cliente', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Modelo', property: 'modelo', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Cantidad', property: 'cantidad', type: 'text', visible: true, cssClasses: ['font-medium'] },
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
    let filterValue = event.target.value.toLowerCase();
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
        val.cliente.toLowerCase().includes(filterValue)||
        val.modelo.toLowerCase().includes(filterValue)||
        val.cantidad.toLowerCase().includes(filterValue)
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

  async ngOnInit(): Promise<void> {
    this.dataSourceOriginal = [];
    this.dataSourceOriginal = await this.obtenerInventarioArrendamientoAgrupado();
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
  public async obtenerInventarioArrendamientoAgrupado(){
    const respuesta = await this.inventariosService.obtenerInventarioArrendamientoAgrupado();
    return respuesta ? respuesta : [];
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.listaItems = this.dataSourceOriginal.slice(firstCut, secondCut);
  }
  openModal(usuario: any){
    this.dialog.open(ModalAsignacionInventarioClienteComponent,{
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
