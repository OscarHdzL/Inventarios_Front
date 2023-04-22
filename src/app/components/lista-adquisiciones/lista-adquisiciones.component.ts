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

import { AdquisicionModel } from 'src/app/modelos/Inventarios/adquisicion.model';
import { ModalAdquisicionComponent } from './modal-adquisicion/modal-adquisicion.component';


@Component({
  selector: 'vex-lista-adquisiciones',
  templateUrl: './lista-adquisiciones.component.html',
  styleUrls: ['./lista-adquisiciones.component.scss']
})
export class ListaAdquisicionesComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild('paginatorCards', { static: true }) paginatorCards!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize = 3;
  pageSizeOptions: number[] = [this.pageSize, 6, 12, 24];
  pageEvent: PageEvent;
  dataSourceOriginal: AdquisicionModel[] = [];
  dataSourceTabla:any;
  listaItems: AdquisicionModel[] = [];
  listaMarca: any[] = [{id: 1, descripcion: 'Marca 1'}];
  listaModelo: any[] = [{id: 1, descripcion: 'Modelo 1'}];
  listaPropietario: any[] = [{id: 1, descripcion: 'Propietario 1'}];



  public selectedVal: string = 'cards';

  public tamanoPantalla: boolean;
  formFiltros: FormGroup;


  columns: TableColumn<any>[] = [
    { label: 'Proveedor', property: 'proveedor', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Propietario', property: 'propietario', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Monto', property: 'monto', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Impuesto', property: 'impuesto', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Articulos', property: 'articulos', type: 'text', visible: true, cssClasses: ['font-medium'] },
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
        val.monto.toString().toLowerCase().includes(filterValue) ||
        val.impuesto.toString().toLowerCase().includes(filterValue)||
        val.articulos.toString().toLowerCase().includes(filterValue)
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

  async deshabilitarAdquisicion(item){
    console.log("Deshabilidar -> ", item);
    let res = {exito: true} //await this.servicios.deshabilitarAdquisicion(item);
    if (res.exito) {
      this.swalService.alertaPersonalizada(true, "Adquisicion Deshabilitado");
      this.ngOnInit();
    }
    else {
      this.swalService.alertaPersonalizada(false, "Error al deshabilitar");
    }
  }

  async ngOnInit(): Promise<void> {

    this.dataSourceOriginal = [];

    this.dataSourceOriginal = await this.obtenerAdquisicions();

    /* this.dataSourceOriginal = [
      {
        iD: 1,
        mONTO: 1343.12,
        aRTICULOS: 4312,
        iMPUESTO: 43.43
      },
      {
        iD: 2,
        mONTO: 1343.12,
        aRTICULOS: 4312,
        iMPUESTO: 43.43
      },
      {
        iD: 3,
        mONTO: 1343.12,
        aRTICULOS: 4312,
        iMPUESTO: 43.43
      }]; */


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



  public async obtenerAdquisicions(){
    const respuesta = await this.inventariosService.obtenerCatalogoAdquisiciones();
    return respuesta.exito ? respuesta.output : [];
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.listaItems = this.dataSourceOriginal.slice(firstCut, secondCut);
  }

  openModal(usuario: AdquisicionModel){

    this.dialog.open(ModalAdquisicionComponent,{
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

 /*  openModalGraficas(adquisicion){

    this.dialog.open(ModalGraficasAdquisicionComponent,{
      height: '80%',
      width: '100%',
      autoFocus: true,
      data: adquisicion,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    });

  } */


  public async EliminarAdquisicion(adquisicion){

    let confirmacion = await this.swalService.confirmacion("Atención","¿Esta seguro de eliminar el registro?", "Eliminar","");

    if(confirmacion){
      adquisicion.activo = false;
      const respuesta = await this.inventariosService.deshabilitarAdquisicion(adquisicion.id);
      if(respuesta.exito){
        this.swalService.alertaPersonalizada(true, 'Exito');
        this.ngOnInit();
      } else {
        this.swalService.alertaPersonalizada(false, 'Error');
      }
    }
  }

}
