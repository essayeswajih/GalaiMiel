import { Component, OnInit } from '@angular/core';
import { LightService } from './lightService/light.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit {
  ButtonText!: string;

  constructor(private lightService: LightService) { }

  ngOnInit() {
    this.initializeMode();
  }

  private async initializeMode() {
    console.log(this.lightService.userId)
    await this.lightService.getDesignMode();
    console.log(this.lightService.mode);
    this.ButtonText = this.lightService.mode;

    if (this.ButtonText === 'Light') {
      this.applyLightStyles();
    }
  }

  private applyLightStyles() {
    document.documentElement.style.setProperty('--mainColor', '#ddd');
    document.documentElement.style.setProperty('--secondColor', '#cd874e');
    document.documentElement.style.setProperty('--3thColor', '#cdcdcd');
    this.divElement[0].classList.add('d');
  }

  divElement = document.getElementsByClassName('divLight');

  async changeMode() {
    if (this.ButtonText === 'Dark') {
      const success = await this.lightService.setDesignMode('Light');
      if (success) {
        this.applyLightStyles();
        this.ButtonText = 'Light';
      }
    } else {
      const success = await this.lightService.setDesignMode('Dark');
      if (success) {
        document.documentElement.style.setProperty('--mainColor', '#111');
        document.documentElement.style.setProperty('--secondColor', '#cd874e');
        document.documentElement.style.setProperty('--3thColor', '#0A0A0A');
        this.ButtonText = 'Dark';
        this.divElement[0].classList.remove('d');
      }
    }
  }
}
