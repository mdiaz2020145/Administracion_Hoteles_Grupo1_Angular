import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss'],
  providers: [UsuariosService]
})
export class BienvenidaComponent implements OnInit {

  constructor(public _usuarioService: UsuariosService) { }

  ngOnInit(): void {
  }

  redireccionamiento() {
    if (this._usuarioService.obtenerIdentidad() == undefined) {
      return 0;
    } else if (this._usuarioService.obtenerIdentidad().rol === "ROL_USUARIO") {
      return 1;
    } else if (this._usuarioService.obtenerIdentidad().rol === 'ROL_ADMIN' || this._usuarioService.obtenerIdentidad().rol === 'ROL_SUPERADMIN') {
      return 2;
    }
  }
}
