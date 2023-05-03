import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { ModalPlanoComponent } from './modal-plano/modal-plano.component';
import { MatDialog } from '@angular/material/dialog';
import { loadImage } from '../crear-plano/crear-plano.component';
import { OficinasInteractivasModel } from 'src/app/modelos/Inventarios/propietario.model';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { FileManagerService } from 'src/app/servicios/filemanager.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: 'vex-plano-interactivo',
  templateUrl: './plano-interactivo.component.html',
  styleUrls: ['./plano-interactivo.component.scss']
})
export class PlanoInteractivoComponent implements OnInit {

  canEdit: boolean = true;
  imageTam: HTMLImageElement
  coordinates: OficinasInteractivasModel[] = [];
  cliente: any = {};
  constructor(
    private dialog: MatDialog,
    private inventariosService: InventariosService,
    private filemanagerService: FileManagerService,
    private activeRoute: ActivatedRoute,
    private router: Router,) { }

  async ngOnInit(): Promise<void> {
    if (window.innerWidth >= 1280) {
      let res = await this.inventariosService.obtenerCatalogoUbicacionesId(this.activeRoute.snapshot.params.id);
      this.cliente = res.output[0]
      this.coordinates = res.output[0].relClienteUbicacionOficinas;
      for (let i = 0; i < this.coordinates.length; i++) {
        this.coordinates[i].clikeado = false;
      }
      this.imageTam = await loadImage(await this.obtenerURLPlano(res.output[0].plano));
    }
    else {
      Swal.fire({
        title: "No es posible visualizar el plano desde un celular",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl("components/ubicaciones")
        }
      })
    }
  }
  getCoordinateStyle(coordinate: OficinasInteractivasModel): object {
    return {
      top: `${coordinate.ejeY}px`,
      left: `${coordinate.ejeX}px`,
      height: `${coordinate.alto}px`,
      width: `${coordinate.ancho}px`
    };
  }
  async obtenerURLPlano(token: string){
    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    return url;
  }
  onAreaClick(coordinate: OficinasInteractivasModel) {
    if (coordinate.clikeado == true) {
      for (let i = 0; i < this.coordinates.length; i++) {
        this.coordinates[i].clikeado = false;
      }
    }
    else {
      for (let i = 0; i < this.coordinates.length; i++) {
        this.coordinates[i].clikeado = false;
      }
      this.coordinates[this.coordinates.findIndex(x => x.id == coordinate.id)].clikeado = !this.coordinates[this.coordinates.findIndex(x => x.id == coordinate.id)].clikeado
    }
    this.dialog.open(ModalPlanoComponent,{
      height: 'auto',
      width: '100%',
      autoFocus: true,
      data: coordinate,
      disableClose: true,
      maxWidth: (window.innerWidth >= 1280) ? '80vw': '100vw',
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  onAreaContext(e: MouseEvent, coordinate: OficinasInteractivasModel) {
    if(this.canEdit)
    {
      if(coordinate) {
        console.log('editing')
      }
      else {
        console.log('creating')
      }
      e.stopPropagation();
      return false;
    }
  }
  onAreaCreate(x: number, y: number): OficinasInteractivasModel {
    const coordinate = new OficinasInteractivasModel();
    return coordinate
  }
  onAreaEdit(coordinate: OficinasInteractivasModel): OficinasInteractivasModel {
    return coordinate;
  }
}

