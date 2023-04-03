import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { ComponentsModule } from "./components/components.module";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: '',
    redirectTo: 'components/home',
    pathMatch: 'full'
  },
  {
    path: "",
    component: CustomLayoutComponent,
    children: [
      {
        path: "components",
        loadChildren: () =>
          import("./components/components.module").then((m) => m.ComponentsModule),
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      useHash: true,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
