import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { MatTableDataSource } from '@angular/material/table';

import { InventariosService } from 'src/app/servicios/inventarios.service';

import { ClienteModel } from 'src/app/modelos/Inventarios/propietario.model';
import { ConfiguracionProducto, EmpleadoInventarioArrendamientoFormModel, EmpleadoInventarioArrendamientoModel, EmpleadoLDAP, InventarioArrendamientoDisponibleModel } from 'src/app/modelos/Inventarios/inventario-arrendamiento.model';
import { FileManagerService } from 'src/app/servicios/filemanager.service';
import { ModalVisualizacionAsignacionEquipoUsuarioComponent } from './modal-visualizacion-asignacion-equipo-usuario/modal-visualizacion-asignacion-equipo-usuario.component';
import { CatUsuarioModel, ProductosInventarioDisponiblesModel, UsuarioInventarioFormModel, UsuarioInventarioModel } from 'src/app/modelos/Inventarios/usuario-inventario.model';
import { ModalContenedorImagenesAsignacionEquipoComponent } from './modal-contenedor-imagenes-asignacion-equipo/modal-contenedor-imagenes-asignacion-equipo.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';

@Component({
  selector: 'vex-asignacion-equipo-usuario',
  templateUrl: './asignacion-equipo-usuario.component.html',
  styleUrls: ['./asignacion-equipo-usuario.component.scss']
})
export class AsignacionEquipoUsuarioComponent implements OnInit {
  sesionUsuarioActual: SesionModel;
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  formInventario: FormGroup;
  pageSize = 6;
  pageSizeOptions: number[] = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*4];
  pageEvent: PageEvent;
  dataSourceOriginal: UsuarioInventarioModel[] = [];
  dataSourceTabla:any;
  listaItems: UsuarioInventarioModel[] = [];
  listaClientes:  ClienteModel[] = [];
  listaEquipo:  ProductosInventarioDisponiblesModel[] = [];
  empleadoInventarioArrendamientoFormModel: UsuarioInventarioFormModel = new UsuarioInventarioFormModel()

  listaConfiguracion: ConfiguracionProducto[] = [];
  listaEmpleados: CatUsuarioModel[] = []
  filteredEmpleados: EmpleadoLDAP[] = []; //Observable<EmpleadoLDAP[]>;

  tamanoPantalla: boolean;

  columns: TableColumn<any>[] = [
    { label: 'Usuario', property: 'nombreusuario', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Modelo', property: 'modelo', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fabricante', property: 'fabricante', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Categoria', property: 'categoria', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Clave', property: 'inventarioclv', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Responsivas', property: 'Responsivas', type: 'button', visible: true },
    //{ label: 'Responsiva firmada', property: 'responsiva', type: 'button', visible: true },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private swalService: SwalServices,
    private changeDetectorRefs: ChangeDetectorRef,
    private inventariosService: InventariosService,
    private formBuilder: FormBuilder,
    private filemanagerService: FileManagerService,
  ) {

    let sesion = localStorage.getItem(KeysStorageEnum.USER);
    this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;

    this.iniciarForm();
   }


  public iniciarForm(){
    this.formInventario = this.formBuilder.group({
     // cliente: ['', [Validators.required]],
      equipo: ['', [Validators.required]],
      empleado: ['', [Validators.required]],
      configuracionEquipo: this.formBuilder.array([])
    });

  }


  public async empleadoSeleccionado(empleado: EmpleadoLDAP) {

    console.log("EMPLEADO seleccionado: ", empleado);
    this.empleadoInventarioArrendamientoFormModel.cuenta =
      empleado.cuenta;
    this.empleadoInventarioArrendamientoFormModel.nombre =
      empleado.nombre;
      this.empleadoInventarioArrendamientoFormModel.correo =
      empleado.correo;
  }

  applyFilter(event: any) {
    let filterValue = event.target.value.toLowerCase();
    if (filterValue == "") {
      this.listaItems = this.dataSourceOriginal.slice(0,this.pageSize);
      //ACTUALIZA LA TABLA
      this.dataSourceTabla = new MatTableDataSource<any>(this.dataSourceOriginal);
      this.dataSourceTabla.paginator = this.paginator;
      this.dataSourceTabla.sort = this.sort;
    }
    else {
      //SE FILTRA POR CADA UNO DE LOS CAMPOS DE LOS REGISTROS
      this.listaItems = this.dataSourceOriginal.filter((val) =>
        val.nombreusuario.toLowerCase().includes(filterValue)||
        val.modelo.toLowerCase().includes(filterValue)||
        val.fabricante.toLowerCase().includes(filterValue)||
        val.inventarioclv.toLowerCase().includes(filterValue)||
        val.categoria.toLowerCase().includes(filterValue)
      );
      //ACTUALIZA EL CONTADOR DEL PAGINADOR DE CARDS
      //ACTUALIZA LA TABLA
      this.dataSourceTabla = new MatTableDataSource<any>(this.listaItems);
      this.dataSourceTabla.paginator = this.paginator;
      this.dataSourceTabla.sort = this.sort;
    }
  }

  //get cliente() { return this.formInventario.get('cliente') }
  get equipo() { return this.formInventario.get('equipo') }
  get empleado() { return this.formInventario.get('empleado') }
  get configuracionEquipo() { return this.formInventario.get('configuracionEquipo') as FormArray }



  anadirConfiguracion() {

    const config = this.formBuilder.group({
      idConfiguracion: new FormControl(''),
      nombreConfiguracion: new FormControl(''),
      valorConfiguracion: new FormControl('')
    });

    this.configuracionEquipo.push(config);
  }



  async ngOnInit() {

    this.listaEquipo = await this.obtenerInventarioProductoDisponible();
    this.listaClientes = await this.obtenerClientes();
    this.listaEmpleados = await this.obtenerUsuarios();

    this.dataSourceOriginal = [];
    this.dataSourceOriginal = await this.obtenerAsignacionesInventario();
    /* this.dataSourceOriginal = [// Datos dummy
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
 */



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


    //this.changeCliente(9)

    this.empleado.valueChanges.subscribe(async (x) => {
      if (x) {
          this.listaEmpleados = await this.obtenerEmpleados(
            x
          );
          this.filteredEmpleados = this.listaEmpleados;
      }
    });
  }

  public async obtenerEmpleados(nombreEmpleado: string) {
    const respuesta = await this.inventariosService.obtenerUsuarioLDAP_PM(
      nombreEmpleado
    );
    return respuesta ? respuesta.output : [];
  }


  async changeCliente(x){

    console.log(this.listaEquipo);
    this.dataSourceOriginal = await this.obtenerAsignacionesInventario();
    console.log(this.dataSourceOriginal);
    this.listaItems = this.dataSourceOriginal.slice(0, this.pageSize);
    this.dataSourceTabla = new MatTableDataSource<any>(this.dataSourceOriginal);
    this.dataSourceTabla.paginator = this.paginator;
    this.dataSourceTabla.sort = this.sort;
  }

  async changeEquipo(x){

    const seleccionado = this.listaEquipo.find((y)=> y.idinventario == x );
    this.listaConfiguracion = await this.obtenerConfiguracionProducto(seleccionado.idcategoria)

    this.configuracionEquipo.clear();

    this.listaConfiguracion.forEach((x)=>{
      const config = this.formBuilder.group({
        id: new FormControl(0),
        relUsuarioInventarioId: new FormControl(0),
        catConfiguracionProductoId: new FormControl(x.id),
        nombreConfiguracion: new FormControl(x.descripcion),
        valor: new FormControl('', [Validators.required])
      });

      this.configuracionEquipo.push(config);
    })


  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  public async obtenerConfiguracionProducto(idCategoria: number) {
    const respuesta =
      await this.inventariosService.obtenerConfiguracionProductoByCategoria(idCategoria);
    return respuesta ? respuesta.output : [];
  }


  public async obtenerUsuarios() {
    const respuesta =
      await this.inventariosService.obtenerUsuarios()
    return respuesta ? respuesta.output : [];
  }



  public async obtenerClientes() {
    const respuesta =
      await this.inventariosService.obtenerCatalogoClientes();
    return respuesta ? respuesta.output : [];
  }

  public async obtenerInventarioProductoDisponible() {
    const respuesta = await this.inventariosService.obtenerInventarioProductosDisponibles_UsuarioInventario();
    return respuesta ? respuesta : [];
  }


  public async obtenerAsignacionesInventario() {
    const respuesta =
      await this.inventariosService.obtenerAsignacionesInventario();
    return respuesta ? respuesta : [];
  }


  public async guardarAsignacion(){

    //this.asignacionInventarioFormModel.id = 0;
    this.empleadoInventarioArrendamientoFormModel.tblInventarioId = this.equipo.value;
    this.empleadoInventarioArrendamientoFormModel.catUsuarioId = 0;
    this.empleadoInventarioArrendamientoFormModel.responsiva = '';
    this.empleadoInventarioArrendamientoFormModel.configuracion = this.configuracionEquipo.value;
    this.empleadoInventarioArrendamientoFormModel.usuarioAppid = this.sesionUsuarioActual.id;
    const respuesta = await this.inventariosService.insertarAsignacionUsuarioInventario(this.empleadoInventarioArrendamientoFormModel);
    if(respuesta.exito){
      this.swalService.alertaPersonalizada(true, 'Exito');
      this.empleado.reset();
      this.equipo.reset();
      this.listaConfiguracion = [];
      this.listaEquipo = await this.obtenerInventarioProductoDisponible();
      this.dataSourceOriginal = await this.obtenerAsignacionesInventario();
      console.log(this.dataSourceOriginal);
      this.listaItems = this.dataSourceOriginal.slice(0, this.pageSize);
      this.dataSourceTabla = new MatTableDataSource<any>(this.dataSourceOriginal);
      this.dataSourceTabla.paginator = this.paginator;
      this.dataSourceTabla.sort = this.sort;
    } else {
      this.swalService.alertaPersonalizada(false, 'Error');
    }
  }

  openModalVisualizacion(asignacion: UsuarioInventarioModel){

    this.dialog.open(ModalVisualizacionAsignacionEquipoUsuarioComponent,{
      //height: '80%',
      height: 'auto',
      width: '80%',
      autoFocus: true,
      data: asignacion,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(async result => {

      //this.ngOnInit();
      this.listaEquipo = await this.obtenerInventarioProductoDisponible();
    });
  }

  openModalContenedor(asignacion: UsuarioInventarioModel){

    this.dialog.open(ModalContenedorImagenesAsignacionEquipoComponent,{
      //height: '80%',
      height: 'auto',
      //width: '80%',
      width: (window.innerWidth >= 1280) ? '80%': '100%',
      autoFocus: true,
      data: asignacion,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(async result => {

      //this.ngOnInit();
      this.listaEquipo = await this.obtenerInventarioProductoDisponible();
    });
  }



  public async desasignar(asignacion: UsuarioInventarioModel){

    let confirmacion = await this.swalService.confirmacion("Atención","¿Esta seguro de eliminar el registro?", "Eliminar","");
    if(confirmacion){
      const respuesta = await this.inventariosService.eliminarAsignacionInventario(asignacion.idrelusuarioinventario, this.sesionUsuarioActual.id);
      if(respuesta.exito){
        this.swalService.alertaPersonalizada(true, 'Exito');


        this.listaEquipo = await this.obtenerInventarioProductoDisponible();
        this.dataSourceOriginal = await this.obtenerAsignacionesInventario();
        console.log(this.dataSourceOriginal);
        this.listaItems = this.dataSourceOriginal.slice(0, this.pageSize);
        this.dataSourceTabla = new MatTableDataSource<any>(this.dataSourceOriginal);
        this.dataSourceTabla.paginator = this.paginator;
        this.dataSourceTabla.sort = this.sort;

      } else {
        this.swalService.alertaPersonalizada(false, 'Error');
      }
    }
  }


  async cargarResponsiva(event, usuarioInventarioModel: UsuarioInventarioModel) {

    if(event.target.files.length > 0)
     {
       const formData: any = new FormData();
      formData.append('file', event.target.files[0]);

      const respuesta = await this.filemanagerService.cargarArchivo(formData);

      if(respuesta.exito){
        let obj = new UsuarioInventarioFormModel();
        obj.id = usuarioInventarioModel.idrelusuarioinventario;
        obj.catUsuarioId = usuarioInventarioModel.idusuario
        obj.tblInventarioId = usuarioInventarioModel.idinventario;
        obj.responsiva = respuesta.anotacion;
        obj.usuarioAppid = this.sesionUsuarioActual.id;

         const respuestaArchivoArrendamiento = await this.inventariosService.editarAsignacionInventario(obj);

            if (respuestaArchivoArrendamiento.exito) {
              this.swalService.alertaPersonalizada(
                true,
                "Carga de archivo correcta"
              );

              this.dataSourceOriginal = await this.obtenerAsignacionesInventario();
              console.log(this.dataSourceOriginal);
              this.listaItems = this.dataSourceOriginal.slice(0, this.pageSize);
              this.dataSourceTabla = new MatTableDataSource<any>(this.dataSourceOriginal);
              this.dataSourceTabla.paginator = this.paginator;
              this.dataSourceTabla.sort = this.sort;

            }
            else {
              this.swalService.alertaPersonalizada(
                false,
                "No se pudo cargar el archivo"
              );
            }






      } else {
        this.swalService.alertaPersonalizada(false, 'No se pudo cargar el archivo');
      }
     }
   }


   async abrirDocumento(token: string){
    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    window.open(url,'_blank');
   }

   async generarCartaResponsivaDocumento(idrelusuarioinventario: number){
    let url = await this.inventariosService.obtenerUrlCartaResponsiva(idrelusuarioinventario);
    window.open(url,'_blank');
   }

/*    applyFilter(event: any) {
    let filterValue = event.target.value.toLowerCase();
    if (filterValue == "") {
      this.listaItems = this.dataSourceOriginal.slice(0,this.pageSize);

      //ACTUALIZA LA TABLA
      this.dataSourceTabla = new MatTableDataSource<any>(this.dataSourceOriginal);
      this.dataSourceTabla.paginator = this.paginator;
      this.dataSourceTabla.sort = this.sort;

    }
    else {
      //SE FILTRA POR CADA UNO DE LOS CAMPOS DE LOS REGISTROS
      this.listaItems = this.dataSourceOriginal.filter((val) =>
        val.nombreusuario.toString().toLowerCase().includes(filterValue) ||
        val.modelo.toString().toLowerCase().includes(filterValue)||
        val.fabricante.toString().toLowerCase().includes(filterValue)||
        val.categoria.toString().toLowerCase().includes(filterValue)||
        val.numerodeserie.toString().toLowerCase().includes(filterValue)
        );


      //ACTUALIZA LA TABLA
      this.dataSourceTabla = new MatTableDataSource<any>(this.listaItems);
      this.dataSourceTabla.paginator = this.paginator;
      this.dataSourceTabla.sort = this.sort;

    }

  } */



}
