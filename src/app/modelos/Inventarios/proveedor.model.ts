export class ProveedorModel{
  id: number
  razonsocial: string
  correo: string
  rfc: string
  contacto: ContactoProveedor[]
}

export class ContactoProveedor {
  id: number
  nombre: string
  correo: string
  telefono: string
}
