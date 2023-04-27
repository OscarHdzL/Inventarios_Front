import {MatChipList, MatChipsModule} from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { TabHistoricoComponent } from './home/tab-historico/tab-historico.component';
import { TabNuevaVersionComponent } from './home/tab-nueva-version/tab-nueva-version.component';
import { ModalDocInfoComponent } from './home/modal-doc-info/modal-doc-info.component';
import { ModalForoComponent } from './home/modal-foro/modal-foro.component';
import {MatListModule} from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ClientesComponent } from './clientes/clientes.component';
import { ModalClienteComponent } from './clientes/modal-cliente/modal-cliente.component';
import { PartidasComponent } from './clientes/partidas/partidas.component';
import { ModalPartidaComponent } from './clientes/partidas/modal-partida/modal-partida.component';
import { ProcesosComponent } from './clientes/procesos/procesos.component';
import { ModalProcesoComponent } from './clientes/procesos/modal-proceso/modal-proceso.component';
import { PeriodosComponent } from './clientes/periodos/periodos.component';
import { ModalPeriodoComponent } from './clientes/periodos/modal-periodo/modal-periodo.component';
import { DocumentosComponent } from './clientes/documentos/documentos.component';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { ProyectosComponent } from './clientes/proyectos/proyectos.component';
import { ModalProyectoComponent } from './clientes/proyectos/modal-proyecto/modal-proyecto.component';
import { AreasComponent } from './areas/areas.component';
import { ModalAreaComponent } from './areas/modal-area/modal-area.component';
import { RolesComponent } from './roles/roles.component';
import { ModalRolComponent } from './roles/modal-rol/modal-rol.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUsuarioComponent } from './usuarios/modal-usuario/modal-usuario.component';
import { ProcesoUsuariosComponent } from './clientes/proceso-usuarios/proceso-usuarios.component';
import { ModalProcesoUsuarioComponent } from './clientes/proceso-usuarios/modal-proceso-usuario/modal-proceso-usuario.component';
import { ModalMovimimientosProyectoComponent } from './home/modal-movimimientos-proyecto/modal-movimimientos-proyecto.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ModalResponsablePartidaComponent } from './clientes/partidas/modal-responsable-partida/modal-responsable-partida.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalFuncionUsuarioComponent } from './usuarios/modal-funcion-usuario/modal-funcion-usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListaBaseComponent } from './lista-base/lista-base.component';
import { ModalBaseComponent } from './lista-base/modal-base/modal-base.component';
import { ListaGeneralArticulosComponent } from './lista-general-articulos/lista-general-articulos.component';
import { ListaArticulosComponent } from './lista-articulos/lista-articulos.component';
import { ModalArticuloComponent } from './lista-articulos/modal-articulo/modal-articulo.component';
import { ModalCaracteristicaComponent } from './lista-articulos/modal-caracteristica/modal-caracteristica.component';
import { ModalDocumentoComponent } from './clientes/documentos/modal-documento/modal-documento.component';
import { ModalDocumentoArticuloComponent } from './lista-articulos/modal-documento-articulo/modal-documento-articulo.component';
import { ModalGraficasArticuloComponent } from './lista-articulos/modal-graficas-articulo/modal-graficas-articulo.component';
import { ListaSoftwareComponent } from './lista-software/lista-software.component';
import { ModalSoftwareComponent } from './lista-software/modal-software/modal-software.component';
import { ListaPropietariosComponent } from './lista-propietarios/lista-propietarios.component';
import { ModalPropietarioComponent } from './lista-propietarios/modal-propietario/modal-propietario.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ModalProductoComponent } from './lista-productos/modal-producto/modal-producto.component';

import { ListaFabricantesComponent } from './lista-fabricantes/lista-fabricantes.component';
import { ModalFabricanteComponent } from './lista-fabricantes/modal-fabricante/modal-fabricante.component';
import { ModalCaracteristicaProductoComponent } from './lista-productos/modal-caracteristica-producto/modal-caracteristica-producto.component';
import { ListaAdquisicionesComponent } from './lista-adquisiciones/lista-adquisiciones.component';
import { ModalAdquisicionComponent } from './lista-adquisiciones/modal-adquisicion/modal-adquisicion.component';
import { ModalProductoAdquisicionComponent } from './lista-adquisiciones/modal-producto-adquisicion/modal-producto-adquisicion.component';
import { ListaCategoriaProductoComponent } from './lista-categoria-producto/lista-categoria-producto.component';
import { ModalCategoriaProductoComponent } from './lista-categoria-producto/modal-categoria-producto/modal-categoria-producto.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { ModalClienteCatalogoComponent } from './lista-cliente/modal-cliente-catalogo/modal-cliente-catalogo.component';
import { ListaProveedorComponent } from './lista-proveedor/lista-proveedor.component';
import { ModalProveedorComponent } from './lista-proveedor/modal-proveedor/modal-proveedor.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { PlanoInteractivoComponent } from './plano-interactivo/plano-interactivo.component';
import { ModalPlanoComponent } from './plano-interactivo/modal-plano/modal-plano.component';
import { ImageMapComponent } from './plano-interactivo/image-map/image-map.component';
import { CrearPlanoComponent } from './crear-plano/crear-plano.component';
import { ListaInventarioComponent } from './lista-inventario/lista-inventario.component';
import { ModalInventarioComponent } from './lista-inventario/modal-inventario/modal-inventario.component';
import { ModalAsignarInventarioComponent } from './lista-inventario/modal-asignar-inventario/modal-asignar-inventario.component';

@NgModule({
  declarations: [
    HomeComponent,
    ModalDocInfoComponent,
    TabHistoricoComponent,
    TabNuevaVersionComponent,
    ModalForoComponent,
    ClientesComponent,
    ModalClienteComponent,
    PartidasComponent,
    ModalPartidaComponent,
    ProcesosComponent,
    ModalProcesoComponent,
    PeriodosComponent,
    ModalPeriodoComponent,
    DocumentosComponent,
    ModalDocumentoComponent,
    ProyectosComponent,
    ModalProyectoComponent,
    AreasComponent,
    ModalAreaComponent,
    RolesComponent,
    ModalRolComponent,
    UsuariosComponent,
    ModalUsuarioComponent,
    ProcesoUsuariosComponent,
    ModalProcesoUsuarioComponent,
    ModalMovimimientosProyectoComponent,
    DocViewerComponent,
    ModalResponsablePartidaComponent,
    ModalFuncionUsuarioComponent,
    InicioComponent,
    ListaBaseComponent,
    ModalBaseComponent,
    ListaGeneralArticulosComponent,
    ListaArticulosComponent,
    ModalArticuloComponent,
    ModalCaracteristicaComponent,
    ModalDocumentoArticuloComponent,
    ModalGraficasArticuloComponent,
    ListaSoftwareComponent,
    ModalSoftwareComponent,
    ListaPropietariosComponent,
    ModalPropietarioComponent,
    ListaProductosComponent,
    ModalProductoComponent,

    ListaFabricantesComponent,
    ModalFabricanteComponent,
    ModalCaracteristicaProductoComponent,
    ListaAdquisicionesComponent,
    ModalAdquisicionComponent,
    ModalProductoAdquisicionComponent,
    ListaCategoriaProductoComponent,
    ModalCategoriaProductoComponent,
    ListaClienteComponent,
    ModalClienteCatalogoComponent,
    ListaProveedorComponent,
    ModalProveedorComponent,
    PlanoInteractivoComponent,
    ModalPlanoComponent,
    ImageMapComponent,
    CrearPlanoComponent,
    ListaInventarioComponent,
    ModalInventarioComponent,
    ModalAsignarInventarioComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    PageLayoutModule,
    BreadcrumbsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatExpansionModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    NgxDocViewerModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    NgxCurrencyModule,
    MatChipsModule,


  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
  ]
})
export class ComponentsModule { }
