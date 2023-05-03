import { CategoriaProductoModel } from "./../../../modelos/Inventarios/propietario.model";
import { MesaValidacionService } from "./../../../servicios/mesa-validacion.service";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";

import { SwalServices } from "src/app/servicios/sweetalert2.services";
import {
  CaracteristicaProductoFormModel_,
  CaracteristicaProductoModel,
  ProductoFormModel,
  ProductoModel,
} from "src/app/modelos/Inventarios/producto.model";
import { MatAccordion } from "@angular/material/expansion";

import { ModalCaracteristicaProductoComponent } from "../modal-caracteristica-producto/modal-caracteristica-producto.component";
import { MatFormFieldAppearance } from "@angular/material/form-field";
import { InventariosService } from "src/app/servicios/inventarios.service";
import { FabricanteModel } from "src/app/modelos/Inventarios/propietario.model";

@Component({
  selector: "vex-modal-producto",
  templateUrl: "./modal-producto.component.html",
  styleUrls: ["./modal-producto.component.scss"],
})
export class ModalProductoComponent implements OnInit {
  app: MatFormFieldAppearance;
  abierto = true;
  formProducto: FormGroup;
  formCaracteristica: FormGroup;
  productoModel: ProductoFormModel = new ProductoFormModel();
  listaCategoria: CategoriaProductoModel[] = [];
  listaFabricante: FabricanteModel[] = [];
  listaCaracteristicas: CaracteristicaProductoFormModel_[] = [];

  listaPropietario: any[] = [];
  panelOpenState = false;
  @ViewChild("accordion", { static: true }) Accordion: MatAccordion;

  constructor(
    @Inject(MAT_DIALOG_DATA) public producto: ProductoModel,
    private dialogRef: MatDialogRef<ModalProductoComponent>,
    private formBuilder: FormBuilder,
    private swalService: SwalServices,
    private mesaValidacionService: MesaValidacionService,
    private dialog: MatDialog,
    private inventariosService: InventariosService
  ) {
    if (producto != null) {
      this.llenarFormModel(this.producto);
    } else {
      this.productoModel = new ProductoFormModel();
    }

    this.iniciarForm();
  }

  async ngOnInit() {
    ;
    this.listaFabricante = await this.obtenerFabricantes();
    this.listaCategoria = await this.obtenerCategoriasProducto();

    this.inicializarForm();
  }

  get modelo() {
    return this.formProducto.get("modelo");
  }
  get anio() {
    return this.formProducto.get("anio");
  }
  get categoria() {
    return this.formProducto.get("categoria");
  }
  get fabricante() {
    return this.formProducto.get("fabricante");
  }
  get nuevo() {
    return this.formProducto.get("nuevo");
  }
  get vidaUtil() {
    return this.formProducto.get("vidaUtil");
  }
  get caracteristica() {
    return this.formCaracteristica.get("caracteristica");
  }
  get hardware() {
    return this.formCaracteristica.get("hardware");
  }

  public async obtenerFabricantes() {
    const respuesta =
      await this.inventariosService.obtenerCatalogoFabricantes();
    return respuesta.exito ? respuesta.output : [];
  }

  public async obtenerCategoriasProducto() {
    const respuesta = await this.inventariosService.obtenerCategoriasProducto();
    return respuesta.exito ? respuesta.output : [];
  }

  public async obtenerCaracteristicasProducto() {
    const respuesta =
      await this.inventariosService.obtenerCaracteristicasProducto(
        this.producto.idproducto
      );
    return respuesta ? respuesta : [];
  }

  public iniciarForm() {
    this.formProducto = this.formBuilder.group({
      modelo: ["", [Validators.required]],
      anio: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
      fabricante: ["", [Validators.required]],
      nuevo: ["", [Validators.required]],
      vidaUtil: ["", [Validators.required]],
    });

    this.formCaracteristica = this.formBuilder.group({
      caracteristica: ["", Validators.required],
      hardware: ["", [Validators.required]],
    });
  }

  public async llenarFormModel(producto) {
    ;
    this.productoModel.id = producto.idproducto;
    this.productoModel.catFabricanteId = producto.idfabricante;
    this.productoModel.catCategoriaProductoId = producto.idcategoria;
    this.productoModel.modelo = producto.modelo;
    this.productoModel.anio = producto.anio;
    this.productoModel.vidautil = producto.vidautil;
    this.productoModel.nuevo = producto.nuevo;

    //const lista =  producto.caracteristicas ? producto.caracteristicas.split('|'): [];
    this.listaCaracteristicas = await this.obtenerCaracteristicasProducto();


    /* lista.forEach((x=> {
      let caracteristic = new CaracteristicaProductoFormModel_();
      caracteristic.nombre = x;
      this.listaCaracteristicas.push(caracteristic);
    })); */
  }

  public async agregarCaracteristica() {
    debugger
    if (this.caracteristica.value) {
      if (this.productoModel.id > 0) {
        let caracteritica = new CaracteristicaProductoFormModel_();
        caracteritica.catProductoId = this.productoModel.id;
        caracteritica.nombre = this.caracteristica.value;
        caracteritica.hardware = this.hardware.value
        if (this.hardware.value) {
          caracteritica.tipo = "HARDWARE"
        }
        else {
          caracteritica.tipo = "SOFTWARE"
        }
        const respuesta =
          await this.inventariosService.insertarCaracteristicaProducto(
            caracteritica
          );
        if (respuesta.exito) {
          caracteritica.id = respuesta.id;
          this.listaCaracteristicas.push(caracteritica);
          this.caracteristica.reset();
        } else {
          this.swalService.alertaPersonalizada(false, "Error");
        }
      } else {
        let caracteritica = new CaracteristicaProductoFormModel_();
        caracteritica.catProductoId = this.productoModel.id;
        caracteritica.nombre = this.caracteristica.value;
        caracteritica.hardware = this.hardware.value
        if (this.hardware.value) {
          caracteritica.tipo = "HARDWARE"
        }
        else {
          caracteritica.tipo = "SOFTWARE"
        }
        this.listaCaracteristicas.push(caracteritica);
        this.formCaracteristica.reset();
      }
    }

    /*
    if(this.accesorio.value){
      let lista = [];
      let accesorio = new AccesorioInventario();
      accesorio.nombre = this.accesorio.value;
      accesorio.tblInventarioId = this.inventarioModel.id;
      lista.push(accesorio);

      const respuesta = await this.inventariosService.insertarAccesorioInventario(lista);
      if(respuesta.exito){
        //this.swalService.alertaPersonalizada(true, 'Exito');
        //this.ngOnInit();
        this.accesorio.reset()
        this.listaAccesorios.push(accesorio);
      } else {
        this.swalService.alertaPersonalizada(false, 'Error');
      }
    } */
  }

  public inicializarForm() {
    this.modelo.setValue(this.productoModel.modelo);
    this.fabricante.setValue(this.productoModel.catFabricanteId);
    this.anio.setValue(this.productoModel.anio);
    this.categoria.setValue(this.productoModel.catCategoriaProductoId);
    this.vidaUtil.setValue(this.productoModel.vidautil);
    this.nuevo.setValue(this.productoModel.nuevo);
    this.hardware.setValue(false);
  }

  public async guardarProducto() {
    this.productoModel.modelo = this.modelo.value;
    this.productoModel.catFabricanteId = this.fabricante.value;
    this.productoModel.anio = this.anio.value;
    this.productoModel.catCategoriaProductoId = this.categoria.value;
    this.productoModel.vidautil = this.vidaUtil.value;
    this.productoModel.nuevo = this.nuevo.value;

    if (this.productoModel.id == 0) {
      this.listaCaracteristicas.forEach((x) => {
        this.productoModel.caracteristicas_.push(x.nombre);
      });
    }

    const respuesta =
      this.productoModel.id > 0
        ? await this.inventariosService.actualizarProducto(this.productoModel)
        : await this.inventariosService.insertarProducto(this.productoModel);

    if (respuesta.exito) {
      this.swalService.alertaPersonalizada(true, "Exito");
      this.close(true);
    } else {
      this.swalService.alertaPersonalizada(false, "Error");
    }
  }

  public async eliminarCaracteristica(
    caracteristica: CaracteristicaProductoFormModel_
  ) {



      if (this.productoModel.id > 0) {
        let confirmacion = await this.swalService.confirmacion(
          "Atención",
          "¿Esta seguro de eliminar el registro?",
          "Eliminar",
          ""
        );
        if (confirmacion) {
        const respuesta =
          await this.inventariosService.deshabilitarCaracteristicaProducto(
            caracteristica.id
          );
        if (respuesta.exito) {
          //this.swalService.alertaPersonalizada(true, 'Exito');
          //this.ngOnInit();
          const index = this.listaCaracteristicas.indexOf(caracteristica);
          const x = this.listaCaracteristicas.splice(index, 1);
        } else {
          this.swalService.alertaPersonalizada(false, "Error");
        }
      }
      } else {
        const index = this.listaCaracteristicas.indexOf(caracteristica);
        const x = this.listaCaracteristicas.splice(index, 1);
      }



  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  openModalCaracteristica(caracteristica: CaracteristicaProductoModel) {
    this.dialog
      .open(ModalCaracteristicaProductoComponent, {
        height: "50%",
        width: "100%",
        autoFocus: true,
        data: caracteristica,
        disableClose: true,
        maxWidth: window.innerWidth >= 1280 ? "80vw" : "100vw",
      })
      .afterClosed()
      .subscribe((result) => {
        this.ngOnInit();
      });
  }
}
