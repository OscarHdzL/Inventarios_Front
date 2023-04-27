import { ListaBaseComponent } from './lista-base/lista-base.component';

import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AreasComponent } from './areas/areas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RolesComponent } from './roles/roles.component';
import { AuthGuard } from '../auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { ListaArticulosComponent } from './lista-articulos/lista-articulos.component';
import { ListaGeneralArticulosComponent } from './lista-general-articulos/lista-general-articulos.component';
import { ListaSoftwareComponent } from './lista-software/lista-software.component';
import { ListaPropietariosComponent } from './lista-propietarios/lista-propietarios.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ListaAdquisicionesComponent } from './lista-adquisiciones/lista-adquisiciones.component';
import { ListaFabricantesComponent } from './lista-fabricantes/lista-fabricantes.component';
import { ListaCategoriaProductoComponent } from './lista-categoria-producto/lista-categoria-producto.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { ListaProveedorComponent } from './lista-proveedor/lista-proveedor.component';
import { PlanoInteractivoComponent } from './plano-interactivo/plano-interactivo.component';
import { CrearPlanoComponent } from './crear-plano/crear-plano.component';
import { ListaInventarioComponent } from './lista-inventario/lista-inventario.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lista',
    component: ListaBaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'articulos',
    component: ListaArticulosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'articulos-general',
    component: ListaGeneralArticulosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'software',
    component: ListaSoftwareComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'propietarios',
    component: ListaPropietariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos',
    component: ListaProductosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'adquisiciones',
    component: ListaAdquisicionesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fabricantes',
    component: ListaFabricantesComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'categoria-producto',
    component: ListaCategoriaProductoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cliente',
    component: ListaClienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'proveedor',
    component: ListaProveedorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'plano',
    component: PlanoInteractivoComponent,
  },
  {
    path: 'crear-plano',
    component: CrearPlanoComponent,
  },
  {
    path: 'inventario',
    component: ListaInventarioComponent,
    canActivate: [AuthGuard]
  }

/*   {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'areas',
    component: AreasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewer',
    component: DocViewerComponent,
    canActivate: [AuthGuard]
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
