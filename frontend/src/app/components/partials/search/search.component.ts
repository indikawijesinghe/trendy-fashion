import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {

  searchWord: string = '';

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.searchWord) this.searchWord = params.searchWord;
    })
  }

  search(word: string) {
    if(word.trim().length === 0) return;
    this.router.navigateByUrl('search/' + word);
  }
}
