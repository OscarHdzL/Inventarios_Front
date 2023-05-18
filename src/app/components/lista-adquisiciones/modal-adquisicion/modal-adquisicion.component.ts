import { RelAdquisicionDetalle } from "./../../../modelos/Inventarios/adquisicion.model";
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
  AdquisicionFormModel,
  AdquisicionModel,
} from "src/app/modelos/Inventarios/adquisicion.model";
import { MatAccordion } from "@angular/material/expansion";

import { ModalProductoAdquisicionComponent } from "../modal-producto-adquisicion/modal-producto-adquisicion.component";
import { InventariosService } from "src/app/servicios/inventarios.service";
import { FileManagerService } from "src/app/servicios/filemanager.service";
import {
  PropietarioModel,
  ProveedorModel,
} from "src/app/modelos/Inventarios/propietario.model";
import { NgxFileDropEntry } from "ngx-file-drop";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "vex-modal-adquisicion",
  templateUrl: "./modal-adquisicion.component.html",
  styleUrls: ["./modal-adquisicion.component.scss"],
})

export class ModalAdquisicionComponent implements OnInit {
  abierto = true;
  formAdquisicion: FormGroup;
  adquisicionModel: AdquisicionFormModel = new AdquisicionFormModel();
  listaCategoria: any[] = [];
  listaFabricante: any[] = [];
  listaProveedor: ProveedorModel[] = [];
  listaPropietario: PropietarioModel[] = [];
  panelOpenState = false;
  listaProductosAdquisicion = new Array<RelAdquisicionDetalle>();
  public files: NgxFileDropEntry[] = [];
  plantilla: NgxFileDropEntry[] = [];
  cargaMasiva: string = 'normal';
  tokenPlantilla: string = '';
  @ViewChild("accordion", { static: true }) Accordion: MatAccordion;

  constructor(
    @Inject(MAT_DIALOG_DATA) public adquisicion: AdquisicionModel,
    private dialogRef: MatDialogRef<ModalAdquisicionComponent>,
    private formBuilder: FormBuilder,
    private swalService: SwalServices,
    private inventariosService: InventariosService,
    private dialog: MatDialog,
    private filemanagerService: FileManagerService
  ) {

    if (adquisicion != null) {
      //this.llenarFormModel(this.adquisicion);
    } else {
      this.adquisicionModel = new AdquisicionFormModel();
    }
    //this.adquisicionModel = {"id":14,"catproveedorid":1,"catpropietarioid":6,"monto":12134.43,"impuesto":345.45,"articulos":20,"facpdf":"tokenPrueba","facxml":"tokenPrueba","fechadecompra":"2023-04-14","detalle":[]};



    this.iniciarForm();
  }
  public onValChange(val: string) {
    this.cargaMasiva = val;
    console.log("Valor Selected");
    console.log(this.cargaMasiva);
  }
  async ngOnInit() {
/*     if( this.adquisicion){
      let AdquisicionModel = await this.obtenerAdquisicion();
    } else{
      let AdquisicionModel = new AdquisicionFormModel();
    } */

    const AdquisicionModel = this.adquisicion ? await this.obtenerAdquisicion() : new AdquisicionFormModel();

    console.log('AdquisicionModel: ', AdquisicionModel);
    this.llenarFormModel(AdquisicionModel);

    this.listaProveedor = await this.obtenerProveedores();
    this.listaPropietario = await this.obtenerPropietarios();
    this.inicializarForm();
  }
///drag drop
public dropped(files: NgxFileDropEntry[]) {
  this.files = files;
  for (const droppedFile of files) {

    // Is it a file?
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
 console.log('dropped',file.type)
        // Here you can access the real file
        console.log(droppedFile.relativePath, file);
        if(file.type =='application/pdf'){
          this.pdfSeleccionado2(file)
        }else{ this.xmlSeleccionado2(file)}


        /**
        // You could upload it like this:
        const formData = new FormData()
        formData.append('logo', file, relativePath)

        // Headers
        const headers = new HttpHeaders({
          'security-token': 'mytoken'
        })

        this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
        .subscribe(data => {
          // Sanitized logo returned from backend
        })
        **/

      });
    } else {
      // It was a directory (empty directories are added, otherwise only files)
      const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      console.log(droppedFile.relativePath, fileEntry);
    }
  }
}

public droppedPlantilla(files: NgxFileDropEntry[]) {
  this.plantilla = files;
}

public fileOver(event){
  console.log(event);
}

public fileLeave(event){
  console.log(event);
}

async pdfSeleccionado2(file: File) {
  ;

    const formData: any = new FormData();
    formData.append("file", file);

    const respuesta = await this.filemanagerService.cargarArchivo(formData);

    if (respuesta.exito) {
      this.adquisicionModel.facpdf = respuesta.anotacion;
      /*  this.produc = event.target.files[0].name;
      this.archivoEditableToken = respuesta.anotacion;
      //this.archivoEditableToken = respuesta.respuesta;
      this.archivoEditableExtension = this.archivoEditableNombre.split('.')[1]; */
      this.swalService.alertaPersonalizada(true, "Carga de archivo correcta");
    } else {
      this.swalService.alertaPersonalizada(
        false,
        "No se pudo cargar el archivo"
      );
    }

}
async xmlSeleccionado2(file: File) {
  ;

    const formData: any = new FormData();
    formData.append("file", file);

    const respuesta = await this.filemanagerService.cargarArchivo(formData);

    if (respuesta.exito) {
      this.adquisicionModel.facxml = respuesta.anotacion;
      /*  this.produc = event.target.files[0].name;
      this.archivoEditableToken = respuesta.anotacion;
      //this.archivoEditableToken = respuesta.respuesta;
      this.archivoEditableExtension = this.archivoEditableNombre.split('.')[1]; */
      this.swalService.alertaPersonalizada(true, "Carga de archivo correcta");
    } else {
      this.swalService.alertaPersonalizada(
        false,
        "No se pudo cargar el archivo"
      );
    }

}

///end drag

  public async llenarFormModel(adquisicion_){

    this.adquisicionModel.id = adquisicion_.id;
    this.adquisicionModel.catProveedorId = adquisicion_.catProveedorId;
    this.adquisicionModel.catPropietarioId =
      adquisicion_.catPropietarioId;
    this.adquisicionModel.monto = adquisicion_.monto ? adquisicion_.monto : 0;
    this.adquisicionModel.impuesto = adquisicion_.impuesto ? adquisicion_.impuesto : 0;
    this.adquisicionModel.articulos = adquisicion_.articulos ? adquisicion_.articulos : 0;
    this.adquisicionModel.facpdf = adquisicion_.facPdf ? adquisicion_.facPdf : '';
    this.adquisicionModel.facxml = adquisicion_.facXml ? adquisicion_.facXml: '';
    this.adquisicionModel.fechadecompra =
    adquisicion_.fechadecompra ? adquisicion_.fechadecompra.split("T")[0]: null;

    this.adquisicionModel.detalle = adquisicion_.relAdquisicionDetalles ? adquisicion_.relAdquisicionDetalles : [];

    //this.listaProductosAdquisicion = this.adquisicionModel.detalle;

    if(this.adquisicion.id == 0){
      this.listaProductosAdquisicion = [];
    }else{
      this.listaProductosAdquisicion = await this.obtenerProductosAdquisiciones();
    }



    //await this.calcularMontoImpuestoArticulos();
  }

  get proveedor() {
    return this.formAdquisicion.get("proveedor");
  }
  get propietario() {
    return this.formAdquisicion.get("propietario");
  }
  get articulos() {
    return this.formAdquisicion.get("articulos");
  }
  get monto() {
    return this.formAdquisicion.get("monto");
  }
  get impuesto() {
    return this.formAdquisicion.get("impuesto");
  }
  get facturaPDF() {
    return this.formAdquisicion.get("facturaPDF");
  }
  get facturaXML() {
    return this.formAdquisicion.get("facturaXML");
  }
  get fechaCompra() {
    return this.formAdquisicion.get("fechaCompra");
  }


  public async obtenerProductosAdquisiciones() {

    const respuesta = await this.inventariosService.obtenerProductosAdquisiciones(
      this.adquisicion.id
    );
    return respuesta ? respuesta : [];
  }

  public async obtenerAdquisicion() {
    const respuesta = await this.inventariosService.obtenerAdquisicion(
      this.adquisicion.id
    );
    return respuesta ? respuesta.output[0] : new AdquisicionFormModel();
  }

  public async obtenerProveedores() {
    const respuesta =
      await this.inventariosService.obtenerCatalogoProveedores();
    return respuesta ? respuesta.output : [];
  }

  public async obtenerPropietarios() {
    const respuesta =
      await this.inventariosService.obtenerCatalogoPropietarios();
    return respuesta ? respuesta.output : [];
  }

  public iniciarForm() {
    this.formAdquisicion = this.formBuilder.group({
      proveedor: ["", [Validators.required]],
      propietario: ["", [Validators.required]],
      articulos: ["", [Validators.required]],
      monto: ["", [Validators.required]],
      impuesto: ["", [Validators.required]],
      /* facturaPDF: [''],
      facturaXML: [''], */
      fechaCompra: ["", [Validators.required]],
    });

    this.formAdquisicion.get('monto').valueChanges.subscribe((monto)=> {
      if(monto){
        const impuesto = monto * 0.16;
        this.formAdquisicion.get('impuesto').setValue(impuesto);
      }
    });
  }

  public inicializarForm() {

    this.proveedor.setValue(this.adquisicionModel.catProveedorId);
    this.propietario.setValue(this.adquisicionModel.catPropietarioId);
    this.articulos.setValue(this.adquisicionModel.articulos);
    this.monto.setValue(this.adquisicionModel.monto);
    this.impuesto.setValue(this.adquisicionModel.impuesto);
    /*   this.facturaPDF.setValue(this.adquisicionModel.fAC_PDF);
  this.facturaXML.setValue(this.adquisicionModel.fAC_XML); */
    this.fechaCompra.setValue(this.adquisicionModel.fechadecompra);
  }

  public async guardarAdquisicion() {
    if (this.cargaMasiva == 'normal') {
      this.adquisicionModel.catProveedorId = this.proveedor.value;
      this.adquisicionModel.catPropietarioId = this.propietario.value;
      this.adquisicionModel.articulos = this.articulos.value;
      this.adquisicionModel.monto = this.monto.value;
      this.adquisicionModel.impuesto = this.impuesto.value;
      //this.adquisicionModel.facpdf = "tokenPrueba"; //this.facturaPDF.value;
      //this.adquisicionModel.facxml = "tokenPrueba"; //this.facturaXML.value;
      this.adquisicionModel.fechadecompra = this.fechaCompra.value;
      this.adquisicionModel.detalle = this.listaProductosAdquisicion;
      //this.adquisicionModel.detalle =null

      const respuesta =
        this.adquisicionModel.id > 0
          ? await this.inventariosService.actualizarAdquisicion(
              this.adquisicionModel
            )
          : await this.inventariosService.insertarAdquisicion(
              this.adquisicionModel
            );

      if (respuesta.exito) {
        this.swalService.alertaPersonalizada(true, "Exito");
        //this.close(true);
        this.adquisicion = new AdquisicionModel();
        this.adquisicion.id = respuesta.id;
        this.ngOnInit();
      } else {
        this.swalService.alertaPersonalizada(false, "Error");
      }
    }
    else {
        // Is it a file?
      if (this.plantilla[0].fileEntry.isFile) {
        const fileEntry = this.plantilla[0].fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          debugger
          console.log('dropped',file.type)
          // Here you can access the real file
          console.log(this.plantilla[0].relativePath, file);
          const formData: any = new FormData();
          formData.append("file", file);

          const respuesta = await this.inventariosService.insertarAdquisicionCargaMasiva(formData);

          if (respuesta.exito) {
            let objeto = {
              idAdquision: respuesta.id,
              pdf: this.adquisicionModel.facpdf,
              xml: this.adquisicionModel.facxml
            }
            let res = await this.inventariosService.insertarAdjuntos(objeto)
            if (res.exito) {
              this.swalService.alertaPersonalizada(true, "Exito");
              //this.close(true);
              this.adquisicion = new AdquisicionModel();
              this.adquisicion.id = respuesta.id;
              this.close(true)
            }
            else {
              this.swalService.alertaPersonalizada(false, "Error");
            }
          }
          else {
            this.swalService.alertaPersonalizada(
              false,
              "No se pudo cargar la plantilla"
            );
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = this.plantilla[0].fileEntry as FileSystemDirectoryEntry;
        console.log(this.plantilla[0].relativePath, fileEntry);
      }
    }
  }

/*   public async guardarProductosAdquisicion() {
    const respuesta = await this.inventariosService.insertarAdquisicionDetalle(
      this.listaProductosAdquisicion
    );

    if (respuesta.exito) {
      this.swalService.alertaPersonalizada(true, "Exito");
      this.close(true);
    } else {
      this.swalService.alertaPersonalizada(false, "Error");
    }
  } */

  close(result: boolean) {
    this.dialogRef.close(result);
  }


  public calcularImpuesto(monto){

    if(monto){
      const impuesto = (monto * 0.16);
      this.impuesto.setValue(impuesto)
    }
  }

  openModalProducto(producto: RelAdquisicionDetalle) {

    if (!producto) {
      producto = new RelAdquisicionDetalle();
      producto.tblAdquisicionId = this.adquisicionModel.id;
    }

    this.dialog
      .open(ModalProductoAdquisicionComponent, {
        height: 'auto',
        width: "100%",
        autoFocus: true,
        data: producto,
        disableClose: true,
        maxWidth: window.innerWidth >= 1280 ? "80vw" : "100vw",

      })
      .afterClosed()
      .subscribe((result) => {
        debugger
        if (result) {
          if (result.iD > 0) {
            //edita
            this.ngOnInit();
          } else {
            // agrega
            this.listaProductosAdquisicion.push(result);
            //this.calcularMontoImpuestoArticulos();
          }
        }
        //this.ngOnInit();
      });
  }

  public async eliminarProducto(producto: RelAdquisicionDetalle) {
    if (producto.id > 0) {
      let confirmacion = await this.swalService.confirmacion(
        "Atención",
        "¿Esta seguro de eliminar el registro?",
        "Eliminar",
        ""
      );

      if (confirmacion) {
        const respuesta = await this.inventariosService.deshabilitarAdquisicionDetalle(
          producto.id
        );
        if (respuesta.exito) {
          this.swalService.alertaPersonalizada(true, "Exito");
          this.ngOnInit();
        } else {
          this.swalService.alertaPersonalizada(false, "Error");
        }
      }
    } else {
      const index = this.listaProductosAdquisicion.indexOf(producto);
      this.listaProductosAdquisicion.splice(index, 1);
      //this.calcularMontoImpuestoArticulos();
    }
  }

  async pdfSeleccionado(event) {
    ;
    if (event.target.files.length > 0) {
      const formData: any = new FormData();
      formData.append("file", event.target.files[0]);

      const respuesta = await this.filemanagerService.cargarArchivo(formData);

      if (respuesta.exito) {
        this.adquisicionModel.facpdf = respuesta.anotacion;
        /*  this.produc = event.target.files[0].name;
        this.archivoEditableToken = respuesta.anotacion;
        //this.archivoEditableToken = respuesta.respuesta;
        this.archivoEditableExtension = this.archivoEditableNombre.split('.')[1]; */
        this.swalService.alertaPersonalizada(true, "Carga de archivo correcta");
      } else {
        this.swalService.alertaPersonalizada(
          false,
          "No se pudo cargar el archivo"
        );
      }
    }
  }

  async xmlSeleccionado(event) {
    ;
    if (event.target.files.length > 0) {
      const formData: any = new FormData();
      formData.append("file", event.target.files[0]);

      const respuesta = await this.filemanagerService.cargarArchivo(formData);

      if (respuesta.exito) {
        this.adquisicionModel.facxml = respuesta.anotacion;
        /*  this.produc = event.target.files[0].name;
        this.archivoEditableToken = respuesta.anotacion;
        //this.archivoEditableToken = respuesta.respuesta;
        this.archivoEditableExtension = this.archivoEditableNombre.split('.')[1]; */
        this.swalService.alertaPersonalizada(true, "Carga de archivo correcta");
      } else {
        this.swalService.alertaPersonalizada(
          false,
          "No se pudo cargar el archivo"
        );
      }
    }
  }

  public async calcularMontoImpuestoArticulos() {
    ;
    this.adquisicionModel.monto = 0;
    this.adquisicionModel.articulos = 0;
    this.adquisicionModel.impuesto = 0;

    this.articulos.setValue(this.adquisicionModel.articulos);
    this.monto.setValue(this.adquisicionModel.monto);
    this.impuesto.setValue(this.adquisicionModel.impuesto);

    if (this.listaProductosAdquisicion.length > 0) {
      await this.listaProductosAdquisicion.forEach((x) => {
        let montoProducto: number = x.cantidad * x.costosiunitario;
        this.adquisicionModel.monto =
          this.adquisicionModel.monto + montoProducto;
        this.adquisicionModel.articulos =
          this.adquisicionModel.articulos + x.cantidad;
        this.adquisicionModel.impuesto = this.adquisicionModel.monto * 0.16;

        this.articulos.setValue(this.adquisicionModel.articulos);
        this.monto.setValue(this.adquisicionModel.monto);
        this.impuesto.setValue(this.adquisicionModel.impuesto);
      });
    }
  }

  async abrirDocumento(token: string){
    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    window.open(url,'_blank');
   }
  descargarPlantilla(){
    Swal.fire({
      title: "Cuantos productos cargaras en esta plantilla?",
      text: "Ingresa el numero de productos",
      input: 'text',
      icon: "info",
      showCancelButton: true
  }).then(async(result) => {
      if (result.value) {
        window.open(this.inventariosService.obtenerPlantillaMasiva(result.value),"_blank");
      }
  });
  }

}
