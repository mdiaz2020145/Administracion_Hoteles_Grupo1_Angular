export class Factura{
  constructor(
   public reservacion:[{
    numeroDeHabitacion: String,
      idHabitacion:String
  }],
   public reservacionEvento:[{
    nombreEvento: String,
    idEvento:String
  }],
   public reservacionServicio:[{
    nombreServicio:String,
    idServicio:String
  }],
 public totalHabitacion:Number,
 public totalEvento:Number,
 public totalServicio:Number,
 public total:Number,
 public idUsuario:String
  ){}
}
