import { Subject } from 'rxjs';
import { Item } from './item.model';

export class ListService {
    itemsChanged = new Subject<Item[]>();
    editItemChanged = new Subject<number>();
    list: Item[];

    editItem(index: number) { 
        this.editItemChanged.next(index);
    }
    getList() {
        this.list = this.fromStorage();
        return this.list
    }

    getItem(index: number) {
        return this.list[index]
    }

    add(item: Item) {       
        this.list.push(item);
        this.toStorage(this.list);       
    }

    edit(index: number, item: Item) {
        this.list[index] = item;
        this.toStorage(this.list);
    }

    remove(index: number) {
        this.list.splice(index, 1)
        this.toStorage(this.list);
    }

    toStorage(items) {
        localStorage.setItem('todoList', JSON.stringify(items));
    }

    fromStorage() {
        let list = JSON.parse(localStorage.getItem('todoList')) || [];

        if(!list) return [];

        return list.slice();
    }
}