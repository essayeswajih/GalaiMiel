import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  contacts : contactList[] = [];
  constructor() {
    this.contacts=[
      {
        elem:"Facebook",
        contactUrl:"https://www.facebook.com/profile.php?id=100089610673240",
        imgSrc:"/assets/Images/FbLogo.png"
      },
      {
        elem:"Instagram",
        contactUrl:"https://www.instagram.com/galai.miel/",
        imgSrc:"/assets/Images/InstaLogo.png"
      },
      {
        elem:"WhatsApp",
        contactUrl:"#",
        imgSrc:"/assets/Images/WhatsAppLogo.png"
      },
      {
        elem:"Tiktok",
        contactUrl:"https://www.tiktok.com/@galaimiel",
        imgSrc:"/assets/Images/TiktokLogo.png"
      },
      {
        elem:"Mail",
        contactUrl:"#",
        imgSrc:"/assets/Images/MailLogo.png"
      },
      {
        elem:"Telephone",
        contactUrl:"#",
        imgSrc:"/assets/Images/TelLogo.png"
      },
      {
        elem:"Localisation",
        contactUrl:"#",
        imgSrc:"/assets/Images/LocalLogo.png"
      },
    ];
  }
}
interface contactList{
  elem:string;
  contactUrl:string;
  imgSrc:string;
}