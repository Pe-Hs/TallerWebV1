export interface User {
    idUsuario:       string;
    nombreUsuario:   string;
    apellidoUsuario: string;
    email?:           string;
    telefono:        string;
    dni:             string;
    domicilio?:       string;
    idRol?:           number;
    idTaller?:        number;
    usuario:         string;
    password:      string;
}
