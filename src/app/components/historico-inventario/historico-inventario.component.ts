import { Order } from './../../../static-data/table-sales-data';
import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatPaginatorIntl, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Observable, map, startWith } from "rxjs";
import { KeysStorageEnum } from "src/app/enum/keysStorage.enum";
import {
  DocumentosProyectoModel,
  DocumentosVersionProyectoModel,
} from "src/app/modelos/DocumentosProyecto.model";
import {
  AuditoriaInventarioModel,
  AuditoriaModel,
} from "src/app/modelos/Inventarios/auditoria";
import { EstatusInventarioModel, InventarioModel } from "src/app/modelos/Inventarios/inventario.model";
import { ProductoModel } from "src/app/modelos/Inventarios/producto.model";
import { MovimientoDocumentosProyectoModel } from "src/app/modelos/MovimientoDocumentosProyecto.model";
import { Proceso, SesionModel } from "src/app/modelos/sesion.model";
import { ArchivosService } from "src/app/servicios/archivos.service";
import { FileManagerService } from "src/app/servicios/filemanager.service";
import { InventariosService } from "src/app/servicios/inventarios.service";
import { MesaValidacionService } from "src/app/servicios/mesa-validacion.service";
import { SwalServices } from "src/app/servicios/sweetalert2.services";

@Component({
  selector: "vex-historico-inventario",
  templateUrl: "./historico-inventario.component.html",
  styleUrls: ["./historico-inventario.component.scss"],
})
export class HistoricoInventarioComponent implements OnInit {
  sesionUsuarioActual: SesionModel;
  procesoRolActual: Proceso;
  public documento: DocumentosProyectoModel;
  listaInventario: InventarioModel[] = [];
  listaEstatusInventario: EstatusInventarioModel[] = [];

  formHistorico: FormGroup;
  filteredProductos: Observable<InventarioModel[]>;

  @ViewChild(MatSort) sort: MatSort;

  auditoriaInventario: AuditoriaModel = [];
  listaMovimientos: AuditoriaInventarioModel[] = [];
  ultimaVersionModel: DocumentosVersionProyectoModel;

  dataSource: any;
  pageSize = 3;
  pageSizeOptions: number[] = [this.pageSize, 5, 10, 20];
  pageEvent: PageEvent;

  constructor(
    private formBuilder: FormBuilder,
    public archivoServicio: ArchivosService,
    public matPaginatorIntl: MatPaginatorIntl,

    private swalService: SwalServices,
    private filemanagerService: FileManagerService,
    private inventariosService: InventariosService
  ) {
    let sesion = localStorage.getItem(KeysStorageEnum.USER);
    this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
    this.iniciarForm();
  }


  async ngOnInit() {
    this.listaEstatusInventario = await this.obtenerEstatusInventario();
    this.listaInventario = await this.obtenerInventarios();

    this.filteredProductos = this.producto_.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );
  }

  get producto_() {
    return this.formHistorico.get("producto");
  }

  public iniciarForm() {
    this.formHistorico = this.formBuilder.group({
      producto: ["", [Validators.required]],
    });
  }

  private _filter(value: string): InventarioModel[] {
    const filterValue = this._normalizeValue(value);
    return this.listaInventario.filter((producto) =>
      this._normalizeValue(producto.modelo).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "");
  }

  public obtenerDescripcionEstatus(idEstatus: number): string {
    return idEstatus ? this.listaEstatusInventario.find(x=>x.id == idEstatus).estatus:'';
  }

  public async obtenerInventarios() {
    const respuesta = await this.inventariosService.obtenerInventariosAsignados(
      true
    );
    return respuesta ? respuesta : [];
  }

  public async obtenerAuditoria(numeroSerie: string) {
    const respuesta = await this.inventariosService.obtenerAuditoria(
      numeroSerie
    );
    return respuesta ? respuesta.output : [];
  }

  public async obtenerEstatusInventario() {
    const respuesta = await this.inventariosService.obtenerEstatusInventario();
    return respuesta ? respuesta.output : [];
  }

  public async productoSeleccionado(producto: InventarioModel) {
    this.auditoriaInventario = [];
    this.listaMovimientos = [];
    this.auditoriaInventario = await this.obtenerAuditoria(
      producto.numerodeserie
    );

    console.log('auditoriaInventario',  this.auditoriaInventario);
  if(this.auditoriaInventario.length>0){

      this.auditoriaInventario[0].forEach((x) => {
        x.objetoParsed = JSON.parse(x.objeto);
        this.listaMovimientos.push(x);
      });

      this.auditoriaInventario[1].forEach((x) => {
        x.objetoParsed = JSON.parse(x.objeto);
        this.listaMovimientos.push(x);
      });
      console.log('Antes', this.listaMovimientos);
      this.listaMovimientos.sort((a: AuditoriaInventarioModel, b: AuditoriaInventarioModel) => {
        return this.getTime(b.inclusionHistorico) - this.getTime(a.inclusionHistorico);
      });
    console.log('Despues', this.listaMovimientos);
  }

  }

  public getTime(fecha?: string) {
    let date = new Date(fecha);
    return date != null ? date.getTime() : 0;
  }


}
