

export class Usuario {

    // tslint:disable-next-line:typedef
    static fromFirebase({ email , uid, nombre }){

        return new Usuario(uid, nombre, email);
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ){}
}
