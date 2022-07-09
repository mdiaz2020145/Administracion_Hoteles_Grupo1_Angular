import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { Buscar } from './components/pipes/buscar-hotel.pipe';
import { InicoAdminComponent } from './components/inico-admin/inico-admin.component';
import { InicoUsuarioComponent } from './components/inico-usuario/inico-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    LoginComponent,
    BienvenidaComponent,
    EventosComponent,
    HabitacionesComponent,
    EditarPerfilComponent,
    RegistrarComponent,
    ServiciosComponent,
    Buscar,
    InicoAdminComponent,
    InicoUsuarioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
