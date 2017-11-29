import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

constructor(
    public alertCtrl: AlertController) 
{	  
}

let alert = this.alertCtrl.create({
    title:'Register Error', 
    subTitle:'All fields are rquired',
    buttons:['OK']
});
alert.present();