import { Component, OnInit } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor( public searchResultsComponent : SearchResultsComponent, private router: Router) { }

  ngOnInit() {
  }
  searchResults(searchField)
  {
    if(this.router.url.includes("/item/")){
      this.router.navigateByUrl('items/'+ searchField);
    }
    else
      this.searchResultsComponent.getSearchResults(searchField);
  }
}
