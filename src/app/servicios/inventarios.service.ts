import { PartidaFormModel } from './../modelos/partidas.model';
import { ConfiguracionEndpointsService } from './configuracion-endpoints.service';
import { NavigationService } from '../../@vex/services/navigation.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloFormModel } from '../modelos/Inventarios/articulo.model';
import { SoftwareFormModel } from '../modelos/Inventarios/software.model';
import { PropietarioFormModel } from '../modelos/Inventarios/propietario.model';
import { CaracteristicaProductoFormModel_, ProductoFormModel } from '../modelos/Inventarios/producto.model';
import { AdquisicionFormModel, RelAdquisicionDetalle } from '../modelos/Inventarios/adquisicion.model';
import { AccesorioInventario, InventarioFormModel } from '../modelos/Inventarios/inventario.model';


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


    public async obtenerCaracteristicasProducto(idProducto: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'Producto/seleccionarCaracteristicas/' + idProducto);
    }


    public async insertarProducto(prod: ProductoFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Producto/agregar', prod);
    }

    public async insertarCaracteristicaProducto(prod: CaracteristicaProductoFormModel_) : Promise <any> {
      return await this.postAsync(this.url_api + 'Producto/agregar/caracteristica', prod);
    }

    public async actualizarProducto(prod: ProductoFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'Producto/editar', prod);
    }

    public async deshabilitarProducto(prod: number) : Promise <any> {
      return await this.putAsync(this.url_api + 'Producto/eliminar?id='+prod, {});
    }

    public async deshabilitarCaracteristicaProducto(prod: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Producto/eliminar/caracteristica?id='+prod);
    }

    /* ADQUISICIONES */
    public async obtenerAdquisicion(id: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'Adquisicion/seleccionar?id='+ id);
    }
    public async obtenerCatalogoAdquisiciones() : Promise <any> {
      return await this.getAsync(this.url_api + 'Adquisicion/seleccionar');
    }

    public async obtenerProductosAdquisiciones(id: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'Adquisicion/seleccionar/productos?id=' + id);
    }

    public async insertarAdquisicion(usuario: AdquisicionFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Adquisicion/agregar', usuario);
    }

    public async insertarAdquisicionDetalle(usuario: RelAdquisicionDetalle) : Promise <any> {
      return await this.postAsync(this.url_api + 'Adquisicion/agregar/detalle', usuario);
    }

    public async actualizarAdquisicion(usuario: AdquisicionFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'Adquisicion/editar', usuario);
    }

    public async actualizarAdquisicionDetalle(usuario: RelAdquisicionDetalle) : Promise <any> {
      return await this.putAsync(this.url_api + 'Adquisicion/editar/detalle', usuario);
    }

    public async deshabilitarAdquisicion(usuario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Adquisicion/eliminar?id='+usuario);
    }

    public async deshabilitarAdquisicionDetalle(usuario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Adquisicion/eliminar/detalle?id='+usuario);
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


     /* Inventario */
     public async obtenerInventarios() : Promise <any> {
      return await this.getAsync(this.url_api + 'Inventario/seleccionar/todos');
    }

    public async obtenerInventarioAccesorios(id: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'Inventario/seleccionarAccesorios/' + id);
    }


    public async obtenerEstatusInventario() : Promise <any> {
      return await this.getAsync(this.url_api + 'api/EstatusInventario/Get');
    }

    public async obtenerInventarioId(id: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'Inventario/seleccionar/' + id);
    }

    public async insertarInventario(Inventario: InventarioFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Inventario/agregar', Inventario);
    }

    public async insertarAccesorioInventario(Inventario: AccesorioInventario[]) : Promise <any> {
      return await this.postAsync(this.url_api + 'Inventario/agregar/accesorio', Inventario);
    }

    public async actualizarInventario(Inventario: InventarioFormModel[]) : Promise <any> {
      return await this.putAsync(this.url_api + 'Inventario/editar', Inventario);
    }

    public async deshabilitarInventario(Inventario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Inventario/eliminar?id='+Inventario);
    }

    public async deshabilitarAccesorioInventario(Inventario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Inventario/eliminar/accesorio?id='+Inventario);
    }


}
