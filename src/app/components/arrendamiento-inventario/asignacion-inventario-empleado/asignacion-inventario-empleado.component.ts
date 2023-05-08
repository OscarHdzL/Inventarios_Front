import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { SwalServices } from "src/app/servicios/sweetalert2.services";
import { MatTableDataSource } from "@angular/material/table";

import { InventariosService } from "src/app/servicios/inventarios.service";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ClienteModel } from "src/app/modelos/Inventarios/propietario.model";
import {
  ConfiguracionProducto,
  EmpleadoInventarioArrendamientoFormModel,
  EmpleadoInventarioArrendamientoModel,
  EmpleadoLDAP,
  InventarioArrendamientoDisponibleModel,
} from "src/app/modelos/Inventarios/inventario-arrendamiento.model";
import { FileManagerService } from "src/app/servicios/filemanager.service";
import { ModalVisualizacionAsignacionInventarioEmpleadoComponent } from "./modal-visualizacion-asignacion-inventario-empleado/modal-visualizacion-asignacion-inventario-empleado.component";
import { Observable, map, startWith } from "rxjs";

@Component({
  selector: "vex-asignacion-inventario-empleado",
  templateUrl: "./asignacion-inventario-empleado.component.html",
  styleUrls: ["./asignacion-inventario-empleado.component.scss"],
})
export class AsignacionInventarioEmpleadoComponent implements OnInit {
  @ViewChild("paginator", { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  formInventario: FormGroup;
  pageSize = 6;
  pageSizeOptions: number[] = [
    this.pageSize,
    this.pageSize * 2,
    this.pageSize * 3,
    this.pageSize * 4,
  ];
  pageEvent: PageEvent;
  dataSourceOriginal: EmpleadoInventarioArrendamientoModel[] = [];
  dataSourceTabla: any;
  listaItems: EmpleadoInventarioArrendamientoModel[] = [];
  listaClientes: ClienteModel[] = [];
  listaEquipo: InventarioArrendamientoDisponibleModel[] = [];
  empleadoInventarioArrendamientoFormModel: EmpleadoInventarioArrendamientoFormModel =
    new EmpleadoInventarioArrendamientoFormModel();
  filteredEmpleados: EmpleadoLDAP[] = []; //Observable<EmpleadoLDAP[]>;
  listaConfiguracion: ConfiguracionProducto[] = [];
  listaEmpleados: EmpleadoLDAP[] = [];

  /* [
    {
      id: 1,
      empleado: 'Mariana Perez Perez',
      cuenta: 'mperez'
    },
    {
      id: 2,
      empleado: 'Elisa Juarez juarez',
      cuenta: 'eJuarez'
    },
    {
      id: 3,
      empleado: 'Karina Moreno ',
      cuenta: 'kmoreno'
    }
  ]; */

  tamanoPantalla: boolean;

  columns: TableColumn<any>[] = [
    {
      label: "Empleado",
      property: "nombreEmpleadoCliente",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Modelo",
      property: "modelo",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Fabricante",
      property: "fabricante",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Categoria",
      property: "categoria",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Clave",
      property: "inventarioclv",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Responsiva",
      property: "Responsiva",
      type: "button",
      visible: true,
    },
    {
      label: "Responsiva firmada",
      property: "responsiva",
      type: "button",
      visible: true,
    },
    { label: "Acciones", property: "actions", type: "button", visible: true },
  ];

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private swalService: SwalServices,
    private changeDetectorRefs: ChangeDetectorRef,
    private inventariosService: InventariosService,
    private formBuilder: FormBuilder,
    private filemanagerService: FileManagerService
  ) {
    this.iniciarForm();
  }

  public iniciarForm() {
    this.formInventario = this.formBuilder.group({
      cliente: ["", [Validators.required]],
      equipo: ["", [Validators.required]],
      empleado: ["", [Validators.required]],
      configuracionEquipo: this.formBuilder.array([]),
    });

    /*     this.formInventario.get('cliente').valueChanges.subscribe(async (x)=>{
      debugger
      this.listaEquipo = await this.obtenerInventarioProductoDisponible(x);
      this.dataSourceOriginal = await this.obtenerAsignacionesInventarioProductoDisponible(x);
    }); */
  }

  get cliente() {
    return this.formInventario.get("cliente");
  }
  get equipo() {
    return this.formInventario.get("equipo");
  }
  get empleado() {
    return this.formInventario.get("empleado");
  }
  get configuracionEquipo() {
    return this.formInventario.get("configuracionEquipo") as FormArray;
  }

  anadirConfiguracion() {
    const config = this.formBuilder.group({
      idConfiguracion: new FormControl(""),
      nombreConfiguracion: new FormControl(""),
      valorConfiguracion: new FormControl(""),
    });

    this.configuracionEquipo.push(config);
  }

  public async empleadoSeleccionado(empleado: EmpleadoLDAP) {
    debugger;
    console.log("EMPLEADO seleccionado: ", empleado);
    this.empleadoInventarioArrendamientoFormModel.cuentaEmpleadoCliente =
      empleado.cuenta;
    this.empleadoInventarioArrendamientoFormModel.nombreEmpleadoCliente =
      empleado.nombre;
    /*
    console.log(producto);
    this.productoModel.catProductoId = producto.idproducto;
    this.productoModel.modelo = producto.modelo;
    this.categoriaSelect = producto.categoria; */
  }

  async ngOnInit() {
    this.listaClientes = await this.obtenerClientes();

    this.dataSourceOriginal = [];
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
    this.matPaginatorIntl.previousPageLabel = "Anterior página";
    this.matPaginatorIntl.nextPageLabel = "Siguiente página";

    //this.changeCliente(9)

    /*     this.filteredEmpleados = this.empleado.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    ); */

    this.empleado.valueChanges.subscribe(async (x) => {
      if (x) {
        if (this.cliente.value) {
          this.listaEmpleados = await this.obtenerEmpleados(
            this.cliente.value,
            x
          );
          this.filteredEmpleados = this.listaEmpleados;
        } else {
          this.swalService.alertaPersonalizada(false, "Seleccione un cliente.");
        }
      }
    });
  }

  private _filter(value: string): EmpleadoLDAP[] {
    const filterValue = this._normalizeValue(value);
    return this.listaEmpleados.filter((producto) =>
      this._normalizeValue(producto.nombre).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "");
  }

  async changeCliente(x) {
    this.empleado.reset();
    this.listaEmpleados = [];
    this.filteredEmpleados = [];
    this.listaEquipo = await this.obtenerInventarioProductoDisponible(x);
    console.log(this.listaEquipo);
    this.dataSourceOriginal =
      await this.obtenerAsignacionesInventarioProductoDisponible(x);
    console.log(this.dataSourceOriginal);
    this.listaItems = this.dataSourceOriginal.slice(0, this.pageSize);
    this.dataSourceTabla = new MatTableDataSource<any>(this.dataSourceOriginal);
    this.dataSourceTabla.paginator = this.paginator;
    this.dataSourceTabla.sort = this.sort;
  }

  async changeEquipo(x) {
    debugger;
    const seleccionado = this.listaEquipo.find(
      (y) => y.idinventarioarrendamiento == x
    );
    this.listaConfiguracion = await this.obtenerConfiguracionProducto(
      seleccionado.idcategoria
    );

    this.listaConfiguracion.forEach((x) => {
      const config = this.formBuilder.group({
        catConfiguracionProductoId: new FormControl(x.id),
        nombreConfiguracion: new FormControl(x.descripcion),
        valor: new FormControl("", [Validators.required]),
      });

      this.configuracionEquipo.push(config);
    });
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  public async obtenerEmpleados(idCliente: number, nombreEmpleado: string) {
    const respuesta = await this.inventariosService.obtenerUsuarioLDAP(
      idCliente,
      nombreEmpleado
    );
    return respuesta ? respuesta.output : [];
  }

  public async obtenerConfiguracionProducto(idCategoria: number) {
    const respuesta =
      await this.inventariosService.obtenerConfiguracionProductoByCategoria(
        idCategoria
      );
    return respuesta ? respuesta.output : [];
  }

  public async obtenerClientes() {
    const respuesta = await this.inventariosService.obtenerCatalogoClientes();
    return respuesta ? respuesta.output : [];
  }

  public async obtenerInventarioProductoDisponible(idCliente) {
    const respuesta =
      await this.inventariosService.obtenerInventarioArrendamientoDisponibleCliente(
        idCliente
      );
    return respuesta ? respuesta : [];
  }

  public async obtenerAsignacionesInventarioProductoDisponible(idCliente) {
    const respuesta =
      await this.inventariosService.obtenerAsignacionesInventarioArrendamiento(
        idCliente
      );
    return respuesta ? respuesta : [];
  }

  public async guardarAsignacion() {
    debugger;
    //this.asignacionInventarioFormModel.id = 0;
    this.empleadoInventarioArrendamientoFormModel.tblInventarioArrendamientoId =
      this.equipo.value;
    //this.empleadoInventarioArrendamientoFormModel.cuentaEmpleadoCliente = this.empleado.value;
    //this.empleadoInventarioArrendamientoFormModel.nombreEmpleadoCliente = this.listaEmpleados.find((x)=>x.cuenta == this.empleado.value).nombre;
    this.empleadoInventarioArrendamientoFormModel.responsiva = null;
    this.empleadoInventarioArrendamientoFormModel.configuracion =
      this.configuracionEquipo.value;
    const respuesta =
      await this.inventariosService.insertarAsignacionInventarioArrendamiento(
        this.empleadoInventarioArrendamientoFormModel
      );
    if (respuesta.exito) {
      this.swalService.alertaPersonalizada(true, "Exito");
      this.empleado.reset();
      this.equipo.reset();
      this.listaConfiguracion = [];
      this.listaEquipo = await this.obtenerInventarioProductoDisponible(
        this.cliente.value
      );
      this.dataSourceOriginal =
        await this.obtenerAsignacionesInventarioProductoDisponible(
          this.cliente.value
        );
      console.log(this.dataSourceOriginal);
      this.listaItems = this.dataSourceOriginal.slice(0, this.pageSize);
      this.dataSourceTabla = new MatTableDataSource<any>(
        this.dataSourceOriginal
      );
      this.dataSourceTabla.paginator = this.paginator;
      this.dataSourceTabla.sort = this.sort;
    } else {
      this.swalService.alertaPersonalizada(false, "Error");
    }
  }

  openModalVisualizacion(asignacion: EmpleadoInventarioArrendamientoModel) {
    this.dialog
      .open(ModalVisualizacionAsignacionInventarioEmpleadoComponent, {
        //height: '80%',
        height: "auto",
        width: "80%",
        autoFocus: true,
        data: asignacion,
        disableClose: true,
        maxWidth: window.innerWidth >= 1280 ? "80vw" : "100vw",
      })
      .afterClosed()
      .subscribe(async (result) => {
        //this.ngOnInit();
        this.listaEquipo = await this.obtenerInventarioProductoDisponible(
          this.cliente.value
        );
      });
  }

  public async desasignar(asignacion: EmpleadoInventarioArrendamientoModel) {
    debugger;
    let confirmacion = await this.swalService.confirmacion(
      "Atención",
      "¿Esta seguro de eliminar el registro?",
      "Eliminar",
      ""
    );
    if (confirmacion) {
      const respuesta =
        await this.inventariosService.eliminarAsignacionInventarioArrendamiento(
          asignacion.idrelempleadoinventarioarrendamiento
        );
      if (respuesta.exito) {
        this.swalService.alertaPersonalizada(true, "Exito");

        this.listaEquipo = await this.obtenerInventarioProductoDisponible(
          this.cliente.value
        );
        this.dataSourceOriginal =
          await this.obtenerAsignacionesInventarioProductoDisponible(
            this.cliente.value
          );
        console.log(this.dataSourceOriginal);
        this.listaItems = this.dataSourceOriginal.slice(0, this.pageSize);
        this.dataSourceTabla = new MatTableDataSource<any>(
          this.dataSourceOriginal
        );
        this.dataSourceTabla.paginator = this.paginator;
        this.dataSourceTabla.sort = this.sort;
      } else {
        this.swalService.alertaPersonalizada(false, "Error");
      }
    }
  }

  async cargarResponsiva(
    event,
    empleadoInventarioArrendamientoModel: EmpleadoInventarioArrendamientoModel
  ) {
    debugger;
    if (event.target.files.length > 0) {
      const formData: any = new FormData();
      formData.append("file", event.target.files[0]);

      const respuesta = await this.filemanagerService.cargarArchivo(formData);

      if (respuesta.exito) {
        let obj = new EmpleadoInventarioArrendamientoFormModel();
        obj.id =
          empleadoInventarioArrendamientoModel.idrelempleadoinventarioarrendamiento;
        obj.cuentaEmpleadoCliente =
          empleadoInventarioArrendamientoModel.cuentaEmpleadoCliente;
        obj.nombreEmpleadoCliente =
          empleadoInventarioArrendamientoModel.nombreEmpleadoCliente;
        obj.tblInventarioArrendamientoId =
          empleadoInventarioArrendamientoModel.idinventarioarrendamiento;
        obj.responsiva = respuesta.anotacion;

        const respuestaArchivoArrendamiento =
          await this.inventariosService.editarAsignacionInventarioArrendamiento(
            obj
          );

        if (respuestaArchivoArrendamiento.exito) {
          this.swalService.alertaPersonalizada(
            true,
            "Carga de archivo correcta"
          );

          this.dataSourceOriginal =
            await this.obtenerAsignacionesInventarioProductoDisponible(
              this.cliente.value
            );
          console.log(this.dataSourceOriginal);
          this.listaItems = this.dataSourceOriginal.slice(0, this.pageSize);
          this.dataSourceTabla = new MatTableDataSource<any>(
            this.dataSourceOriginal
          );
          this.dataSourceTabla.paginator = this.paginator;
          this.dataSourceTabla.sort = this.sort;
        } else {
          this.swalService.alertaPersonalizada(
            false,
            "No se pudo cargar el archivo"
          );
        }
      } else {
        this.swalService.alertaPersonalizada(
          false,
          "No se pudo cargar el archivo"
        );
      }
    }
  }

  async abrirDocumento(token: string) {
    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    window.open(url, "_blank");
  }
}
