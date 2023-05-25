import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfiguracionCategoriaFormModel, ConfiguracionCategoriaModel } from 'src/app/modelos/Inventarios/configuracion-categoria.model';
import { CategoriaProductoModel } from 'src/app/modelos/Inventarios/propietario.model';
import { InventariosService } from 'src/app/servicios/inventarios.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';

@Component({
  selector: 'vex-modal-configuracion-categoria',
  templateUrl: './modal-configuracion-categoria.component.html',
  styleUrls: ['./modal-configuracion-categoria.component.scss']
})
export class ModalConfiguracionCategoriaComponent implements OnInit {
  formConfiguracion: FormGroup;
  configuracionCategoriaModel: ConfiguracionCategoriaFormModel = new ConfiguracionCategoriaFormModel();
  listaConfiguracionCategoria: ConfiguracionCategoriaModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public categoria: CategoriaProductoModel,
    private dialogRef: MatDialogRef<ModalConfiguracionCategoriaComponent>,
    private formBuilder: FormBuilder,
    private swalService: SwalServices,
    private dialog: MatDialog,
    private inventariosService: InventariosService
  ) {
   this.iniciarForm();
  }
  async ngOnInit(){
    this.listaConfiguracionCategoria = await this.obtenerConfiguracion();
  }

  public async obtenerConfiguracion() {
    const respuesta =
      await this.inventariosService.obtenerConfiguracionProductoByCategoria(this.categoria.id);
    return respuesta.exito ? respuesta.output : [];
  }


  public iniciarForm() {
     this.formConfiguracion = this.formBuilder.group({
      descripcion: ["", Validators.required]
    });
  }

  get descripcion() {
    return this.formConfiguracion.get("descripcion");
  }


  public async guardarConfiguracion() {
    this.configuracionCategoriaModel.id = 0;
    this.configuracionCategoriaModel.catCategoriaProductoId = this.categoria.id
    this.configuracionCategoriaModel.descripcion = this.descripcion.value;

    const respuesta = await this.inventariosService.insertarConfiguracionCategoria(this.configuracionCategoriaModel);

    if (respuesta.exito) {
      this.swalService.alertaPersonalizada(true, "Exito");
      this.ngOnInit();
    } else {
      this.swalService.alertaPersonalizada(false, "Error");
    }
  }

  public async eliminarConfiguracion(
    configuracion: ConfiguracionCategoriaModel
  ) {
      if (configuracion.id > 0) {
        let confirmacion = await this.swalService.confirmacion(
          "Atención",
          "¿Esta seguro de eliminar el registro?",
          "Eliminar",
          ""
        );
        if (confirmacion) {
        const respuesta =
          await this.inventariosService.deshabilitarConfiguracionCategoria(
            configuracion.id
          );
        if (respuesta.exito) {
          this.swalService.alertaPersonalizada(true, 'Exito');
          this.ngOnInit();
        } else {
          this.swalService.alertaPersonalizada(false, "Error");
        }
      }
      }

  }


}
