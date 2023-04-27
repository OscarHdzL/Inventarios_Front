import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { ModalPlanoComponent } from './modal-plano/modal-plano.component';
import { MatDialog } from '@angular/material/dialog';
import { loadImage } from '../crear-plano/crear-plano.component';
@Component({
  selector: 'vex-plano-interactivo',
  templateUrl: './plano-interactivo.component.html',
  styleUrls: ['./plano-interactivo.component.scss']
})
export class PlanoInteractivoComponent implements OnInit {

  constructor(
    private dialog: MatDialog,) { }

  async ngOnInit(): Promise<void> {
    this.image =
    '../../../assets/plano.jpg';
    this.imageTam = await loadImage('../../../assets/plano.jpg')
    console.log("Imagen Tam -> ", this.imageTam.src);

    this.coordinates = [{
      name: 'Comedor',
      x: 426,
      y: 110,
      width: 667,
      height: 389,
      clikeado: false
    },
    {
      name: 'Mesa',
      x: 128,
      y: 135,
      width: 186,
      height: 154,
      clikeado: false
    },]
  }
  canEdit: boolean = true;
  image: string;
  imageTam: HTMLImageElement
  coordinates: ImageMapCoordinate[] = [];
  getCoordinateStyle(coordinate: ImageMapCoordinate): object {
    return {
      top: `${coordinate.y}px`,
      left: `${coordinate.x}px`,
      height: `${coordinate.height}px`,
      width: `${coordinate.width}px`
    };
  }
  onAreaClick(coordinate: ImageMapCoordinate) {
    //this.onClick.emit(coordinate);
    console.log("coord -> ", coordinate);
    if (coordinate.clikeado == true) {
      for (let i = 0; i < this.coordinates.length; i++) {
        this.coordinates[i].clikeado = false;
      }
    }
    else {
      for (let i = 0; i < this.coordinates.length; i++) {
        this.coordinates[i].clikeado = false;
      }
      this.coordinates[this.coordinates.findIndex(x => x.name == coordinate.name)].clikeado = !this.coordinates[this.coordinates.findIndex(x => x.name == coordinate.name)].clikeado
    }
  }
  onAreaContext(e: MouseEvent, coordinate: ImageMapCoordinate) {
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
  onAreaCreate(x: number, y: number): ImageMapCoordinate {
    const coordinate = new ImageMapCoordinate({x, y, width: 100, height: 100});
    return coordinate
  }
  onAreaEdit(coordinate: ImageMapCoordinate): ImageMapCoordinate {
    return coordinate;
  }
}
export class ImageMapCoordinate {
  x: number = 0
  y: number = 0
  width: number = 100
  height: number = 100
  name?: string
  clikeado?: boolean;

  constructor(init?: Partial<ImageMapCoordinate>) {
    Object.assign(this, init);
  }
}

