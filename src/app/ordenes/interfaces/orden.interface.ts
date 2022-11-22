// export interface Orden {
//     idOrdenTrabajo?: string;
//     idCliente:      string;
//     idVehiculo:     string;
//     idUsuario?:      string;
//     idTaller:       number;
// }
export interface Orden {
    idOrdenTrabajo:  string;
    idCliente:       string;
    idTaller:        number;
    idUsuario:       string;
    idVehiculo:      string;
    codigoOrden?:     string;
    motivo?:          string;
    fecha?:           string;
    nombreCliente?:   string;
    apellidoCliente?: string;
    dniCliente?:      string;
    telefono?:        string;
    email?:           string;
    marca?:           string;
    modelo?:          string;
    placa?:           string;
    nroChasis?:       string;
    nombreUsuario?:   string;
    apellidoUsuario?: string;
    dniUsuario?:      string;
    usuario?:         string;
    password?:        null | string;
}
