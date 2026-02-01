import { Injectable } from '@angular/core';
import { sample_items, sample_tags } from '../../data';
import { Item } from '../shared/models/Item';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  constructor(){}

  getAllItems(): Item[] {
    return sample_items;
  }

  getItemsBySearchWord(searchWord: string){
    return this.getAllItems().filter(item => 
      item.name.toLowerCase().includes(searchWord.toLowerCase())
    );
  }

  getAllTags(): Tag[] {
    return sample_tags
  }

  getAllItemsByTag(tag: string): Item[] {
    return tag == "All" ?
      this.getAllItems() :
      this.getAllItems().filter(item => item.tags?.includes(tag))
  }

  getItemById(itemId: string): Item {
    return this.getAllItems().find(item => item.id == itemId) ?? new Item();
  }
}
