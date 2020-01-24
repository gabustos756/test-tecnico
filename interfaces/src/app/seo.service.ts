import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class SEOService {
  constructor(private meta: Meta) {}

  generateTags(config) {
    config = {
      title: "Ng SEO",
      description: "MercadoLibre Test Tecnico",
      image: "../assets/Logo_ML.png",
      slug: "",
      ...config
    };
  }
}
