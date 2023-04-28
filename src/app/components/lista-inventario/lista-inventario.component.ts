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

import { InventarioModel } from 'src/app/modelos/Inventarios/inventario.model';
import { ModalInventarioComponent } from './modal-inventario/modal-inventario.component';
import { ModalAsignarInventarioComponent } from './modal-asignar-inventario/modal-asignar-inventario.component';
import {Event, RouterEvent, Router} from '@angular/router';
import { filter } from 'rxjs';
import { ModalLoadImageComponent } from './modal-load-image/modal-load-image.component';


@Component({
  selector: 'vex-lista-inventario',
  templateUrl: './lista-inventario.component.html',
  styleUrls: ['./lista-inventario.component.scss']
})
export class ListaInventarioComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild('paginatorCards', { static: true }) paginatorCards!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize = 6;
  pageSizeOptions: number[] = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*4];
  pageEvent: PageEvent;
  dataSourceOriginal: InventarioModel[] = [];
  dataSourceTabla:any;
  listaItems: InventarioModel[] = [];
  listaMarca: any[] = [{id: 1, descripcion: 'Marca 1'}];
  listaModelo: any[] = [{id: 1, descripcion: 'Modelo 1'}];
  listaPropietario: any[] = [{id: 1, descripcion: 'Propietario 1'}];



  public selectedVal: string = 'cards';

  public tamanoPantalla: boolean;
  public productosAsignar: boolean;
  formFiltros: FormGroup;


  columns: TableColumn<any>[] = [
    { label: 'Modelo', property: 'modelo', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fabricante', property: 'fabricante', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Categoria', property: 'categoria', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Nuevo', property: 'nuevo', type: 'text', visible: true, cssClasses: ['font-medium'] },
//    { label: 'Año', property: 'anio', type: 'text', visible: true, cssClasses: ['font-medium'] },
//    { label: 'Estatus', property: 'catEstatusinventario', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Numero serie', property: 'numerodeserie', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Clave', property: 'inventarioclv', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(public matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private servicios: MesaValidacionService,
    private swalService: SwalServices,
    private changeDetectorRefs: ChangeDetectorRef,
    private inventariosService: InventariosService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {

      this.iniciarForm()

   }

  async ngOnInit(){
    //console.log("Param URL -> ", this.rutaActiva.snapshot.params.producto);
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
      ).subscribe((e: RouterEvent) => {
        console.log("URL -> ",e.url.split('/')[3]);

      if (e.url.split('/')[3] == "asignar") {
        this.productosAsignar = true;
      }
      else {
        this.productosAsignar = false;
      };

    });

    this.dataSourceOriginal = await this.obtenerInventarios();

      if (window.innerWidth >= 1280) {
        this.tamanoPantalla = true;
      }
      else {
        this.tamanoPantalla = false;
      }

      this.listaItems = this.dataSourceOriginal.slice(0,this.pageSize);
      //this.paginatorCards.length = this.listaItems.length;


    this.dataSourceTabla = new MatTableDataSource<any>(this.dataSourceOriginal);
    this.dataSourceTabla.paginator = this.paginator;
    this.dataSourceTabla.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Registros por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
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
        val.modelo.toLowerCase().includes(filterValue) ||
        val.fabricante.toLowerCase().includes(filterValue) ||
        val.categoria.toLowerCase().includes(filterValue) ||
        val.numerodeserie.toLowerCase().includes(filterValue) ||
        val.inventarioclv.toLowerCase().includes(filterValue)

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
/*     this.formFiltros = this.formBuilder.group({
      marca: [''],
      modelo: [''],
      propietario: ['']

    }); */
  }

  get marca() { return this.formFiltros.get('marca')};
  get modelo() { return this.formFiltros.get('modelo')};
  get propietario() { return this.formFiltros.get('propietario')};

  public onValChange(val: string) {
    this.selectedVal = val;
    console.log("Valor Selected");
    console.log(this.selectedVal);
  }

  async deshabilitarInventario(item){
    console.log("Deshabilidar -> ", item);
    let res = {exito: true} //await this.servicios.deshabilitarInventario(item);
    if (res.exito) {
      this.swalService.alertaPersonalizada(true, "Inventario Deshabilitado");
      this.ngOnInit();
    }
    else {
      this.swalService.alertaPersonalizada(false, "Error al deshabilitar");
    }
  }

  public async obtenerInventarios(){
    const respuesta = await this.inventariosService.obtenerInventarios();
    return respuesta ? respuesta : [];
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.listaItems = this.dataSourceOriginal.slice(firstCut, secondCut);
  }

  openModal(usuario: InventarioModel){

    this.dialog.open(ModalInventarioComponent,{
      height: 'auto',
      width: '100%',
      autoFocus: true,
      data: usuario,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    });

  }

  openModalAsignacion(usuario: InventarioModel){
    this.dialog.open(ModalAsignarInventarioComponent,{
      height: 'auto',
      width: '100%',
      autoFocus: true,
      data: usuario,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    });
  }
  openModalLoadImage(usuario: InventarioModel){
    this.dialog.open(ModalLoadImageComponent,{
      height: 'auto',
      width: '100%',
      autoFocus: true,
      data: usuario,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    });
  }


  public async EliminarInventario(inventario){

    let confirmacion = await this.swalService.confirmacion("Atención","¿Esta seguro de eliminar el registro?", "Eliminar","");

    if(confirmacion){
      inventario.activo = false;
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
