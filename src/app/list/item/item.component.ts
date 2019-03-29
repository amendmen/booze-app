import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  images = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    for(let i = 0; i < data.files.length; i++) {       
      this.images[i] = data.files[i].src.replace(/^data:(application|image)\/(pdf|gif|jpeg|png|jpg);base64,/, "")
    }
  }
 
 


  ngOnInit() {
  }

}
