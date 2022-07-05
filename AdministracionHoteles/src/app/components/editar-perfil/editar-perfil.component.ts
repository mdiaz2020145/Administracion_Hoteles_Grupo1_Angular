import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  public usuarioModelGetId: Usuarios;
  public usuarioModelGet: any;
  public token:any;
  public id:string;
  public buscar;
  public validation: Boolean=true;

  constructor(public _servicesUsuario:UsuariosService) {
    this.usuarioModelGetId = new Usuarios('','','','','');
    this.token = _servicesUsuario.obtenerToken();
    this.id=_servicesUsuario.obtenerIdentidad()._id;
  }

  ngOnInit(): void {
    this.getUsuarioId()
  }

  getUsuario(){
    this._servicesUsuario.obtenerUsuario().subscribe(
      response => {
        console.log(response)
        console.log('response.usuario' + response.mensaje)
        if (response.mensaje == 0) {
          console.log("datos vacios")
        } else {
          this.usuarioModelGet = response.mensaje
        }
        console.log(this.usuarioModelGet)
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  getUsuarioId(){
    console.log(this.id)
    this._servicesUsuario.obtenerUsuarioId(this.id, this.token).subscribe({
      next: (response) => {
        this.usuarioModelGetId = response.usuario;
        console.log("console " + this.usuarioModelGetId)
      },
      error: (err: any) => { console.log(err) }
    })
  }

  putCuenta(){
    this._servicesUsuario.editarCuenta(this.usuarioModelGetId, this.token).subscribe(
      response => {
        this.getUsuario()
      },
      error=> {
        console.log(<any>error)
      }
    )
  }
}

