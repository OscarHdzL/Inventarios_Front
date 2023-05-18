import { PartidaFormModel } from './../modelos/partidas.model';
import { ConfiguracionEndpointsService } from './configuracion-endpoints.service';
import { NavigationService } from '../../@vex/services/navigation.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloFormModel } from '../modelos/Inventarios/articulo.model';
import { SoftwareFormModel } from '../modelos/Inventarios/software.model';
import { PropietarioFormModel, UbicacionFormModel } from '../modelos/Inventarios/propietario.model';
import { CaracteristicaProductoFormModel_, ProductoFormModel } from '../modelos/Inventarios/producto.model';
import { AdquisicionFormModel, RelAdquisicionDetalle } from '../modelos/Inventarios/adquisicion.model';
import { AccesorioInventario, InventarioFormModel } from '../modelos/Inventarios/inventario.model';
import { ArchivoEmpleadoInventario, EmpleadoInventarioArrendamientoFormModel, InventarioArrendamientoAgrupadoModel, InventarioArrendamientoFormModel } from '../modelos/Inventarios/inventario-arrendamiento.model';
import { ArchivoUsuarioInventario, UsuarioInventarioContenedorModel, UsuarioInventarioFormModel } from '../modelos/Inventarios/usuario-inventario.model';


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
    public async obtenerImagenesProductos(id:number): Promise <any> {
      return await this.getAsync(this.url_api + 'Inventario/seleccionarImagenes/' + id);
    }
    public async insertarImagenesProductos(usuario: any) : Promise <any> {
      return await this.postAsync(this.url_api + 'Inventario/agregar/imagen', usuario);
    }
    public async deshabilitarImagenesProductos(id:number, idUsuario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Inventario/eliminar/imagen?id='+ id +'&idUsuario='+idUsuario);
    }

    /* ADQUISICIONES */
    public async obtenerAdquisicion(id: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'Adquisicion/seleccionar?id='+ id);
    }
    public obtenerPlantillaMasiva(id: number) : any {
      return this.url_api + 'CargaMasiva/ObtenerPlantilla?num='+ id;
    }

    public async insertarAdquisicionCargaMasiva(usuario: any) : Promise <any> {
      return await this.postAsync(this.url_api + 'CargaMasiva/CargarPlantilla', usuario);
    }
    public async insertarAdjuntos(usuario: any) : Promise <any> {
      return await this.putAsync(this.url_api + 'CargaMasiva/Adjuntos', usuario);
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

    /* ubicaciones */
    public async obtenerCatalogoUbicaciones() : Promise <any> {
      return await this.getAsync(this.url_api + 'Ubicacion/seleccionar');
    }
    public async obtenerCatalogoUbicacionesId(id: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'Ubicacion/seleccionar?id='+id);
    }

    public async insertarUbicacion(ubicacion: UbicacionFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Ubicacion/agregar', ubicacion);
    }

    public async actualizarUbicacion(ubicacion: UbicacionFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'Ubicacion/editar', ubicacion);
    }

    public async deshabilitarUbicacion(ubicacion: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Ubicacion/eliminar?id='+ubicacion);
    }
    /* ubicaciones Inventario */
    public async obtenerCatalogoInventarioUbicacionFiltro(): Promise <any> {
      return await this.getAsync(this.url_api + 'InventarioUbicacion/filtro');
    }
    public async obtenerInventarioUbicacionId(id: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'InventarioUbicacion/seleccionar?id='+id);
    }
    public async obtenerInventarioUbicacionCaracteristicasId(id: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'InventarioUbicacion/caracteristicas?id='+id);
    }
    public async insertarInventarioUbicacion(oficina: UbicacionFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'InventarioUbicacion/agregar', oficina);
    }
    public async deshabilitarInventarioUbicacion(ubicacion: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'InventarioUbicacion/eliminar?id='+ubicacion);
    }
    /* Oficinas */
    public async insertarOficina(ubicacion: UbicacionFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'Ubicacion/agregar/oficina', ubicacion);
    }

    public async actualizarOficina(ubicacion: UbicacionFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'Ubicacion/editar/oficina', ubicacion);
    }

    public async deshabilitarOficina(ubicacion: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Ubicacion/eliminar/oficina?id='+ubicacion);
    }
    public async validarInventarioOficina(id: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'Ubicacion/validaasignadosoficina?id='+id);
    }


    /* CATEGORIA PRODUCTO */
    public async obtenerCategoriasProducto() : Promise <any> {
      return await this.getAsync(this.url_api + 'CategoriaProducto/Get');
    }


     /* Inventario */
     public async obtenerInventarios() : Promise <any> {
      return await this.getAsync(this.url_api + 'Inventario/seleccionar/todos');
    }
    /* Inventario */
    public async obtenerInventariosAsignados(bol: boolean) : Promise <any> {
      return await this.getAsync(this.url_api + 'Inventario/seleccionar/todos?registrados='+bol);
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

    public async deshabilitarInventario(Inventario: number, usuario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Inventario/eliminar?id='+Inventario+'&idUsuario='+usuario);
    }

    public async deshabilitarAccesorioInventario(Inventario: number, usuario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'Inventario/eliminar/accesorio?id='+Inventario+'&idUsuario='+usuario);
    }



    //Configuracion
    public async obtenerConfiguracionProductoByCategoria(idCategoria: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'ConfiguracionProducto/GetByCategory?id=' + idCategoria);
    }



    //ARRENDAMIENTO

    public async obtenerInventarioArrendamientoAgrupado() : Promise <any> {
      return await this.getAsync(this.url_api + 'InventarioArrendamiento/seleccionar/todosAgrupado');
    }

    public async obtenerInventarioProductosDisponibles() : Promise <any> {
      return await this.getAsync(this.url_api + 'InventarioArrendamiento/seleccionarInventarioProductosDisponibles');
    }

    public async obtenerAsignacionEmpleadoInventarioArrendamiento(idrelempleadoinventarioarrendamiento: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'InventarioArrendamiento/seleccionarAsignacion?idrelempleadoinventarioarrendamiento=' + idrelempleadoinventarioarrendamiento);
    }

    public async obtenerAsignacionesInventarioArrendamiento(idCliente: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'InventarioArrendamiento/seleccionarAsignacionTodos?idCliente=' + idCliente);
    }

    public async obtenerInventarioArrendamientoDisponibleCliente(idCliente: number) : Promise <any> {
      return await this.getAsync(this.url_api + 'InventarioArrendamiento/seleccionarInventarioArrendamientoDisponible?idCliente=' + idCliente);
    }

    public async insertarInventarioArrendamiento(Inventario: InventarioArrendamientoFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'InventarioArrendamiento/agregarInventarioCliente', Inventario);
    }

    public async insertarAsignacionInventarioArrendamiento(asignacion: EmpleadoInventarioArrendamientoFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'InventarioArrendamiento/agregarAsignacion', asignacion);
    }


    public async editarAsignacionInventarioArrendamiento(asignacion: EmpleadoInventarioArrendamientoFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'InventarioArrendamiento/editarResponsivaAsignacion', asignacion);
    }

    public async eliminarAsignacionInventarioArrendamiento(Inventario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'InventarioArrendamiento/eliminarAsignacion?id='+Inventario);
    }


    public async insertarArchivosAsignacionInventarioArrendamiento(archivos: ArchivoEmpleadoInventario[]) : Promise <any> {
      return await this.postAsync(this.url_api + 'InventarioArrendamiento/agregarArchivosAsignacion', archivos);
    }

    public async eliminarArchivoAsignacionInventarioArrendamiento(idArchivo: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'InventarioArrendamiento/eliminarArchivoAsignacion?id='+idArchivo);
    }

    public async obtenerUrlCartaResponsivaArrendamiento(idrelempleadoinventarioarrendamiento) : Promise <any> {
      return this.url_api + 'api/CartaResponsivaWord/GenerarCartaArrendamiento?id=' + idrelempleadoinventarioarrendamiento;
    }


    // USUARIOS
    public async obtenerUsuarios() : Promise <any> {
      return await this.getAsync(this.url_api + 'Usuario/seleccionar');
    }

    //ASIGNACION USUARIO INVENTARIO
    public async insertarAsignacionUsuarioInventario(asignacion: UsuarioInventarioFormModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'UsuarioInventario/agregar', asignacion);
    }

    public async obtenerAsignacionesInventario() : Promise <any> {
      return await this.getAsync(this.url_api + 'UsuarioInventario/seleccionarAsignacionTodos');
    }

    public async obtenerUrlCartaResponsiva(idRelUsuario) : Promise <any> {
      return this.url_api + 'api/CartaResponsivaWord/GenerarCartaUsuario?id=' + idRelUsuario;
    }

    public async obtenerAsignacionInventario(idrelusuarioinventario) : Promise <any> {
      return await this.getAsync(this.url_api + 'UsuarioInventario/seleccionarAsignacion?idrelusuarioinventario=' + idrelusuarioinventario);
    }

    public async obtenerInventarioProductosDisponibles_UsuarioInventario() : Promise <any> {
      return await this.getAsync(this.url_api + 'UsuarioInventario/seleccionarInventarioProductosDisponibles');
    }

    public async eliminarAsignacionInventario(Inventario: number, idUsuario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'UsuarioInventario/eliminar?id='+Inventario+"&idUsuario="+idUsuario);
    }

    public async insertarArchivosAsignacionInventario(archivos: ArchivoUsuarioInventario[]) : Promise <any> {
      return await this.postAsync(this.url_api + 'UsuarioInventario/agregar/archivos', archivos);
    }

    public async editarAsignacionInventario(asignacion: UsuarioInventarioFormModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'UsuarioInventario/editarResponsivaAsignacion', asignacion);
    }



    public async obtenerContenedoresAsignacionInventario(idrelusuarioinventario) : Promise <any> {
      return await this.getAsync(this.url_api + 'UsuarioInventario/seleccionarContenedores?idrelusuarioinventario=' + idrelusuarioinventario);
    }

    public async insertaContenedorAsignacionInventario(contenedor: UsuarioInventarioContenedorModel) : Promise <any> {
      return await this.postAsync(this.url_api + 'UsuarioInventario/agregarContenedor', contenedor);
    }

    public async editarContenedorAsignacionInventario(contenedor: UsuarioInventarioContenedorModel) : Promise <any> {
      return await this.putAsync(this.url_api + 'UsuarioInventario/editarContenedor', contenedor);
    }

    public async eliminarImagenContenedorAsignacionInventario(Inventario: number, idUsuario: number) : Promise <any> {
      return await this.deleteAsync(this.url_api + 'UsuarioInventario/eliminarContenedor?id='+Inventario+'&idUsuario='+idUsuario);
    }



    // LDAP
    public async obtenerUsuarioLDAP(idCliente: number, name: string) : Promise <any> {
      return await this.getAsync(this.url_api + 'api/LDAP/ListadoUsuarioPorCliente?id='+ idCliente + '&name=' + name);
    }

    public async obtenerUsuarioLDAP_PM(name: string) : Promise <any> {
      return await this.getAsync(this.url_api + 'api/LDAP/ListadoUsuariosPM?name=' + name);
    }

    // AUDITORIA
    public async obtenerAuditoria(numeroSerie: string) : Promise <any> {
      return await this.getAsync(this.url_api + 'Auditoria/inventario?NumSerie=' + numeroSerie);
    }

   // HISTORIOC
   public async obtenerHistoricoInventario(numeroSerie: string) : Promise <any> {
    return await this.getAsync(this.url_api + 'HistoricoInventario/Get?numeroSerie=' + numeroSerie);
  }

}
