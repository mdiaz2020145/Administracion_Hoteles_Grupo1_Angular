import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HotelesModule {
  constructor(
    public _id: String,
    public nombre: String,
    public direccion: String,
    public pais: String,
    public idAdmin: String
  ) { }
}
