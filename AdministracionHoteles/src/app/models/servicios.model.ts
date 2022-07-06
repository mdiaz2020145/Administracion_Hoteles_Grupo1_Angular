export class ServiciosModel{
    constructor(
        public _id: String,
        public nombreServicio:String,
        public descripcion:String,
        public precio:Number,
        public idAdmin: String,
        public idHotel: String
    ){}
}