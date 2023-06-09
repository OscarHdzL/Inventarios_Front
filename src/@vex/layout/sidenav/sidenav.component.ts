import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { LayoutService } from '../../services/layout.service';
import { ConfigService } from '../../config/config.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { NavigationLink } from '../../interfaces/navigation-item.interface';
import { PopoverService } from '../../components/popover/popover.service';
import { Observable, of } from 'rxjs';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchModalComponent } from '../../components/search-modal/search-modal.component';
import { SesionModel } from 'src/app/modelos/sesion.model';
import { KeysStorageEnum } from 'src/app/enum/keysStorage.enum';
import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { Modulos } from 'src/app/enum/PermisosPantallas.enum';

@Component({
  selector: 'vex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  sesionUsuarioActual: SesionModel;
  @Input() collapsed: boolean;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(map(config => config.sidenav.imageUrl));
  showCollapsePin$ = this.configService.config$.pipe(map(config => config.sidenav.showCollapsePin));
  userVisible$ = this.configService.config$.pipe(map(config => config.sidenav.user.visible));
  searchVisible$ = this.configService.config$.pipe(map(config => config.sidenav.search.visible));

  userMenuOpen$: Observable<boolean> = of(false);

  items = this.navigationService.items;

  constructor(private navigationService: NavigationService,
              private layoutService: LayoutService,
              private configService: ConfigService,
              private readonly popoverService: PopoverService,
              private readonly dialog: MatDialog,
              private mesaValidacionService: MesaValidacionService
              ) {

                let sesion = localStorage.getItem(KeysStorageEnum.USER);
                this.sesionUsuarioActual = JSON.parse(sesion) as SesionModel;

              }

 async ngOnInit() {

    //this.sesionUsuarioActual.funciones = await this.obtenerFunciones();
    //SE SOBREESCRIBE EL VALOR POR SI HUBO CAMBIOS EN LAS FUNCIONES (SIDEBAR)
    localStorage.setItem(KeysStorageEnum.USER,JSON.stringify(this.sesionUsuarioActual));

    let children = [];
    children.push({
      type: 'dropdown',
      label: 'Catálogos',
      icon: 'mat:list',
      children: [
        {
          type: 'link',
          label: 'Categoría producto',
          route: '/components/categoria-producto',
          icon: 'mat:list',
          routerLinkActiveOptions: { exact: false }
        },
        {
          type: 'link',
          label: 'Clientes',
          route: '/components/cliente',
          icon: 'mat:list',
          routerLinkActiveOptions: { exact: false }
        },
        {
          type: 'link',
          label: 'Fabricante',
          route: '/components/fabricantes',
          icon: 'mat:list',
          routerLinkActiveOptions: { exact: false }
        },
        {
          type: 'link',
          label: 'Propietarios',
          route: '/components/propietarios',
          icon: 'mat:file_copy',
          routerLinkActiveOptions: { exact: true }
        },
        {
          type: 'link',
          label: 'Proveedor',
          route: '/components/proveedor',
          icon: 'mat:file_copy',
          routerLinkActiveOptions: { exact: true }
        }
        ,

        /* {
          type: 'link',
          label: 'Software',
          route: '/components/software',
          icon: 'mat:file_copy',
          routerLinkActiveOptions: { exact: true }
        }, */
        {
          type: 'link',
          label: 'Productos',
          route: '/components/productos',
          icon: 'mat:file_copy',
          routerLinkActiveOptions: { exact: true }
        },
      ]
    });
    children.push({
      type: 'dropdown',
      label: 'Inventario',
      icon: 'mat:assignment',
      children: [
        {
          type: 'link',
          label: 'Productos registrados',
          route: '/components/inventario/registrados',
          icon: 'mat:file_copy',
          routerLinkActiveOptions: { exact: true }
        },
        {
          type: 'link',
          label: 'Productos sin registrar',
          route: '/components/inventario/registrar',
          icon: 'mat:file_copy',
          routerLinkActiveOptions: { exact: true }
        },
        {
          type: 'link',
          label: 'Asignación inventario',
          route: '/components/asignacion-equipo-usuario',
          icon: 'mat:assignment',
          routerLinkActiveOptions: { exact: true }
        }
      ]
    });
    children.push({
      type: 'link',
      label: 'Adquisiciones',
      route: '/components/adquisiciones',
      icon: 'mat:assessment',
      routerLinkActiveOptions: { exact: true }
    });
    children.push({
      type: 'link',
      label: 'Ubicaciones',
      route: '/components/ubicaciones',
      icon: 'mat:map',
      routerLinkActiveOptions: { exact: true }
    });



    children.push({
      type: 'dropdown',
      label: 'Inventario arrendamiento',
      icon: 'mat:list',
      children: [
        {
          type: 'link',
          label: 'Inventario clientes',
          route: '/components/asignacion-inventario-cliente',
          icon: 'mat:assignment',
          routerLinkActiveOptions: { exact: true }
        },
        {
          type: 'link',
          label: 'Asignación inventario arrendamiento',
          route: '/components/asignacion-inventario-empleado',
          icon: 'mat:assignment',
          routerLinkActiveOptions: { exact: true }
        }
      ]
    });

   /*  children.push({
      type: 'link',
      label: 'Histórico inventario',
      route: '/components/historico-inventario',
      icon: 'mat:list',
      routerLinkActiveOptions: { exact: true }
    });
 */

/*
    children.push({
      type: 'link',
      label: 'Inventario clientes',
      route: '/components/asignacion-inventario-cliente',
      icon: 'mat:assignment',
      routerLinkActiveOptions: { exact: true }
    });
 */
/*     children.push({
      type: 'link',
      label: 'Asignación inventario arrendamiento',
      route: '/components/asignacion-inventario-empleado',
      icon: 'mat:assignment',
      routerLinkActiveOptions: { exact: true }
    }); */


/*
    children.push({
      type: 'link',
      label: 'Asignación inventario',
      route: '/components/asignacion-equipo-usuario',
      icon: 'mat:assignment',
      routerLinkActiveOptions: { exact: true }
    }); */


     /* let menu = this.sesionUsuarioActual.funciones.filter((x)=> x.modulo == 'Sidebar' && x.activo == true);


     menu.forEach((x)=>{

      switch(x.funcion){
        case Modulos.MESA_VALIDACION:
        children.push({
          type: 'link',
          label: 'Mesa validación',
          route: '/components/home',
          icon: 'mat:file_copy',
          routerLinkActiveOptions: { exact: true }
        });
        break;

        case Modulos.CLIENTES:
        children.push({
          type: 'link',
          label: 'Clientes',
          route: '/components/clientes',
          icon: 'mat:list',
          routerLinkActiveOptions: { exact: true }
        });
        break;

        case Modulos.AREAS:
        children.push({
          type: 'link',
          label: 'Áreas',
          route: '/components/areas',
          icon: 'mat:list',
          routerLinkActiveOptions: { exact: true }
        });
        break;

        case Modulos.ROLES:
        children.push({
          type: 'link',
          label: 'Roles',
          route: '/components/roles',
          icon: 'mat:list',
          routerLinkActiveOptions: { exact: true }
        });
        break;

        case Modulos.USUARIOS:
        children.push({
          type: 'link',
          label: 'Usuarios',
          route: '/components/usuarios',
          icon: 'mat:list',
          routerLinkActiveOptions: { exact: true }
        });
        break;
      }
     }); */

     this.navigationService.items = [
      {
        type: 'subheading',
        label: 'Contenido',
        children: children
      }];



    this.items = this.navigationService.items;

        /* if(this.sesionUsuarioActual.administrador){
      this.navigationService.items = [
        {
          type: 'subheading',
          label: 'Contenido',
          children: [
            {
              type: 'link',
              label: 'Mesa validación',
              route: '/components/home',
              icon: 'mat:file_copy',
              routerLinkActiveOptions: { exact: true }
            },
            {
              type: 'link',
              label: 'Clientes',
              route: '/components/clientes',
              icon: 'mat:list',
              routerLinkActiveOptions: { exact: true }
            },
            {
              type: 'link',
              label: 'Áreas',
              route: '/components/areas',
              icon: 'mat:list',
              routerLinkActiveOptions: { exact: true }
            },
            {
              type: 'link',
              label: 'Roles',
              route: '/components/roles',
              icon: 'mat:list',
              routerLinkActiveOptions: { exact: true }
            },
            {
              type: 'link',
              label: 'Usuarios',
              route: '/components/usuarios',
              icon: 'mat:list',
              routerLinkActiveOptions: { exact: true }
            }

          ]
        }
      ];
    } else {
      this.navigationService.items = [
        {
          type: 'subheading',
          label: 'Contenido',
          children: [
            {
              type: 'link',
              label: 'Mesa validación',
              route: '/components/home',
              icon: 'mat:file_copy',
              routerLinkActiveOptions: { exact: true }
            },
            {
              type: 'link',
              label: 'Clientes',
              route: '/components/clientes',
              icon: 'mat:list',
              routerLinkActiveOptions: { exact: true }
            }
          ]
        }
      ];
    } */
  }
  //METODO PARA OBTENER LAS FUNCIONES DEL USUARIO, SE EJECUTA EN ESTE COMPONENTE PARA QUE SE EJECUTE LA ACTUALIZACION DE FUNCIONES SIN NECESIDAD DE CERRAR SESION
  public async obtenerFunciones(){
    const respuesta = await this.mesaValidacionService.obtenerFuncionesUsuario(this.sesionUsuarioActual.id);
    return respuesta.exito ? respuesta.respuesta : [];
  }


  collapseOpenSidenav() {
    this.layoutService.collapseOpenSidenav();
  }

  collapseCloseSidenav() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    this.collapsed ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
  }

  trackByRoute(index: number, item: NavigationLink): string {
    return item.route;
  }

  openProfileMenu(origin: HTMLDivElement): void {
    this.userMenuOpen$ = of(
      this.popoverService.open({
        content: UserMenuComponent,
        origin,
        offsetY: -8,
        width: origin.clientWidth,
        position: [
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom'
          }
        ]
      })
    ).pipe(
      switchMap(popoverRef => popoverRef.afterClosed$.pipe(map(() => false))),
      startWith(true),
    );
  }

  openSearch(): void {
    this.dialog.open(SearchModalComponent, {
      panelClass: 'vex-dialog-glossy',
      width: '100%',
      maxWidth: '600px'
    });
  }
}
