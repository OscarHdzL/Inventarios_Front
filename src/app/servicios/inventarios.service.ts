import { PartidaFormModel } from './../modelos/partidas.model';
import { ConfiguracionEndpointsService } from './configuracion-endpoints.service';
import { NavigationService } from '../../@vex/services/navigation.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloFormModel } from '../modelos/Inventarios/articulo.model';
import { SoftwareFormModel } from '../modelos/Inventarios/software.model';


@Injectable({
  providedIn: 'root'
})
export class InventariosService extends ConfiguracionEndpointsService {


  constructor(public http: HttpClient) {
    super(http);
  }

    /* USUARIOS */
    public async obtenerCatalogoArticulos() : Promise <any> {
      return await this.getAsync(this.url_api + 'Articulos');
    }

    public async insertarArticulo(usuario: ArticuloFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Articulos', usuario);
    }

    public async actualizarArticulo(usuario: ArticuloFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'Articulos', usuario);
    }

    public async deshabilitarArticulo(usuario: number) : Promise <any> {
      return await this.putAsync(this.url_api + 'Articulos/Disable/'+usuario, {});
    }


        /* SOFTWARE */
        public async obtenerCatalogoSoftware() : Promise <any> {
          return await this.getAsync(this.url_api + 'Softwares');
        }

        public async insertarSoftware(usuario: SoftwareFormModel) : Promise <any> {
          return await this.postAsync(this.url_api + 'Software', usuario);
        }

        public async actualizarSoftware(usuario: SoftwareFormModel) : Promise <any> {
          return await this.putAsync(this.url_api + 'Software', usuario);
        }

        public async deshabilitarSoftware(usuario: number) : Promise <any> {
          return await this.putAsync(this.url_api + 'Software/Disable/'+usuario, {});
        }


}
