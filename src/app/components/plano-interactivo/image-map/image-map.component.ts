import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vex-image-map',
  templateUrl: './image-map.component.html',
  styleUrls: ['./image-map.component.scss']
})
export class ImageMapComponent implements OnInit {


  // @Input()
  // src: string

  // @Input()
  // coordinates: ImageMapCoordinate[]

  // @Input()
  // canEdit: boolean

  // @Output('onClick')
  //onClick: EventEmitter<ImageMapCoordinate> = new EventEmitter();

  constructor() { }

  ngOnInit() {

    //console.log("todas -> ", this.coordinates);
    }

  // getCoordinateStyle(coordinate: ImageMapCoordinate): object {
  //   return {
  //     top: `${coordinate.y}px`,
  //     left: `${coordinate.x}px`,
  //     height: `${coordinate.height}px`,
  //     width: `${coordinate.width}px`
  //   };
  // }

  // onAreaClick(coordinate: ImageMapCoordinate) {
  //   //this.onClick.emit(coordinate);
  //   console.log("coord -> ", coordinate);
  //   if (coordinate.clikeado == true) {
  //     for (let i = 0; i < this.coordinates.length; i++) {
  //       this.coordinates[i].clikeado = false;
  //     }
  //   }
  //   else {
  //     for (let i = 0; i < this.coordinates.length; i++) {
  //       this.coordinates[i].clikeado = false;
  //     }
  //     this.coordinates[this.coordinates.findIndex(x => x.name == coordinate.name)].clikeado = !this.coordinates[this.coordinates.findIndex(x => x.name == coordinate.name)].clikeado
  //   }

  // }

  // onAreaContext(e: MouseEvent, coordinate: ImageMapCoordinate) {
  //   if(this.canEdit)
  //   {
  //     if(coordinate) {
  //       console.log('editing')

  //     }
  //     else {
  //       console.log('creating')
  //     }

  //     e.stopPropagation();
  //     return false;
  //   }
  // }

  // onAreaCreate(x: number, y: number): ImageMapCoordinate {
  //   const coordinate = new ImageMapCoordinate({x, y, width: 100, height: 100});
  //   return coordinate
  // }

  // onAreaEdit(coordinate: ImageMapCoordinate): ImageMapCoordinate {
  //   return coordinate;
  // }

}

// export class ImageMapCoordinate {
//   x: number = 0
//   y: number = 0
//   width: number = 100
//   height: number = 100
//   name?: string
//   clikeado?: boolean;

//   constructor(init?: Partial<ImageMapCoordinate>) {
//     Object.assign(this, init);
//   }
// }
