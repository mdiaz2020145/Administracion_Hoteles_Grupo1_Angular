export class HabitacionesModel {
  constructor(
    public _id: String,
    public numeroDeHabitacion: String,
    public descripcion: String,
    public precio: Number,
    public disponible: Boolean,
    public idAdmin: String,
    public idHotel: String
  ) { }
}
