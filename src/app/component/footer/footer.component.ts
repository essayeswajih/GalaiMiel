import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  dataList!:FooterItem[];
  constructor(){
    this.dataList =
      [
        {
          category: "ABOUT",
          items: [
            {
              elem: "Who are we",
              url: "#",
            },
            {
              elem: "Our shops",
              url: "#",
            },
            {
              elem: "Galai Miel blog",
              url: "#",
            },
            {
              elem: "Contact-us",
              url: "#",
            },
          ],
        },
        {
          category: "INFORMATION",
          items: [
            {
              elem: "Delivery",
              url: "#",
            },
            {
              elem: "Exchange and return",
              url: "#",
            },
            {
              elem: "Parcel tracking",
              url: "#",
            },
            {
              elem: "Legal Notice",
              url: "#",
            },
            {
              elem: "Cookie statement",
              url: "#",
            },
            {
              elem: "Moyens de paiements",
              url: "#",
            },
          ],
        },
        {
          category: "Advice",
          items: [
            {
              elem: "The beginner's guide",
              url: "#",
            },
            {
              elem: "Help",
              url: "#",
            },
            {
              elem: "Galai Miel advice",
              url: "#",
            },
            {
              elem: "Customers' opinion",
              url: "#",
            },
          ],
        },
      ];
  }
}

interface FooterItem {
  category: string;
  items: FooterItemElement[];
}

interface FooterItemElement {
  elem: string;
  url: string;
}