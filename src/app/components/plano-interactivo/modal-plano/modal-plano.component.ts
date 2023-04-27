import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'vex-modal-plano',
  templateUrl: './modal-plano.component.html',
  styleUrls: ['./modal-plano.component.scss']
})
export class ModalPlanoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public propietario: any,
  private dialogRef: MatDialogRef<ModalPlanoComponent>,) { }

  ngOnInit(): void {
  }

}
