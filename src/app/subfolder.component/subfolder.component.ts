import { Component, Input } from '@angular/core';
import { NodeModel } from '../app.component';

@Component({
  selector: 'subfolder',
  templateUrl: './subfolder.component.html',
  styleUrls: ['./subfolder.component.css']
})

export class SubfolderComponent {
  @Input() data : NodeModel[];
  @Input() onDelete:Function;
  @Input() onCreate:Function;
  @Input() editingEntryId:string;

  title = 'sub-folder';
  showInput=false;
  newItemName='';
  newItemType: 'folder' | 'file' | 'unset' | null;


  createNew(type:'folder' | 'file' | 'unset' | null){
    this.newItemType=type;
    this.showInput = true;
  }

  onInput(event: any) {
    this.newItemName = event.target.value
  }

  updateItem(item:NodeModel){
    item.name=this.newItemName;
    item.type=this.newItemType;
    item.id=this.newItemName;

    this.newItemName='';
    this.newItemType=null;
    this.showInput=false;
  }

  deleteItem(item:NodeModel){
    this.onDelete(item);

    this.newItemName='';
    this.newItemType=null;
    this.showInput=false;
  }

}
