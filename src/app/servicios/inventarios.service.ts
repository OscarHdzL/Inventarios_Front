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
      return await this.getAsync(this.url_api + 'Producto/seleccionar/todos');
    }

    public async insertarProducto(usuario: ProductoFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Producto/agregar', usuario);
    }

    public async actualizarProducto(usuario: ProductoFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'Producto', usuario);
    }

    public async deshabilitarProducto(usuario: number) : Promise <any> {
      return await this.putAsync(this.url_api + 'Productos/Disable/'+usuario, {});
    }


    /* ADQUISICIONES */
    public async obtenerCatalogoAdquisiciones() : Promise <any> {
      return await this.getAsync(this.url_api + 'Adquisicion');
    }

    public async insertarAdquisicion(usuario: AdquisicionFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Adquisicion/agregar', usuario);
    }

    public async insertarProdcutoAdquisicion(usuario: AdquisicionFormModel[]) : Promise <any> {
      return await this.postAsync(this.url_api + 'Adquisicion/agregar/detalle', usuario);
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
      return await this.getAsync(this.url_api + 'Propietario/Get');
    }

    public async insertarPropietario(propietario: PropietarioFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Propietario/Add', propietario);
    }

    public async actualizarPropietario(propietario: PropietarioFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'Propietario/Update', propietario);
    }

    public async deshabilitarPropietario(propietario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Propietario/Disable?id='+propietario);
    }
    /* FABRICANTES */
    public async obtenerCatalogoFabricantes() : Promise <any> {
      return await this.getAsync(this.url_api + 'Fabricante/Get');
    }

    public async insertarFabricante(propietario: PropietarioFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Fabricante/Add', propietario);
    }

    public async actualizarFabricante(propietario: PropietarioFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'Fabricante/Update', propietario);
    }

    public async deshabilitarFabricante(propietario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Fabricante/Disable?id='+propietario);
    }
    /* CategoriaProducto */
    public async obtenerCatalogoCategoriaProducto() : Promise <any> {
      return await this.getAsync(this.url_api + 'CategoriaProducto/Get');
    }

    public async insertarCategoriaProducto(propietario: PropietarioFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'CategoriaProducto/Add', propietario);
    }

    public async actualizarCategoriaProducto(propietario: PropietarioFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'CategoriaProducto/Update', propietario);
    }

    public async deshabilitarCategoriaProducto(propietario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'CategoriaProducto/Disable?id='+propietario);
    }
    /* CLIENTES */
    public async obtenerCatalogoClientes() : Promise <any> {
      return await this.getAsync(this.url_api + 'api/Cliente/Get');
    }

    public async insertarCliente(propietario: PropietarioFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'api/Cliente/Add', propietario);
    }

    public async actualizarCliente(propietario: PropietarioFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'api/Cliente/Update', propietario);
    }

    public async deshabilitarCliente(propietario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'api/Cliente/Disable?id='+propietario);
    }
    /* Proveedor */
    public async obtenerCatalogoProveedores() : Promise <any> {
      return await this.getAsync(this.url_api + 'api/Proveedor/Get');
    }

    public async insertarProveedor(propietario: PropietarioFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'api/Proveedor/Add', propietario);
    }

    public async actualizarProveedor(propietario: PropietarioFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'api/Proveedor/Update', propietario);
    }

    public async deshabilitarProveedor(propietario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'api/Proveedor/Disable?id='+propietario);
    }


    /* CATEGORIA PRODUCTO */
    public async obtenerCategoriasProducto() : Promise <any> {
      return await this.getAsync(this.url_api + 'CategoriaProducto/Get');
    }

}
