import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';
import { ClienteModel, UbicacionFormModel, UbicacionModel } from 'src/app/modelos/Inventarios/propietario.model';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { NgxFileDropEntry } from "ngx-file-drop";
import { FileManagerService } from 'src/app/servicios/filemanager.service';
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Router } from '@angular/router';
import { log } from 'console';
@Component({
  selector: 'vex-modal-ubicaciones',
  templateUrl: './modal-ubicaciones.component.html',
  styleUrls: ['./modal-ubicaciones.component.scss']
})
export class ModalUbicacionesComponent implements OnInit {

  sesionUsuarioActual: SesionModel;
  formPropietario: FormGroup;
  ubicacionModel: UbicacionFormModel = {};
  listaSubs: any[] = [];
  listaClientes: ClienteModel[] = [];
  tokenArchivo: string = '';
  public files: NgxFileDropEntry[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public ubicacion: UbicacionModel,
              private dialogRef: MatDialogRef<ModalUbicacionesComponent>,
              private formBuilder: FormBuilder,
              private swalService: SwalServices,
              private inventariosService: InventariosService,
              private filemanagerService: FileManagerService,
              private router: Router
              ) {
                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;
                if(ubicacion != null){
                  this.ubicacionModel.id = this.ubicacion.id;
                  this.ubicacionModel.catClienteId = this.ubicacion.catClienteId;
                  this.ubicacionModel.direccion = this.ubicacion.direccion;
                  this.ubicacionModel.edificio = this.ubicacion.edificio;
                  this.ubicacionModel.piso = this.ubicacion.piso;
                  this.tokenArchivo = this.ubicacion.plano

                } else {
                  this.ubicacionModel = new UbicacionFormModel();
                }
                this.iniciarForm();
               }

  async ngOnInit() {
    this.listaClientes = await this.obtenerClientes();
    this.inicializarForm();
  }
  public async obtenerClientes() {
    const respuesta =
      await this.inventariosService.obtenerCatalogoClientes();
    return respuesta ? respuesta.output : [];
  }
  get cliente() { return this.formPropietario.get('cliente') }
  get direccion() { return this.formPropietario.get('direccion') }
  get edificio() { return this.formPropietario.get('edificio') }
  get piso() { return this.formPropietario.get('piso') }


  public iniciarForm(){
    this.formPropietario = this.formBuilder.group({
      cliente: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      edificio: ['', [Validators.required]],
      piso: ['', [Validators.required]]
    });
  }
  async eliminarSubordinado(item: string){
    this.listaSubs.splice(this.listaSubs.findIndex(x => x.id == item),1)
  }
  public inicializarForm() {
    this.cliente.setValue(this.ubicacionModel.catClienteId);
    this.direccion.setValue(this.ubicacionModel.direccion);
    this.edificio.setValue(this.ubicacionModel.edificio);
    this.piso.setValue(this.ubicacionModel.piso);
  }

  public async guardarPropietario(){
    this.ubicacionModel.catClienteId = this.cliente.value;
    this.ubicacionModel.direccion = this.direccion.value;
    this.ubicacionModel.edificio = this.edificio.value;
    this.ubicacionModel.piso = this.piso.value;
    this.ubicacionModel.plano = this.tokenArchivo
    const respuesta = this.ubicacionModel.id > 0 ? await this.inventariosService.actualizarUbicacion(this.ubicacionModel) : await this.inventariosService.insertarUbicacion(this.ubicacionModel);
    //console.log("Respuesta Guardar -> ", respuesta);

    if(respuesta.exito){
      Swal.fire({
        title: respuesta.mensaje,
        text: "Quieres agregar oficinas?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl("components/crear-plano/"+respuesta.id)
        }
      })
      this.close(true)
    } else {
      this.swalService.alertaPersonalizada(false, 'Error');
    }
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          console.log('dropped',file.type)
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          if(file.type =='image/png' || file.type =='image/jpeg'){
            const formData: any = new FormData();
            formData.append("file", file);

            const respuesta = await this.filemanagerService.cargarArchivo(formData);

            if (respuesta.exito) {
              this.tokenArchivo = respuesta.anotacion;
              this.swalService.alertaPersonalizada(true, "Carga de archivo correcta");
            } else {
              this.swalService.alertaPersonalizada(false,"No se pudo cargar el archivo");
            }
          }
          else{
            this.swalService.alertaPersonalizada(false,"El archivo no es de tipo PNG o JPG");
          }
        });
      }
      else {
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
  async abrirDocumento(token: string){
    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    window.open(url,'_blank');
  }
}
