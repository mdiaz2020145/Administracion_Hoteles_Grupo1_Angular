import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { EventosComponent } from './components/eventos/eventos.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'habitaciones/:idHotel', component: HabitacionesComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'eventos/:idHotel', component: EventosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
