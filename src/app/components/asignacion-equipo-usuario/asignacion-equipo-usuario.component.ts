import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { MatTableDataSource } from '@angular/material/table';
import { ModalAsignacionEquipoComponent } from './modal-asignacion-equipo/modal-asignacion-equipo.component';

@Component({
  selector: 'vex-asignacion-equipo-usuario',
  templateUrl: './asignacion-equipo-usuario.component.html',
  styleUrls: ['./asignacion-equipo-usuario.component.scss']
})
export class AsignacionEquipoUsuarioComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSize = 6;
  pageSizeOptions: number[] = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*4];
  pageEvent: PageEvent;
  dataSourceOriginal: any[] = [];
  dataSourceTabla:any;
  listaItems: any[] = [];
  tamanoPantalla: boolean;
  columns: TableColumn<any>[] = [
    { label: 'Modelo', property: 'Modelo', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fabricante', property: 'Fabricante', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Categoria', property: 'Categoria', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Clave', property: 'Clave', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Responsiva', property: 'Responsiva', type: 'button', visible: true },
    { label: 'Responsiva firmada', property: 'Responsiva_firmada', type: 'button', visible: true },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private swalService: SwalServices,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dataSourceOriginal = [];
    this.dataSourceOriginal = [// Datos dummy
      {
        id: 1,
        Modelo: 'HP',
        Fabricante: 'HP Pavilion',
        Categoria: 'laptop',
        Clave: 'ASDFGHJKL'
      },
      {
        id: 2,
        Modelo: 'HP 2',
        Fabricante: 'HP Pavilion 2',
        Categoria: 'laptop',
        Clave: 'ASDFGHJKL'
      }
    ];

    if (window.innerWidth >= 1280) {
      this.tamanoPantalla = true;
    } else {
      this.tamanoPantalla = false;
    }

    this.listaItems = this.dataSourceOriginal.slice(0, this.pageSize);
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

  openModal(){
    this.dialog.open(ModalAsignacionEquipoComponent,{
      //height: '80%',
      height: 'auto',
      width: '100%',
      autoFocus: true,
      data: '',
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(result => {

      this.ngOnInit();
    });
  }

  public async desasignar(){
    // let confirmacion = await this.swalService.confirmacion("Atención","¿Esta seguro de eliminar el registro?", "Eliminar","");
    // if(confirmacion){
    //   const respuesta = await this.inventariosService.deshabilitarProveedor(propietario.id);
    //   if(respuesta.exito){
    //     this.swalService.alertaPersonalizada(true, 'Exito');
    //     this.ngOnInit();
    //   } else {
    //     this.swalService.alertaPersonalizada(false, 'Error');
    //   }
    // }
  }
}
