import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MesaValidacionService } from 'src/app/servicios/mesa-validacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vex-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  form: UntypedFormGroup;
  inputType = 'password';
  visible = false;
  //id: string;
  //idParam: string | null = this.activatedRoute.snapshot.paramMap.get("id");
  currentRoute: string;
  idParam: any

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authService: MesaValidacionService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    // Obtener el id eviando desde la url:
    this.idParam = this.activatedRoute.snapshot.queryParamMap.get('id')||0

    this.form = this.fb.group({
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]]
    });
  }

  async updatePassword() {
    try {
      if(this.form.value.password !== this.form.value.repassword) {// Validar que las contraseñas son las mismas
        this.snackbar.open("Las contraseñas no coinciden.", null, {
          duration: 3000
        });
        
        return
      }

      let respuestaUsuario = await this.authService.GetUserById(this.idParam)

      if(respuestaUsuario.exito === true) {// Obtener al usuario a actualizar
        let newUserPassword = {
          id: respuestaUsuario.output.id,
          nombres: respuestaUsuario.output.nombres,
          apellidos: respuestaUsuario.output.apellidos,
          usuario: respuestaUsuario.output.usuario,
          password: this.form.value.password
        }
        let res = await this.authService.updatePassword(newUserPassword)
  
        if(res.exito == true) {
          console.log(res)
          this.snackbar.open("Contraseña actualizada correctamente.", null, {
            duration: 3000
          });
          this.router.navigate(['/login']);
        } else {
          console.log(res)
          this.snackbar.open("Error", null, {
            duration: 3000
          });
          this.router.navigate(['/login']);
          return
        }
      } else {
        this.snackbar.open("No se encontro algun resgitro con ese email.", null, {
          duration: 3000
        });
      }
    } catch (error) {
      this.snackbar.open(error.error, null, {
        duration: 3000
      });
      return
    }
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
