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

}
