import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {fromEvent} from 'rxjs';
import { map, tap, switchMap, takeUntil, finalize} from 'rxjs/operators';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: 'vex-crear-plano',
  templateUrl: './crear-plano.component.html',
  styleUrls: ['./crear-plano.component.scss']
})
export class CrearPlanoComponent implements OnInit {

  @ViewChild('myCanvas', {static: false}) canvasRef: ElementRef;
  @ViewChild('bubbleimg', {static: false}) bubble_img: ElementRef;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  primerPunto: boolean = false;
  coordenadas: any = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0
  }
  constructor(private swalService: SwalServices) { }
  async ngOnInit(): Promise<void> {
    this.image = await loadImage('../../../assets/plano.jpg');
  }
  async ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.ctx.drawImage(this.image, 0, 0, (this.image.width*92)/100, (this.image.height*92)/100);
    this.ctx.fillText("Hola",10,10)
    console.log("Width -> " + this.image.width + " Height -> " + this.image.height);
    // this.ctx = this.canvasRef.nativeElement.getContext('2d');
    // const mouseDownStream = fromEvent(this.canvasRef.nativeElement, 'mousedown');
    // const mouseMoveStream = fromEvent(this.canvasRef.nativeElement, 'mousemove');
    // const mouseUpStream = fromEvent(window, 'mouseup');
    // mouseDownStream.pipe(
    //   tap((event: MouseEvent) => {
    //     this.ctx.beginPath();
    //     this.ctx.strokeStyle = 'red';
    //     this.ctx.lineWidth = 5;
    //     this.ctx.lineJoin = 'round';
    //     this.ctx.moveTo(event.offsetX, event.offsetY);
    //   }),
    //   switchMap(() => mouseMoveStream.pipe(
    //     tap((event: MouseEvent) => {
    //       this.ctx.lineTo(event.offsetX, event.offsetY);
    //       this.ctx.stroke();
    //     }),
    //     takeUntil(mouseUpStream),
    //     finalize(() => {
    //       this.ctx.closePath();
    //     })
    //   ))
    // ).subscribe(console.log);
  }

  //  paint(ctx) {

  //    ctx.drawImage(this.bubble_img, 0, 0, 70, 50);
  //    //FrameRate To Repaint
  //    setTimeout(() =>
  //    {
  //        this.paint(ctx);
  //    },
  //    100);
  //  }
   punto(event: any){
      // console.log("Punto X-> ", event.offsetX);
      // console.log("Punto Y-> ", event.offsetY);
      if (this.primerPunto == false) {
        this.primerPunto = true;
        this.coordenadas.x0 = event.offsetX
        this.coordenadas.y0 = event.offsetY

        this.swalService.alertaPunto()
      }
      else {
        this.coordenadas.x1 = event.offsetX
        this.coordenadas.y1 = event.offsetY
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "red";
        this.ctx.rect(this.coordenadas.x0, this.coordenadas.y0, this.coordenadas.x1 - this.coordenadas.x0, this.coordenadas.y1 - this.coordenadas.y0)
        this.ctx.stroke();
        //this.swalService.alertaNombre(this.coordenadas);
        Swal.fire({
            title: "Segundo Punto Seleccionado",
            text: "Ingresa el nombre de esta sección",
            input: 'text',
            icon: "info",
            showCancelButton: true
        }).then(result => {
            if (result.value) {
                this.coordenadas.nombre = result.value
                this.coordenadas.width = this.coordenadas.x1 - this.coordenadas.x0;
                this.coordenadas.height = this.coordenadas.y1 - this.coordenadas.y0;
                console.log("Result: ", this.coordenadas);
                this.swalService.alertaPersonalizada(true,"Seccion Guardada")
            }
        });
        this.primerPunto = false
        // this.coordenadas = {
        //   x0: 0,
        //   y0: 0,
        //   x1: 0,
        //   y1: 0
        // }
      }
   }

}
export async function loadImage(src: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.src = src;
  return new Promise(resolve => {
      image.onload = (ev) => {
          resolve(image);
      }
  });
}


