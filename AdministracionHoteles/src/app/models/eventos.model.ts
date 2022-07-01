export class EventosModel {
  constructor(
    public _id: String,
    public nombreEvento: String,
    public descripcion: String,
    public precio: Number,
    public idAdmin: String,
    public idHotel: String
  ) { }
}
