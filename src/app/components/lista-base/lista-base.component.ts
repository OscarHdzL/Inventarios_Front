import { MesaValidacionService } from './../../servicios/mesa-validacion.service';
import { AreaModel } from 'src/app/modelos/area.model';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { ModalAreaComponent } from '../areas/modal-area/modal-area.component';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { UsuarioModel } from '../../modelos/usuario.model';
import { ModalBaseComponent } from './modal-base/modal-base.component';

@Component({
  selector: 'vex-lista-base',
  templateUrl: './lista-base.component.html',
  styleUrls: ['./lista-base.component.scss']
})
export class ListaBaseComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild('paginatorCards', { static: true }) paginatorCards!: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  pageSize = 3;
  pageSizeOptions: number[] = [this.pageSize, 6, 12, 24];
  pageEvent: PageEvent;
  dataSourceOriginal: UsuarioModel[] = [];
  dataSourceTabla:any;
  listaItems: UsuarioModel[] = [];

  public selectedVal: string = 'cards';

  public tamanoPantalla: boolean;


  columns: TableColumn<any>[] = [
    { label: 'Descripcion', property: 'descripcion', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Correo', property: 'correo', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(public matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private servicios: MesaValidacionService,
    private swalService: SwalServices,
    private changeDetectorRefs: ChangeDetectorRef,
    private mesaValidacionService: MesaValidacionService,
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
        val.nombre.toLowerCase().includes(filterValue) ||
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

  async deshabilitarUsuario(item){
    console.log("Deshabilidar -> ", item);
    let res = {exito: true} //await this.servicios.deshabilitarUsuario(item);
    if (res.exito) {
      this.swalService.alertaPersonalizada(true, "Usuario Deshabilitado");
      this.ngOnInit();
    }
    else {
      this.swalService.alertaPersonalizada(false, "Error al deshabilitar");
    }
  }

  async ngOnInit(): Promise<void> {

    this.dataSourceOriginal = [];

    this.dataSourceOriginal = await this.obtenerUsuarios();


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


    this.matPaginatorIntl.itemsPerPageLabel = "Usuarios por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }



  public async obtenerUsuarios(){
    const respuesta = await this.mesaValidacionService.obtenerCatalogoUsuarios();
    return respuesta.exito ? respuesta.respuesta : [];
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.listaItems = this.dataSourceOriginal.slice(firstCut, secondCut);
  }

  openModal(usuario: UsuarioModel){

    this.dialog.open(ModalBaseComponent,{
      height: '45%',
      width: '100%',
      autoFocus: true,
      data: usuario,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
      //maxWidth: '90%'
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    });

  }

}
