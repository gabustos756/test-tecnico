import { Component, OnInit } from "@angular/core";
import { SearchResultsService } from "../search-results.service";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { SEOService } from "../seo.service";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"]
})
export class SearchResultsComponent implements OnInit {
  
  public categories: any;
  public products: any;
  public onPage: boolean = true;
  error: boolean = false;
  product: object;
  loading : any;
  pageTitle: string = "Buscador principal";

  constructor(
    public service: SearchResultsService,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private SEOService: SEOService
  ) {}

  ngOnInit() {
    let initSearchField = this.activatedRoute.snapshot.paramMap.get(
      "searchField"
    );
    this.getSearchResults(initSearchField);
    this.updateSEO();
  }

  getSearchResults(searchField) {
    this.service.getSearchResults(searchField).subscribe((response: {}) => {
      let data: any = response;
      this.categories = data.categories;
      this.products = data.products;
      this.onPage = true;
    });
  }

  updateSEO() {
    this.title.setTitle(this.pageTitle);
    this.SEOService.generateTags({
      title: this.pageTitle,
      description:
        "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño",
      slug: ""
    });
  }
}
