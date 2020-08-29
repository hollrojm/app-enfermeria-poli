import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  videos = [
    {
      video: "pkOnxCx7Joo",
    },
    {
      video: "pluwgjW8tdI",
    },
    {
      video: "q57PQUHKTeQ",
    },
    {
      video: "hPuATh06caU",
      
    },
    {
      video: "JG1wfNUTzCc",
    },
  ];

  darkMode: boolean = true;
  constructor(
    public menuCtrl: MenuController,
  ) {}

  ngOnInit() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(true);
  }
}
