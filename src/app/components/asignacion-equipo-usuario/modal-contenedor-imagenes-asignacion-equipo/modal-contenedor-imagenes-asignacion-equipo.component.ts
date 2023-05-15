import { Component, Inject, OnInit } from "@angular/core";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgxFileDropEntry } from "ngx-file-drop";
import { ArchivoUsuarioInventario, UsuarioInventarioContenedorModel, UsuarioInventarioModel } from "src/app/modelos/Inventarios/usuario-inventario.model";
import { FileManagerService } from "src/app/servicios/filemanager.service";
import { InventariosService } from "src/app/servicios/inventarios.service";
import { SwalServices } from "src/app/servicios/sweetalert2.services";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WebcamImage } from "ngx-webcam";
@Component({
  selector: 'vex-modal-contenedor-imagenes-asignacion-equipo',
  templateUrl: './modal-contenedor-imagenes-asignacion-equipo.component.html',
  styleUrls: ['./modal-contenedor-imagenes-asignacion-equipo.component.scss']
})
export class ModalContenedorImagenesAsignacionEquipoComponent implements OnInit {
  public webcamImage: WebcamImage = null;
  formContenedores: FormGroup;
  listaContenedores = []
  panelOpenState = false;
  index = 0;
  itemVacio = new UsuarioInventarioContenedorModel();

  listaArchivos: ArchivoUsuarioInventario[] = []
  asignacionModel: UsuarioInventarioModel =
    new UsuarioInventarioModel();
  public files: NgxFileDropEntry[] = [];
  itemInventario = {
    modelo: "Modelo 87d87h34jhs",
    fabricante: "Fabricante",
    categoria: "Categoria ",
    serie: "4ds54sdf4",
    clave: "34344d",
  };
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public asignacionInventario: UsuarioInventarioModel,
    private dialogRef: MatDialogRef<ModalContenedorImagenesAsignacionEquipoComponent>,
    private filemanagerService: FileManagerService,
    private swalService: SwalServices,
    private inventariosService: InventariosService,
    private formBuilder: FormBuilder,
  ) {

this.itemVacio = new UsuarioInventarioContenedorModel();
this.itemVacio.relUsuarioInventarioId = this.asignacionInventario.idrelusuarioinventario;
    const a = this.asignacionInventario;
    this.iniciarForm();
  }

  async ngOnInit() {


    this.asignacionModel =
      await this.obtenerAsignacionUsuarioInventario();
    this.asignacionModel.archivos.forEach((x) => {
      x.url = this.filemanagerService.obtenerURLRutaArchivo(x.archivo);
      console.log('X: ', x)
    });


    this.listaContenedores = await this.obtenerContenedores();

  }




  get contenedoresAsignacion() { return this.formContenedores.get('contenedoresAsignacion') as FormArray }
  get archivosContenedor() { return this.formContenedores.get('contenedoresAsignacion').get('archivos') as FormArray }




  public iniciarForm(){
    this.formContenedores = this.formBuilder.group({
      contenedoresAsignacion: this.formBuilder.array([])
    });

    //this.agregarImagen();
    this.anadirContenedor();
    //this.agregarImagen();
  }


  public anadirContenedor() {
    const contenedor = this.formBuilder.group({
      contenedor: new FormControl(''),
      archivos: this.formBuilder.array([])
    });

    this.contenedoresAsignacion.push(contenedor);
  }


  public async obtenerContenedores() {
    const respuesta =
      await this.inventariosService.obtenerContenedoresAsignacionInventario(this.asignacionInventario.idrelusuarioinventario);
    return respuesta ? respuesta.output : [];
  }


  async agregarImagen(){
    const img = this.formBuilder.group({
        tokenImagen: new FormControl('http://198.251.71.105:8082/api/Archivos/DescargarArchivo/21279CA3-1BE9-4DE2-9B1D-18FF5346DE55/373c118a-912e-4107-be61-47ba862dc9fc'),
        descripcion: new FormControl('', [Validators.required])
      });

      this.contenedoresAsignacion.push(img);
  }


public async recargar(){

  this.asignacionModel =
  await this.obtenerAsignacionUsuarioInventario();
this.asignacionModel.archivos.forEach((x) => {
  x.url = this.filemanagerService.obtenerURLRutaArchivo(x.archivo);
});

this.listaArchivos = this.asignacionModel.archivos;
}

  public abrirImagen(token){
    debugger
    this.filemanagerService.obtenerURLRutaArchivo(token);
  }

  public async obtenerAsignacionUsuarioInventario() {
    const respuesta =
      await this.inventariosService.obtenerAsignacionInventario(
        this.asignacionInventario
          .idrelusuarioinventario
      );
    return respuesta ? respuesta : new UsuarioInventarioModel();
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

            debugger
            let archivos: ArchivoUsuarioInventario[] = [];
            let archivo = new ArchivoUsuarioInventario();
            archivo.id = 0;
            archivo.relUsuarioInventarioId = this.asignacionModel.idrelusuarioinventario;
            archivo.archivo = respuesta.anotacion;
            archivos.push(archivo)
            const respuestaArchivoArrendamiento = await this.inventariosService.insertarArchivosAsignacionInventario(archivos);

            if (respuestaArchivoArrendamiento.exito) {
              this.swalService.alertaPersonalizada(
                true,
                "Carga de archivo correcta"
              );
              this.ngOnInit();
            }
            else {
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
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  public async eliminarArchivo(archivo: ArchivoUsuarioInventario){
    debugger
    let confirmacion = await this.swalService.confirmacion("Atención","¿Esta seguro de eliminar el registro?", "Eliminar","");
    if(confirmacion){
      const respuesta = await this.inventariosService.eliminarArchivoAsignacionInventarioArrendamiento(archivo.id);
      if(respuesta.exito){
        this.swalService.alertaPersonalizada(true, 'Exito');
        this.recargar();
      } else {
        this.swalService.alertaPersonalizada(false, 'Error');
      }
    }
  }

  public EventEmit(respuesta){
    debugger
    this.index == respuesta;
    this.ngOnInit();


  }

  public abierto(idContenedor){
   this.index = idContenedor;
  }

  async abrirDocumento(token: string){
    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    window.open(url,'_blank');
   }

   public handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }
}
