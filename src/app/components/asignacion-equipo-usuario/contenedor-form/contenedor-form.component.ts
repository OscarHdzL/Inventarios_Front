import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgxFileDropEntry } from "ngx-file-drop";
import { WebcamImage, WebcamInitError } from "ngx-webcam";
import { KeysStorageEnum } from "src/app/enum/keysStorage.enum";
import {
  ArchivoUsuarioInventario,
  ImagenUsuarioInventarioContenedor,
  UsuarioInventarioContenedorModel,
} from "src/app/modelos/Inventarios/usuario-inventario.model";
import { SesionModel } from "src/app/modelos/sesion.model";
import { FileManagerService } from "src/app/servicios/filemanager.service";
import { InventariosService } from "src/app/servicios/inventarios.service";
import { SwalServices } from "src/app/servicios/sweetalert2.services";

@Component({
  selector: "vex-contenedor-form",
  templateUrl: "./contenedor-form.component.html",
  styleUrls: ["./contenedor-form.component.scss"],
})
export class ContenedorFormComponent implements OnInit {
  public webcamImage: WebcamImage = null;
  sesionUsuarioActual: SesionModel;
  @Input() item: UsuarioInventarioContenedorModel;
  @Output() newItemEvent = new EventEmitter<boolean>();
  public files: NgxFileDropEntry[] = [];
  formContenedores: FormGroup;
  listaArchivos = [];
  public selectedVal: string = 'Carga archivos';
  constructor(
    private formBuilder: FormBuilder,
    private filemanagerService: FileManagerService,
    private swalService: SwalServices,
    private inventariosService: InventariosService
  ) {
    let sesion = localStorage.getItem(KeysStorageEnum.USER);
    this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
    this.iniciarForm();
  }

  async ngOnInit() {
    /*     if(this.item.id > 0){
      this.item = await this.obtenerContenedor();
    } */

    this.inicializarForm();
  }

  public limpiarFormulario() {
    this.id.setValue(this.item.id);
    this.relUsuarioInventarioId.setValue(this.item.relUsuarioInventarioId);
    this.contenedor.setValue(this.item.contenedor);
    this.tblUsuarioInventarioContenedorImagenes.clear();
  }

  public async obtenerContenedor() {
    const respuesta =
      await this.inventariosService.obtenerContenedoresAsignacionInventario(
        this.item.id
      );
    return respuesta
      ? respuesta.output
      : new UsuarioInventarioContenedorModel();
  }

  public iniciarForm() {
    this.formContenedores = this.formBuilder.group({
      id: new FormControl(0),
      relUsuarioInventarioId: new FormControl(0),
      contenedor: new FormControl("", [Validators.required]),
      usuarioAppid: new FormControl(0),
      tblUsuarioInventarioContenedorImagenes: this.formBuilder.array([]),
    });
  }

  public inicializarForm() {
    this.id.setValue(this.item.id);
    this.relUsuarioInventarioId.setValue(this.item.relUsuarioInventarioId);
    this.contenedor.setValue(this.item.contenedor);
    this.usuarioAppid.setValue(this.sesionUsuarioActual.id);
    this.item.tblUsuarioInventarioContenedorImagenes.forEach((x) => {
      const config = this.formBuilder.group({
        id: new FormControl(x.id),
        imagen: new FormControl(x.imagen),
        url: new FormControl(
          this.filemanagerService.obtenerURLRutaArchivo(x.imagen)
        ),
        descripcion: new FormControl(x.descripcion, [Validators.required]),
      });

      this.tblUsuarioInventarioContenedorImagenes.push(config);
    });
  }

  get id() {
    return this.formContenedores.get("id");
  }
  get relUsuarioInventarioId() {
    return this.formContenedores.get("relUsuarioInventarioId");
  }
  get contenedor() {
    return this.formContenedores.get("contenedor");
  }
  get usuarioAppid() {
    return this.formContenedores.get("usuarioAppid");
  }
  get tblUsuarioInventarioContenedorImagenes() {
    return this.formContenedores.get(
      "tblUsuarioInventarioContenedorImagenes"
    ) as FormArray;
  }

  async agregarImagen(token) {
    const img = this.formBuilder.group({
      id: new FormControl(0),
      imagen: new FormControl(token),
      url: new FormControl(
        this.filemanagerService.obtenerURLRutaArchivo(token)
      ),
      descripcion: new FormControl("", [Validators.required]),
    });
    this.tblUsuarioInventarioContenedorImagenes.push(img);
  }

  public async guardarContenedor() {

    const objeto = this.formContenedores.value;

    const respuesta =
      this.item.id > 0
        ? await this.inventariosService.editarContenedorAsignacionInventario(
            this.formContenedores.value
          )
        : await this.inventariosService.insertaContenedorAsignacionInventario(
            this.formContenedores.value
          );

    if (respuesta.exito) {
      this.swalService.alertaPersonalizada(true, "Exito");
      this.limpiarFormulario();
      this.inicializarForm();
      this.newItemEvent.emit(respuesta.id);
      /*       this.item.id = respuesta.id;
      this.ngOnInit() */
    } else {
      this.swalService.alertaPersonalizada(false, "Error");
    }
  }

  public async eliminarArchivo(i, archivo) {
    //archivo: ImagenUsuarioInventarioContenedor){


    if (archivo.value.id > 0) {
      let a = i;
      let b = archivo.value;
      let confirmacion = await this.swalService.confirmacion(
        "Atención",
        "¿Esta seguro de eliminar el registro?",
        "Eliminar",
        ""
      );
      if (confirmacion) {
        const respuesta =
          await this.inventariosService.eliminarImagenContenedorAsignacionInventario(
            archivo.value.id, this.sesionUsuarioActual.id
          );
        if (respuesta.exito) {
          this.swalService.alertaPersonalizada(true, "Exito");
          this.tblUsuarioInventarioContenedorImagenes.removeAt(i);

          //this.newItemEvent.emit(true);
          //this.recargar();
        } else {
          this.swalService.alertaPersonalizada(false, "Error");
        }
      }
    } else {
      this.tblUsuarioInventarioContenedorImagenes.removeAt(i);
    }
  }

  public async recargar() {
    this.tblUsuarioInventarioContenedorImagenes.clear();
    this.item.tblUsuarioInventarioContenedorImagenes.forEach((x) => {
      const config = this.formBuilder.group({
        id: new FormControl(x.id),
        imagen: new FormControl(x.imagen),
        url: new FormControl(
          this.filemanagerService.obtenerURLRutaArchivo(x.imagen)
        ),
        descripcion: new FormControl(x.descripcion, [Validators.required]),
      });

      this.tblUsuarioInventarioContenedorImagenes.push(config);
    });
  }

  async abrirDocumento(token: string) {
    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    window.open(url, "_blank");
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          const formData: any = new FormData();
          formData.append("file", file);

          const respuesta = await this.filemanagerService.cargarArchivo(
            formData
          );

          if (respuesta.exito) {
            this.agregarImagen(respuesta.anotacion);
          } else {
            this.swalService.alertaPersonalizada(
              false,
              "No se pudo cargar el archivo"
            );
          }
        });
      } else {
        this.swalService.alertaPersonalizada(
          false,
          "No se pudo cargar el archivo"
        );
      }
    }
  }


  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
  }

/*   public handleImage(webcamImage: WebcamImage) {

    this.webcamImage = webcamImage;
  } */

  public onValChange(val: string) {
    this.selectedVal = val;
    console.log("Valor Selected");
    console.log(this.selectedVal);
  }

  public async handleImage(webcamImage: any) {

    const base64 = '...';
    //const imageName = 'name.png';
    var imageName = Guid.newGuid() +  ".jpeg";
    const imageBlob = this.dataURItoBlob(webcamImage.imageAsBase64);
    const imageFile = new File([imageBlob], imageName, { type: webcamImage._mimeType });

    const formData: any = new FormData();
    formData.append("file", imageFile);

    const respuesta = await this.filemanagerService.cargarArchivo(
      formData
    );

    if (respuesta.exito) {
      this.agregarImagen(respuesta.anotacion);
    } else {
      this.swalService.alertaPersonalizada(
        false,
        "No se pudo cargar el archivo"
      );
    }

    //this.webcamImage = webcamImage;
  }

  public dataURItoBlob(dataURI) {

    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
 }

}

export class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
