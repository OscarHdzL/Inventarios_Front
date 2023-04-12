import { MesaValidacionService } from './../../servicios/mesa-validacion.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';

import { InventariosService } from 'src/app/servicios/inventarios.service';


import { MatAccordion } from '@angular/material/expansion';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { ProductoModel } from 'src/app/modelos/Inventarios/producto.model';


@Component({
  selector: 'vex-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild('paginatorCards', { static: true }) paginatorCards!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize = 3;
  pageSizeOptions: number[] = [this.pageSize, 6, 12, 24];
  pageEvent: PageEvent;
  dataSourceOriginal: ProductoModel[] = [];
  dataSourceTabla:any;
  listaItems: ProductoModel[] = [];
  listaMarca: any[] = [{id: 1, descripcion: 'Marca 1'}];
  listaModelo: any[] = [{id: 1, descripcion: 'Modelo 1'}];
  listaPropietario: any[] = [{id: 1, descripcion: 'Propietario 1'}];



  public selectedVal: string = 'cards';

  public tamanoPantalla: boolean;
  formFiltros: FormGroup;


  columns: TableColumn<any>[] = [
    { label: 'Modelo', property: 'modelo', type: 'text', visible: true, cssClasses: ['font-medium'] },
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
    private formBuilder: FormBuilder,
    ) {
      this.iniciarForm()
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
        val.modelo.toLowerCase().includes(filterValue) ||
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

  public iniciarForm(){
    this.formFiltros = this.formBuilder.group({
      marca: [''],
      modelo: [''],
      propietario: ['']

    });
  }

  get marca() { return this.formFiltros.get('marca')};
  get modelo() { return this.formFiltros.get('modelo')};
  get propietario() { return this.formFiltros.get('propietario')};

  public onValChange(val: string) {
    this.selectedVal = val;
    console.log("Valor Selected");
    console.log(this.selectedVal);
  }

  async deshabilitarProducto(item){
    console.log("Deshabilidar -> ", item);
    let res = {exito: true} //await this.servicios.deshabilitarProducto(item);
    if (res.exito) {
      this.swalService.alertaPersonalizada(true, "Producto Deshabilitado");
      this.ngOnInit();
    }
    else {
      this.swalService.alertaPersonalizada(false, "Error al deshabilitar");
    }
  }

  async ngOnInit(): Promise<void> {

    this.dataSourceOriginal = [];

    //this.dataSourceOriginal = await this.obtenerProductos();

    this.dataSourceOriginal = [
      {
        id: 1,
        modelo: 'HP 15-EF2024NR',
        fabricante: 'HP',
        proveedor: 'Amazon '
      },
      {
        id: 4,
        modelo: 'X515JA-EJ2558W',
        fabricante: 'ASUS',
        proveedor: 'Amazon'
      },
      {
        id: 6,
        modelo: 'Ideapad 5-14ARE05',
        fabricante: 'Lenovo',
        proveedor: 'Amazon'
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


    this.matPaginatorIntl.itemsPerPageLabel = "Productos por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }



  public async obtenerProductos(){
    const respuesta = await this.inventariosService.obtenerCatalogoProductos();
    return respuesta.exito ? respuesta.respuesta : [];
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.listaItems = this.dataSourceOriginal.slice(firstCut, secondCut);
  }

  openModal(usuario: ProductoModel){

    this.dialog.open(ModalProductoComponent,{
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

 /*  openModalGraficas(producto){

    this.dialog.open(ModalGraficasProductoComponent,{
      height: '80%',
      width: '100%',
      autoFocus: true,
      data: producto,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    });

  } */


  public async EliminarProducto(producto){

    let confirmacion = await this.swalService.confirmacion("Atención","¿Esta seguro de eliminar el registro?", "Eliminar","");

    if(confirmacion){
      producto.activo = false;
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
