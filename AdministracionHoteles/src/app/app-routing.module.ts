import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';

const routes: Routes = [
 {path: 'inicio', component: InicioComponent},
 {path: 'login', component: LoginComponent},
 {path: 'bienvenida',component: BienvenidaComponent},
 {path: 'habitaciones/:idHotel', component:HabitacionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
