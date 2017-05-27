
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import {Global} from '../../providers/global';

declare var google;

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [Global]
})
export class ListPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(public navCtrl: NavController, public global: Global, public navParam: NavParams) {
    
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
  loadMap(){
  let options = {timeout: 10000, enableHighAccuracy: true};
    //ENABLE THE FOLLOWING:
    
      let aux = this.navParam.get('latlng');
      if(!aux){
        aux = this.global.getMyGlobalVar();
      }
      let latLng = new google.maps.LatLng(aux[0], aux[1]);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      

      this.map = new google.maps.Map(document.querySelector('#map'), mapOptions); 

      let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Information!</h4>";          
 
  this.addInfoWindow(marker, content);
    
  }

  addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}
 
  /*loadMap(){
 
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }*/
  /*selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }*/


  }

  /*itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}*/
