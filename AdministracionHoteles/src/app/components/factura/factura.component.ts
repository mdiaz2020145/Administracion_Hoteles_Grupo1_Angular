import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from 'src/app/models/factura.model';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  providers: [FacturaService]
})
export class FacturaComponent implements OnInit {

  facturaModelGet: Factura;
  facturaModelPost: Factura
  public token: any;
  public validation: Boolean = true;
  public idUsuario: any;

  constructor(public _facturaServices: FacturaService, public _activatedRoute: ActivatedRoute) {
    this.facturaModelGet = new Factura(
      [{idHabitacion:''}],
      [{idEvento:''}],
      [{idServicio:''}],
      0,0,0,0,""
      )

      this.facturaModelPost = new Factura(
        [{idHabitacion:''}],
        [{idEvento:''}],
        [{idServicio:''}],
        0,0,0,0,""
        )
      this.token=_facturaServices.obtenerToken()
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      console.log(dataRuta.get("idUsuario"))
      this.getFactura(dataRuta.get("idUsuario"))
      //this.generarFactura()
      this.idUsuario = dataRuta.get("idUsuario")
    })
  }

  getFactura(idUsuario) {
    console.log(idUsuario)
    this._facturaServices.obtenerFactura(idUsuario,this.token).subscribe(
      (response) => {
        console.log("Esto contiene el response "+response)
        if (response.factura==0) {
          console.log("datos vacios")
          this.facturaModelGet = response.factura
          this.validation = false;
        } else {
          this.facturaModelGet = response.factura
          this.validation = true;
          console.log("si hay datos")
        }
        console.log(this.facturaModelGet)
      },
      (error) => {

        console.log(<any>error)
      }

    )
  }

  generarFactura() {
    this._facturaServices.generarFactura(this.facturaModelPost, this.token).subscribe(
      response => {
        this.getFactura(this.idUsuario)
      },
      error => {
        console.log("Hubo un error" + <any>error)
      }
    )
  }

}
