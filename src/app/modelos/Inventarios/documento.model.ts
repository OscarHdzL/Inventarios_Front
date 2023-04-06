

export class DocumentoArticuloModel{
  id?: number;
  token?: string;
  documento?: string;
}


export class DocumentoArticuloFormModel {
  id?: number;
  token?: string;
  documento?: string;
  constructor(){
    this.id = 0;
    this.token = null;
    this.documento = null;

  }
}
