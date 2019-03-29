import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

import { ListService } from '../list.service';
import { Subscription } from 'rxjs';
import { ItemComponent } from './item/item.component';
import { Item } from '../item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: Item[];
  private subscription: Subscription;
  search = { name: '' };


  constructor(private listService: ListService, public modal: MatDialog) { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    this.listService.toStorage(this.list);
  }

  ngOnInit() {
    this.list = this.listService.getList();
    this.subscription = this.listService.itemsChanged
      .subscribe(
        (items: Item[]) => {
          this.list = items;
        }
      );
  }

  showItem(item: Item) {
    this.modal.open(ItemComponent, {
      data: item
    });
  }

  removeItem(index: number) {
    this.listService.remove(index)
  }

  editItem(index: number) {
    this.listService.editItem(index)
  }
}
