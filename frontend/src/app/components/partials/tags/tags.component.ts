import { Component } from '@angular/core';
import { Tag } from '../../../shared/models/Tag';
import { ItemService } from '../../../services/item.service';
import { NgIf, NgForOf } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-tags',
  imports: [RouterLink],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent {
  tags?: Tag[];
  constructor(itemService: ItemService){
    this.tags = itemService.getAllTags();
  }

}
