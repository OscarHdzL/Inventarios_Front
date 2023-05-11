import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ArchivoUsuarioInventario, ImagenUsuarioInventarioContenedor, UsuarioInventarioContenedorModel } from 'src/app/modelos/Inventarios/usuario-inventario.model';
import { FileManagerService } from 'src/app/servicios/filemanager.service';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';

@Component({
  selector: 'vex-contenedor-form',
  templateUrl: './contenedor-form.component.html',
  styleUrls: ['./contenedor-form.component.scss']
})
export class ContenedorFormComponent implements OnInit {
  @Input() item: UsuarioInventarioContenedorModel;
  @Output() newItemEvent = new EventEmitter<boolean>();
  public files: NgxFileDropEntry[] = [];
  formContenedores: FormGroup;
  listaArchivos  = []
  constructor(
    private formBuilder: FormBuilder,
    private filemanagerService: FileManagerService,
    private swalService: SwalServices,
    private inventariosService: InventariosService,
  ) {

    this.iniciarForm();

  }

  async ngOnInit() {
/*     if(this.item.id > 0){
      this.item = await this.obtenerContenedor();
    } */

    this.inicializarForm()
  }

  public limpiarFormulario(){
    this.id.setValue(this.item.id);
    this.relUsuarioInventarioId.setValue(this.item.relUsuarioInventarioId);
    this.contenedor.setValue(this.item.contenedor);
    this.tblUsuarioInventarioContenedorImagenes.clear();
  }


  public async obtenerContenedor() {
    const respuesta =
      await this.inventariosService.obtenerContenedoresAsignacionInventario(this.item.id);
    return respuesta ? respuesta.output : new UsuarioInventarioContenedorModel();
  }



  public iniciarForm(){
    this.formContenedores = this.formBuilder.group({
      id: new FormControl(0),
      relUsuarioInventarioId: new FormControl(0),
      contenedor: new FormControl('', [Validators.required]),
      tblUsuarioInventarioContenedorImagenes: this.formBuilder.array([])
    });
  }

  public inicializarForm(){
    this.id.setValue(this.item.id);
    this.relUsuarioInventarioId.setValue(this.item.relUsuarioInventarioId);
    this.contenedor.setValue(this.item.contenedor);
    this.item.tblUsuarioInventarioContenedorImagenes.forEach((x)=>{

      const config = this.formBuilder.group({
        id: new FormControl(x.id),
        imagen: new FormControl(x.imagen),
        url: new FormControl(this.filemanagerService.obtenerURLRutaArchivo(x.imagen)),
        descripcion: new FormControl(x.descripcion, [Validators.required])
      });

      this.tblUsuarioInventarioContenedorImagenes.push(config);

    });


  }

  get id() { return this.formContenedores.get('id') }
  get relUsuarioInventarioId() { return this.formContenedores.get('relUsuarioInventarioId') }
  get contenedor() { return this.formContenedores.get('contenedor') }
  get tblUsuarioInventarioContenedorImagenes() { return this.formContenedores.get('tblUsuarioInventarioContenedorImagenes') as FormArray }

  async agregarImagen(token ){
    const img = this.formBuilder.group({
      id: new FormControl(0),
      imagen: new FormControl(token),
      url: new FormControl(this.filemanagerService.obtenerURLRutaArchivo(token)),
      descripcion: new FormControl('', [Validators.required])
      });
      this.tblUsuarioInventarioContenedorImagenes.push(img);
  }


  public async guardarContenedor(){
    debugger
    const objeto = this.formContenedores.value;

    const respuesta =  this.item.id > 0 ? await this.inventariosService.editarContenedorAsignacionInventario(this.formContenedores.value) : await this.inventariosService.insertaContenedorAsignacionInventario(this.formContenedores.value);

    if(respuesta.exito){
      this.swalService.alertaPersonalizada(true, 'Exito');
      this.limpiarFormulario();
      this.inicializarForm();
      this.newItemEvent.emit(true);
/*       this.item.id = respuesta.id;
      this.ngOnInit() */
    } else {
      this.swalService.alertaPersonalizada(false, 'Error');
    }

  }

  public async eliminarArchivo(i, archivo){//archivo: ImagenUsuarioInventarioContenedor){
debugger

    let a = archivo;
    let confirmacion = await this.swalService.confirmacion("Atención","¿Esta seguro de eliminar el registro?", "Eliminar","");
    if(confirmacion){
      const respuesta = await this.inventariosService.eliminarImagenContenedorAsignacionInventario(archivo);
      if(respuesta.exito){
        this.swalService.alertaPersonalizada(true, 'Exito');
        this.tblUsuarioInventarioContenedorImagenes.removeAt(i)
        //this.newItemEvent.emit(true);
        //this.recargar();
      } else {
        this.swalService.alertaPersonalizada(false, 'Error');
      }
    }
  }

  async abrirDocumento(token: string){
    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    window.open(url,'_blank');
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
}
