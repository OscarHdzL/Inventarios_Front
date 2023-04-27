import { MesaValidacionService } from './../../servicios/mesa-validacion.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { SoftwareModel } from 'src/app/modelos/Inventarios/software.model';
import { ModalSoftwareComponent } from '../lista-software/modal-software/modal-software.component';



@Component({
  selector: 'vex-lista-software',
  templateUrl: './lista-software.component.html',
  styleUrls: ['./lista-software.component.scss']
})
export class ListaSoftwareComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild('paginatorCards', { static: true }) paginatorCards!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize = 3;
  pageSizeOptions: number[] = [this.pageSize, 6, 12, 24];
  pageEvent: PageEvent;
  dataSourceOriginal: SoftwareModel[] = [];
  dataSourceTabla:any;
  listaItems: SoftwareModel[] = [];

  public selectedVal: string = 'cards';

  public tamanoPantalla: boolean;


  columns: TableColumn<any>[] = [
    { label: 'Nombre', property: 'nombre', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fabricante', property: 'fabricante', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Proveedor', property: 'proveedor', type: 'text', visible: true, cssClasses: ['font-medium'] },
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
        val.nombre.toLowerCase().includes(filterValue) ||
        val.fabricante.toLowerCase().includes(filterValue)||
        val.proveedor.toLowerCase().includes(filterValue)
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

  async deshabilitarSoftware(item){
    console.log("Deshabilidar -> ", item);
    let res = {exito: true} //await this.servicios.deshabilitarSoftware(item);
    if (res.exito) {
      this.swalService.alertaPersonalizada(true, "Software Deshabilitado");
      this.ngOnInit();
    }
    else {
      this.swalService.alertaPersonalizada(false, "Error al deshabilitar");
    }
  }

  async ngOnInit(): Promise<void> {

    this.dataSourceOriginal = [];

    //this.dataSourceOriginal = await this.obtenerSoftwares();

    this.dataSourceOriginal = [
      {
        id: 1,
        nombre: 'Windows',
        fabricante: 'Microsoft',
        proveedor: 'Angop '
      },
      {
        id: 4,
        nombre: 'Microsoft 365',
        fabricante: 'Microsoft',
        proveedor: 'Angop'
      },
      {
        id: 6,
        nombre: 'Photoshop',
        fabricante: 'Adobe',
        proveedor: 'Angop'
      }];


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


    this.matPaginatorIntl.itemsPerPageLabel = "Softwares por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }



  public async obtenerSoftwares(){
    const respuesta = await this.inventariosService.obtenerCatalogoSoftware();
    return respuesta.exito ? respuesta.respuesta : [];
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.listaItems = this.dataSourceOriginal.slice(firstCut, secondCut);
  }

  openModal(usuario: SoftwareModel){

    this.dialog.open(ModalSoftwareComponent,{
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


  public async EliminarSoftware(software){

    let confirmacion = await this.swalService.confirmacion("Atención","¿Esta seguro de eliminar el registro?", "Eliminar","");

    if(confirmacion){
      software.activo = false;
      const respuesta = {exito: true}//await this.mesaValidacionService.deshabilitarCliente(cliente.id);
      if(respuesta.exito){
        this.swalService.alertaPersonalizada(true, 'Exito');
        this.ngOnInit();
      } else {
        this.swalService.alertaPersonalizada(false, 'Error');
      }
    }
  }
}
