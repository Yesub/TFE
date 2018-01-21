import { Storage } from '@ionic/storage';

constructor(
		public storage: Storage
		)
        
inMyFunction() {
    //set a value link to a key
    this.storage.set('key','value');
    
    //get the value from a key
    this.storage.get('key').then((value) => {
        console.log(value);
    });
    
}