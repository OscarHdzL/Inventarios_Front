import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgxFileDropEntry } from "ngx-file-drop";
import { ArchivoEmpleadoInventario, EmpleadoInventarioArrendamientoModel } from "src/app/modelos/Inventarios/inventario-arrendamiento.model";
import { FileManagerService } from "src/app/servicios/filemanager.service";
import { InventariosService } from "src/app/servicios/inventarios.service";
import { SwalServices } from "src/app/servicios/sweetalert2.services";

@Component({
  selector: 'vex-modal-visualizacion-asignacion-inventario-empleado',
  templateUrl: './modal-visualizacion-asignacion-inventario-empleado.component.html',
  styleUrls: ['./modal-visualizacion-asignacion-inventario-empleado.component.scss']
})
export class ModalVisualizacionAsignacionInventarioEmpleadoComponent implements OnInit {
  listaArchivos: ArchivoEmpleadoInventario[] = []
  asignacionModel: EmpleadoInventarioArrendamientoModel =
    new EmpleadoInventarioArrendamientoModel();
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
    public asignacionInventarioArrendamiento: EmpleadoInventarioArrendamientoModel,
    private dialogRef: MatDialogRef<ModalVisualizacionAsignacionInventarioEmpleadoComponent>,
    private filemanagerService: FileManagerService,
    private swalService: SwalServices,
    private inventariosService: InventariosService
  ) {}

  async ngOnInit() {

    this.asignacionModel =
      await this.obtenerAsignacionEmpleadoInventarioArrendamiento();
    this.asignacionModel.archivos.forEach((x) => {
      x.url = this.filemanagerService.obtenerURLRutaArchivo(x.archivo);
      console.log('X: ', x)
    });
/*
    this.listaArchivos = [{
      archivo: '7C76F64D-2BD8-4CDC-B849-D2B241BF2CA1',
      url: 'http://198.251.71.105:8082/api/Archivos/DescargarArchivo/21279CA3-1BE9-4DE2-9B1D-18FF5346DE55/5cc348d0-aff1-44e7-a080-ca83d1106d7a'
    }] */

    //this.listaArchivos = this.asignacionModel.archivos;
    console.log('listaArchivos: ', this.listaArchivos)
    this.recargar();
  }

public async recargar(){

  this.asignacionModel =
  await this.obtenerAsignacionEmpleadoInventarioArrendamiento();
this.asignacionModel.archivos.forEach((x) => {
  x.url = this.filemanagerService.obtenerURLRutaArchivo(x.archivo);
});

this.listaArchivos = this.asignacionModel.archivos;
}

  public abrirImagen(token){

    this.filemanagerService.obtenerURLRutaArchivo(token);
  }

  public async obtenerAsignacionEmpleadoInventarioArrendamiento() {
    const respuesta =
      await this.inventariosService.obtenerAsignacionEmpleadoInventarioArrendamiento(
        this.asignacionInventarioArrendamiento
          .idrelempleadoinventarioarrendamiento
      );
    return respuesta ? respuesta : new EmpleadoInventarioArrendamientoModel();
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


            let archivos: ArchivoEmpleadoInventario[] = [];
            let archivo = new ArchivoEmpleadoInventario();
            archivo.id = 0;
            archivo.relEmpleadoInventarioArrendamientoId = this.asignacionModel.idrelempleadoinventarioarrendamiento;
            archivo.archivo = respuesta.anotacion;
            archivos.push(archivo)
            const respuestaArchivoArrendamiento = await this.inventariosService.insertarArchivosAsignacionInventarioArrendamiento(archivos);

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

  public async eliminarArchivo(archivo: ArchivoEmpleadoInventario){

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


  async abrirDocumento(token: string){
    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    window.open(url,'_blank');
   }
}
