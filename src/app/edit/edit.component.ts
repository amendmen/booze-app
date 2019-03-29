import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListService } from '../list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  private subscription: Subscription;
  editMode = false;
  appForm: FormGroup;
  index: number;
  files = [];
  temp = {};
  constructor(private listService: ListService) { }

  ngOnInit() {
    this.subscription = this.listService.editItemChanged
    .subscribe(
      (index: number) => {
        this.index = index;
        this.editMode = true;
        this.initForm();      
      }
    );
    this.initForm()
  }


  fileSelected(event) {
    this.files = Array.from(event.target.files); 
    this.renderImg();    
  }

  removeFiles(i: number) {
    this.files.splice(i, 1);    
  }

  renderImg() {
      for(let i = 0; i < this.files.length; i++) {
        this.temp[i] = this.files[i]
        let reader = new FileReader();

        reader.onload = (e) => {
            //this.files[i].src = e.target.result;
            this.files[i].src = reader.result;
        }

        reader.readAsDataURL(this.files[i]);
      }
  }

  save() {
   if(this.temp) {
      this.appForm.value.files = [];
      for(let i in this.temp) {
        this.appForm.value.files[i] = {
          name: this.temp[i].name,
          src: this.temp[i].src,
          type: this.temp[i].type
        }
      }
     
    }

    if(!this.editMode) {
       this.listService.add(this.appForm.value);
    } else {
      this.listService.edit(this.index, this.appForm.value);
    }

    this.cancel();
  }

  cancel() {
    this.appForm.reset();
    this.files = [];
    this.editMode = false;
    this.temp = {};
  }

  initForm() {
    let name = null;
    let description = null;

    if(this.editMode) {
      const item = this.listService.getItem(this.index);
      name = item.name;
      description = item.description;
      this.files = item.files;
    }

    this.appForm = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'description': new FormControl(description, [Validators.required,])
    });
  }
}
