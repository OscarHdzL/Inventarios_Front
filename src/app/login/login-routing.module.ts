import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { LoginComponent } from './login.component';
import { VexRoutes } from '../../@vex/interfaces/vex-route.interface';
import { UpdatePasswordComponent } from './update-password/update-password.component';


const routes: VexRoutes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class LoginRoutingModule {
}
