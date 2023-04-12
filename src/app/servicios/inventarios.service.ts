import { PartidaFormModel } from './../modelos/partidas.model';
import { ConfiguracionEndpointsService } from './configuracion-endpoints.service';
import { NavigationService } from '../../@vex/services/navigation.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloFormModel } from '../modelos/Inventarios/articulo.model';
import { SoftwareFormModel } from '../modelos/Inventarios/software.model';
import { PropietarioFormModel } from '../modelos/Inventarios/propietario.model';
import { ProductoFormModel } from '../modelos/Inventarios/producto.model';
import { AdquisicionFormModel } from '../modelos/Inventarios/adquisicion.model';


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

    /* PRODUCTOS */
    public async obtenerCatalogoProductos() : Promise <any> {
      return await this.getAsync(this.url_api + 'Productos');
    }

    public async insertarProducto(usuario: ProductoFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Productos', usuario);
    }

    public async actualizarProducto(usuario: ProductoFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'Productos', usuario);
    }

    public async deshabilitarProducto(usuario: number) : Promise <any> {
      return await this.putAsync(this.url_api + 'Productos/Disable/'+usuario, {});
    }


    /* PRODUCTOS */
    public async obtenerCatalogoAdquisiciones() : Promise <any> {
      return await this.getAsync(this.url_api + 'Adquisicion');
    }

    public async insertarAdquisicion(usuario: AdquisicionFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Adquisicion', usuario);
    }

    public async actualizarAdquisicion(usuario: AdquisicionFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'Adquisicion', usuario);
    }

    public async deshabilitarAdquisicion(usuario: number) : Promise <any> {
      return await this.putAsync(this.url_api + 'Adquisicion/Disable/'+usuario, {});
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

    /* PROPIETARIOS */
    public async obtenerCatalogoPropietarios() : Promise <any> {
      return await this.getAsync(this.url_api + 'Propietarios');
    }

    public async insertarPropietario(propietario: PropietarioFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Propietario', propietario);
    }

    public async actualizarPropietarios(propietario: PropietarioFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'Propietario', propietario);
    }

    public async deshabilitarPropietario(propietario: number) : Promise <any> {
      return await this.putAsync(this.url_api + 'Propietario/Disable/'+propietario, {});
    }

}
