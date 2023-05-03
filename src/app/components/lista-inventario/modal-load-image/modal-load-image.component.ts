import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ProductosImagenes } from 'src/app/modelos/Inventarios/imagenes-productos';
import { FileManagerService } from 'src/app/servicios/filemanager.service';
import { ScriptsService } from 'src/app/servicios/scripts.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';



@Component({
  selector: 'vex-modal-load-image',
  templateUrl: './modal-load-image.component.html',
  styleUrls: ['./modal-load-image.component.scss']
})
export class ModalLoadImageComponent implements OnInit {
  images:ProductosImagenes[] = []
  public files: NgxFileDropEntry[] = [];
  
  constructor( private filemanagerService: FileManagerService, private swalService: SwalServices,) {
   

   }
 indiceImagen=0;
 imagenLoad:string=''
  ngOnInit(): void {



           

    /* this.images = [
      {path: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'},
      {path: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg'},
      {path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},
      
  ] */
  //this.imagenLoad=this.images[0].path;

  
  }
  navegar()
  {
    
   let indiceTemp=this.indiceImagen +1;
   if(indiceTemp > this.images.length-1)
   {
     this.indiceImagen=0;
     this.imagenLoad=this.images[this.indiceImagen].path;
   } else{
    this.indiceImagen=indiceTemp;
    this.imagenLoad=this.images[this.indiceImagen].path;
   }
  }
  deleteImage(){
    this.images.splice(this.indiceImagen, 1);
    this.indiceImagen=0;
    if(this.images.length>0)
    {
      this.imagenLoad=this.images[this.indiceImagen].path;

    }
    console.log(this.images);
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
  
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
   console.log('dropped',file.type)
      this.loadFileSeleccionado(file)
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          /* if(file.type =='application/pdf'){
            this.pdfSeleccionado2(file)
          }else{ this.xmlSeleccionado2(file)} */
  
  
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

  async loadFileSeleccionado(file: File) {
    ;
  
      const formData: any = new FormData();
      formData.append("file", file);
  
      const respuesta = await this.filemanagerService.cargarArchivo(formData);
  
      if (respuesta.exito) {
       console.log('carga archivo',respuesta.anotacion)
       this.getUrl(respuesta.anotacion)
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

  async getUrl(token)
  {
    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    let imagen:ProductosImagenes= new ProductosImagenes()
     imagen.path=url;

     this.images.push(imagen);
     this.indiceImagen=0;
     this.imagenLoad=this.images[this.indiceImagen].path;

     this
    

    console.log(url)
  }
  
  public fileOver(event){
    console.log(event);
  }
  
  public fileLeave(event){
    console.log(event);
  }

}
