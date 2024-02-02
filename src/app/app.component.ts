import { Component } from '@angular/core';
import * as aos from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Galai_Miel';
  ngOnInit() {
    aos.init();
  }
}
