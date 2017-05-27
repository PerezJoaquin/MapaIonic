import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ListPage } from '../list/list';
import {Global} from '../../providers/global';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Global]
})




export class HomePage {

  paises: Array<any> = [];

  constructor(public navCtrl: NavController, private http : Http, public global:Global, public navParams: NavParams) {
    this.traerPaises()
                .then(data =>{
                this.paises = data;
                console.log(data);
              }) 
            .catch(err =>{//error
                console.log(err);
                console.log("error");
              }); 
 
  }

  mostrar(latlng){
    console.log(latlng);
    //this.global.setMyGlobalVar(latlng);
    this.navCtrl.setRoot(ListPage, {latlng});
  }

  traerPaises()
  {
    
    return this.http.get("https://restcountries.eu/rest/v1/all")
                .toPromise()
                .then(this.extraerData)
                .catch(this.error);             
  }

  private extraerData(res:Response)
  {
    //console.log(res) || {};
    return res.json() || {};
  }

  private error(error:Response)
  {
    return error;
  }
  
}





  