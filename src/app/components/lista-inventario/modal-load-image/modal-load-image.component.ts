import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ProductosImagenes } from 'src/app/modelos/Inventarios/imagenes-productos';
import { InventarioModel } from 'src/app/modelos/Inventarios/inventario.model';
import { FileManagerService } from 'src/app/servicios/filemanager.service';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { ScriptsService } from 'src/app/servicios/scripts.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';


@Component({
  selector: 'vex-modal-load-image',
  templateUrl: './modal-load-image.component.html',
  styleUrls: ['./modal-load-image.component.scss']
})
export class ModalLoadImageComponent implements OnInit {
  images:ProductosImagenes[] = []
  public files: NgxFileDropEntry[] = [];
  sesionUsuarioActual: SesionModel;
  public selectedVal: string = 'Carga archivos';
  constructor(@Inject(MAT_DIALOG_DATA) public inventario: InventarioModel,
              private dialogRef: MatDialogRef<ModalLoadImageComponent>,
              private filemanagerService: FileManagerService,
              private swalService: SwalServices,
              private dialog: MatDialog,
              private inventariosServices: InventariosService) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
               }
 indiceImagen=0;
 imagenLoad:string=''
  async ngOnInit(): Promise<void> {
    console.log("sesion ->", this.sesionUsuarioActual);
    let res = await this.inventariosServices.obtenerImagenesProductos(this.inventario.idinventario);
    this.images = res;
    this.imagenLoad = await this.filemanagerService.obtenerRutaArchivo(res[0].imagen);
  }
  async navegar(){

    console.log(this.images);
   let indiceTemp=this.indiceImagen +1;
   this.indiceImagen+=1;
   if(indiceTemp > this.images.length-1)
   {
     this.indiceImagen=0;
     this.imagenLoad = await this.filemanagerService.obtenerRutaArchivo(this.images[this.indiceImagen].imagen);
   } else{
    this.indiceImagen=indiceTemp;
    this.imagenLoad = await this.filemanagerService.obtenerRutaArchivo(this.images[this.indiceImagen].imagen);
   }
  }
  async deleteImage(){
    // this.images.splice(this.indiceImagen, 1);
    // if(this.images.length>0)
    // {
    //   this.imagenLoad=this.images[this.indiceImagen].imagen;

    // }
    // console.log(this.images);
    let res = await this.inventariosServices.deshabilitarImagenesProductos(this.images[this.indiceImagen].id,this.sesionUsuarioActual.id)
    if (res.exito) {
      this.swalService.alertaPersonalizada(true, "Eliminado");
      this.ngOnInit()
    }
    else {
      this.swalService.alertaPersonalizada(false, "Error al eliminar");
    }
    this.indiceImagen=0;
  }

  public dropped(files: NgxFileDropEntry[]) {

    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
        console.log('dropped',file.type)
        if(file.type =='image/png' || file.type =='image/jpeg'){
          const formData: any = new FormData();
          formData.append("file", file);

          const respuesta = await this.filemanagerService.cargarArchivo(formData);

          if (respuesta.exito) {
            let objeto = [{
              id: 0,
              tblInventarioId: this.inventario.idinventario,
              imagen: respuesta.anotacion,
              usuarioAppid: this.sesionUsuarioActual.id
            }]
            let res = await this.inventariosServices.insertarImagenesProductos(objeto)
            if (res.exito) {

              this.swalService.alertaPersonalizada(true, "Carga de imagen correcta");
              this.getUrl(respuesta.anotacion);
            }
            else {

            }
          } else {
            this.swalService.alertaPersonalizada(false,"No se pudo cargar la imagen");
          }
        }
        else{
          this.swalService.alertaPersonalizada(false,"El archivo no es de tipo imagen");
        }

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  async getUrl(token: string)
  {

    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    var imagen_ = {
      id: 0,
      tblInventarioId: this.inventario.idinventario,
      imagen: token,
      usuarioAppid: this.sesionUsuarioActual.id
    }
     this.images.push(imagen_);
    console.log(this.images)
     this.indiceImagen=0;
     //this.imagenLoad=this.images[this.indiceImagen].imagen;
     this.imagenLoad = await this.filemanagerService.obtenerRutaArchivo(this.images[this.indiceImagen].imagen);
     //this.imagenLoad = await this.filemanagerService.obtenerRutaArchivo(this.images[this.indiceImagen].imagen);


    console.log(url)
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
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
      let objeto = [{
        id: 0,
        tblInventarioId: this.inventario.idinventario,
        imagen: respuesta.anotacion,
        usuarioAppid: this.sesionUsuarioActual.id
      }]
      let res = await this.inventariosServices.insertarImagenesProductos(objeto)
      if (res.exito) {

        this.swalService.alertaPersonalizada(true, "Carga de imagen correcta");
        this.getUrl(respuesta.anotacion);
      }
      else {

      }
    } else {
      this.swalService.alertaPersonalizada(false,"No se pudo cargar la imagen");
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
