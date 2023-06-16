import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styles: [
    `
      :host ::ng-deep {
        .chart {
          width: 900px;
          height:800px;
          display: inline-block;
        }
      }
    `,
  ],
})
export class DialogOverviewExampleDialog {
  indexToBeShown=1;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {indexToBeShown:number}
  ) {
    this.indexToBeShown=this.data.indexToBeShown;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
