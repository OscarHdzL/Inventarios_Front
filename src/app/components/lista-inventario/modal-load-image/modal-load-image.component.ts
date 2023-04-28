import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';


@Component({
  selector: 'vex-modal-load-image',
  templateUrl: './modal-load-image.component.html',
  styleUrls: ['./modal-load-image.component.scss']
})
export class ModalLoadImageComponent implements OnInit {
  images = []
  public files: NgxFileDropEntry[] = [];
  
  constructor() {
   

   }

  ngOnInit(): void {
    this.images = [
      {path: 'https://media.istockphoto.com/id/1342162257/es/foto/rayo-directo-del-sol-en-el-cielo-azul.jpg?b=1&s=170667a&w=0&k=20&c=ghX3F62rueQb9cXuOGQAyQh9gsc2LQGnizZmmtFV4Sg='},
      {path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},
      {path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},{path: 'https://media.istockphoto.com/id/1364409548/es/foto/el-sol-saliendo-sobre-las-monta%C3%B1as-en-un-d%C3%ADa-de-invierno.jpg?b=1&s=170667a&w=0&k=20&c=RGtbSntOdUXghjLtihKOFla3LgLFxdjaUT7kmvxyGqE='},
      
  ]
  }

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
  
  public fileOver(event){
    console.log(event);
  }
  
  public fileLeave(event){
    console.log(event);
  }

}
