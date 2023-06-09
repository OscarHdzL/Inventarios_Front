import { PartidaFormModel } from './../modelos/partidas.model';
import { ConfiguracionEndpointsService } from './configuracion-endpoints.service';
import { NavigationService } from '../../@vex/services/navigation.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteFormModel } from '../modelos/cliente.model';
import { ProcesoFormModel } from '../modelos/procesos.model';
import { PeriodoFormModel } from '../modelos/periodos.model';
import { DocumentoFormModel } from '../modelos/documentos.model';
import { ProyectoFormModel } from '../modelos/proyectos.model';
import { AreaFormModel } from '../modelos/area.model';
import { RolFormModel } from '../modelos/rol.model';
import { UsuarioFormModel } from '../modelos/usuario.model';
import { ProcesoUsuarioFormModel } from '../modelos/proceso-usuario.model';
import { DocumentosProyectoFormModel } from '../modelos/DocumentosProyecto.model';



@Injectable({
  providedIn: 'root'
})
export class FileManagerService extends ConfiguracionEndpointsService {

  constructor(public http: HttpClient) {
    super(http);
  }


  /* FILEMANAGER */

  public async obtenerArchivo(token: string) : Promise <any> {
    return await this.getAsync(this.url_filemanager + 'api/Archivos/DescargarArchivo/21279CA3-1BE9-4DE2-9B1D-18FF5346DE55/' + token);
  }

  public async cargarArchivo(archivo: any) : Promise <any> {
    return await this.postAsync(this.url_filemanager + 'api/Archivos/CargarArchivos/21279CA3-1BE9-4DE2-9B1D-18FF5346DE55', archivo);
  }

/*
  public async obtenerArchivo(token: string) : Promise <any> {
    return await this.getAsync(this.url_filemanager + 'AdminArchivos/AdminArchivos/Visualizar/31B215CC-90A7-4E7B-A4B2-7001B177DB43/' + token);
  }

  public async cargarArchivo(archivo: any) : Promise <any> {
    return await this.postAsync(this.url_filemanager + 'AdminArchivos/AdminArchivos/Insertar/31B215CC-90A7-4E7B-A4B2-7001B177DB43', archivo);
  } */

  public async eliminarArchivo(token: string) : Promise <any> {
    return await this.postAsync(this.url_filemanager + 'api/Archivos/EliminarArchivo/21279CA3-1BE9-4DE2-9B1D-18FF5346DE55/' + token, {});
  }

  public async obtenerRutaArchivo(token: string): Promise <string>{
    return this.url_filemanager + 'api/Archivos/DescargarArchivo/21279CA3-1BE9-4DE2-9B1D-18FF5346DE55/' + token;
  }
  public obtenerURLRutaArchivo(token: string){
    return this.url_filemanager + 'api/Archivos/DescargarArchivo/21279CA3-1BE9-4DE2-9B1D-18FF5346DE55/' + token;
  }

/*   public async obtenerRutaArchivo(token: string): Promise <string>{
    return this.url_filemanager + 'AdminArchivos/AdminArchivos/Visualizar/31B215CC-90A7-4E7B-A4B2-7001B177DB43/' + token;
  } */




}
