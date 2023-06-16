import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog';

@Component({
  selector: 'app-side-views',
  templateUrl: './side-views.component.html',
  styleUrls: ['./side-views.component.scss']
})
export class SideViewsComponent {
  constructor(public dialog: MatDialog) {}


  openBuildingFunctionsDialog(indexToBeShown:number){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth=1500;
    dialogConfig.width="1200px";
    dialogConfig.height="900px";
    dialogConfig.data={indexToBeShown };
    
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, dialogConfig );
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
      });
  }
}
 
