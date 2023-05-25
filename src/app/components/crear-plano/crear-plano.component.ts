import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OficinasModel } from 'src/app/modelos/Inventarios/propietario.model';
import { FileManagerService } from 'src/app/servicios/filemanager.service';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: 'vex-crear-plano',
  templateUrl: './crear-plano.component.html',
  styleUrls: ['./crear-plano.component.scss']
})
export class CrearPlanoComponent implements OnInit, AfterViewInit {

  @ViewChild('myCanvas', {static: false}) canvasRef: ElementRef;
  @ViewChild('bubbleimg', {static: false}) bubble_img: ElementRef;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  primerPunto: boolean = false;
  public listaOficinas: OficinasModel[] = [];
  oficina: OficinasModel = {}
  coordenadas: any = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0
  }
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent)
  {
    this.primerPunto = false;
    this.mostrarEliminar = true;
  }
  mostrarEliminar: boolean = true;
  constructor(private swalService: SwalServices,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private filemanagerService: FileManagerService,
              private inventariosService: InventariosService) { }
  async ngOnInit(): Promise<void> {
    if (window.innerWidth >= 1280) {
      this.listaOficinas = [];
      this.oficina.tblClienteUbicacionId = this.activeRoute.snapshot.params.id;
      let res = await this.inventariosService.obtenerCatalogoUbicacionesId(this.activeRoute.snapshot.params.id)
      console.log("ID ROute ->", res.output[0]);
      this.listaOficinas = res.output[0].relClienteUbicacionOficinas
      this.image = await loadImage(await this.obtenerURLPlano(res.output[0].plano));
    }
    else {
      Swal.fire({
        title: "No es posible visualizar las oficinas desde un celular",
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
  async obtenerURLPlano(token: string){
    let url = await this.filemanagerService.obtenerRutaArchivo(token);
    return url;
  }
  mostrarOficinas(){
    this.mostrarEliminar = false;
    this.primerPunto = false;
    this.coordenadas = {
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0
    }
  }
  ngAfterViewInit() {

    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.ctx.font = "italic 600 20px Comic Sans MS";
    this.ctx.fillStyle = "#FF4418";
    this.ctx.textAlign = "center";
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#093F97";
    this.ctx.drawImage(this.image, 0, 0, (this.image.width*92)/100, (this.image.height*92)/100);
    this.ctx.save();
    console.log("Lista de Oficinas -> ", this.listaOficinas);
    for (let i = 0; i < this.listaOficinas.length; i++) {
      this.ctx.rect(this.listaOficinas[i].ejeX, this.listaOficinas[i].ejeY, this.listaOficinas[i].ancho, this.listaOficinas[i].alto)
      this.ctx.stroke();
      this.ctx.fillText(this.listaOficinas[i].nombre,(this.listaOficinas[i].ejeX + (this.listaOficinas[i].ejeX + this.listaOficinas[i].ancho))/2,(this.listaOficinas[i].ejeY + (this.listaOficinas[i].ejeY + this.listaOficinas[i].alto))/2)
    }
    //console.log("Width -> " + this.image.width + " Height -> " + this.image.height);
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
      if (this.mostrarEliminar == false) {
        console.log("Punto X-> ", event.offsetX);
        console.log("Punto Y-> ", event.offsetY);
        if (this.primerPunto == false) {
          this.primerPunto = true;
          this.coordenadas.x0 = event.offsetX
          this.coordenadas.y0 = event.offsetY
          this.oficina.ejeX = event.offsetX
          this.oficina.ejeY = event.offsetY
          this.swalService.alertaPunto()
        }
        else {
          this.coordenadas.x1 = event.offsetX
          this.coordenadas.y1 = event.offsetY
          //this.swalService.alertaNombre(this.coordenadas);
          Swal.fire({
              title: "Segundo Punto Seleccionado",
              text: "Ingresa el nombre de esta sección",
              input: 'text',
              icon: "info",
              showCancelButton: true
          }).then(async(result) => {
              if (result.value) {
                this.oficina.id = 0;
                this.oficina.nombre = result.value
                this.oficina.ancho = this.coordenadas.x1 - this.coordenadas.x0;
                this.oficina.alto = this.coordenadas.y1 - this.coordenadas.y0;
                console.log("Result: ", this.oficina);
                let res = await this.inventariosService.insertarOficina(this.oficina)
                if (res.exito) {
                  this.ctx.rect(this.oficina.ejeX, this.oficina.ejeY, this.oficina.ancho, this.oficina.alto)
                  this.ctx.stroke();
                  this.ctx.fillText(result.value,(this.coordenadas.x0 + this.coordenadas.x1)/2,(this.coordenadas.y0 + this.coordenadas.y1)/2)
                  this.swalService.alertaPersonalizada(true,res.mensaje)
                  this.mostrarEliminar = true;
                  this.listaOficinas = [];
                  let res2 = await this.inventariosService.obtenerCatalogoUbicacionesId(this.activeRoute.snapshot.params.id)
                  console.log("ID ROute ->", res2.output[0]);
                  this.listaOficinas = res2.output[0].relClienteUbicacionOficinas
                }
                else {
                  this.swalService.alertaPersonalizada(false,res.mensaje)
                }
              }
          });
          this.primerPunto = false
        }
      }
   }
   async eliminarOficina(event: any){
      console.log("Change -> ", event);
      let res = await this.inventariosService.validarInventarioOficina(event.value);
      if (res) {
        Swal.fire({
          title: "Esta oficina tiene inventario ya asignado",
          text: "Seguro que lo quieres eliminar?",
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if (result.isConfirmed) {
              this.listaOficinas.splice(this.listaOficinas.findIndex(x => x.id == event.value),1);
              let res = await this.inventariosService.deshabilitarOficina(event.value);
              if (res.exito) {
                this.ctx.beginPath();
                this.ngAfterViewInit();
                this.swalService.alertaPersonalizada(true, res.mensaje);
              }
              else {
                this.swalService.alertaPersonalizada(false, res.mensaje);
              }
            }
        });
      }
      else {
        Swal.fire({
          title: "Seguro que lo quieres eliminar?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if (result.isConfirmed) {
              this.listaOficinas.splice(this.listaOficinas.findIndex(x => x.id == event.value),1);
              let res = await this.inventariosService.deshabilitarOficina(event.value);
              if (res.exito) {
                this.ctx.beginPath();
                this.ngAfterViewInit();
                this.swalService.alertaPersonalizada(true, res.mensaje);
              }
              else {
                this.swalService.alertaPersonalizada(false, res.mensaje);
              }
            }
        });
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


