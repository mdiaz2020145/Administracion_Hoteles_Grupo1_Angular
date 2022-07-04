import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuarios } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  providers: [UsuariosService]
})
export class RegistrarComponent implements OnInit {

  public usuarioModel: Usuarios;

  constructor(private _usuarioService: UsuariosService, private _router: Router) {
    this.usuarioModel = new Usuarios('','','','','');
   }

  ngOnInit(): void {
  }

  registrarUsuario(){
    this._usuarioService.registrarUsuario(this.usuarioModel).subscribe(
      (response)=>{
        console.log(response)
        this._router.navigate(["login"])
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

}
