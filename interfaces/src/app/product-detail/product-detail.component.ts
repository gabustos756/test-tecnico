import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductDetailService } from "../product-detail.service";
import { Title } from "@angular/platform-browser";
import { SEOService } from "../seo.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  constructor(
    public service: ProductDetailService,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private SEOService: SEOService
  ) {}

  ngOnInit() {
    this.productID = this.activatedRoute.snapshot.paramMap.get("productID");
    this.getProductData(this.productID);
    this.updateSEO();
  }
  productID: any;
  product: any;
  pageTitle: string = "Detalle de producto";

  getProductData(productID) {
    this.service.getProductData(productID).subscribe((response: {}) => {
      let data: any = response;
      this.product = data;
    });
  }

  updateSEO() {
    this.title.setTitle(this.pageTitle);
    this.SEOService.generateTags({
      title: this.pageTitle,
      description:
        "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño",
      slug: "ProductID"
    });
  }
}
