import { Component } from '@angular/core';
import { Item } from '../../../shared/models/Item';
import { ItemService } from '../../../services/item.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchComponent } from "../../partials/search/search.component";
import e from 'express';
import { TagsComponent } from "../../partials/tags/tags.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SearchComponent, TagsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  items: Item[] = [];

  constructor(private itemService: ItemService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if(params.searchWord)
        this.items = this.itemService.getItemsBySearchWord(params.searchWord);
      else if(params.tag)
        this.items = this.itemService.getAllItemsByTag(params.tag);
      else
        this.items = this.itemService.getAllItems();
    })
  }

}
