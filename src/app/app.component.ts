import { Component } from '@angular/core';

export class NodeModel {
  type: 'folder' | 'file' | 'unset' | null;
  name?: string;
  children?: NodeModel[];
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'folder-structure-maker';
  showRootFolderInput = false;
  rootFolderInput = '';
  editingEntryId = '';

  folders: NodeModel[] = [
    {
      name: 'my_first_folder',
      type: 'folder',
      id: 'my_first_folder',
      children: [{ name: 'first_doc.html', type: 'file', id: 'first_doc' }, { name: 'second_doc.jpeg', type: 'file', id: 'second_doc' },],
    },
  ];


  onInput(event: any) {
    this.rootFolderInput = event.target.value
  }

  createRootFolder() {
    const newFolder: NodeModel = { type: 'folder', id: this.rootFolderInput, name: this.rootFolderInput };
    this.folders.push(newFolder);
    this.rootFolderInput = '';
    this.showRootFolderInput = false;
  }

  onCreate = (folder: NodeModel) => {
    const newFolder: NodeModel = { type: 'folder', id: '', name: '' };
    if (folder.children) {
      folder.children.push(newFolder);
    } else {
      folder.children = [newFolder];
    }
  }

  onUpdate = () => {
    this.editingEntryId = '';
  }

  onDelete = (folder: NodeModel) => {
    const parent = this.getParent(folder.id, this.folders)
    if (parent != null) {
      if (typeof parent === "object") {
        const parentFolder: NodeModel = parent[0];
        const childIndex: number = parent[1];
        parentFolder.children?.splice(childIndex, 1);
      }
      else {
        this.folders.splice(parent, 1);
      }
    }

  }


  getParent(id: string, folders: NodeModel[]): [NodeModel, number] | number | null {
    for (let i = 0; i < folders.length; i += 1) {
      const currentParent = folders[i];
      if (currentParent.children) {
        for (let z = 0; z < currentParent.children?.length; z += 1) {
          if (id === currentParent.children[z]['id']) {
            return [currentParent, z]
          }
        }
        for (let z = 0; z < currentParent.children.length; z += 1) {
          const result: [NodeModel, number] | number | null = this.getParent(id, currentParent.children)
          if (result != null) {
            return result
          }
        }
      }
      if (currentParent.id == id) {
        return i
      }
    }
    return null;
  }

}
