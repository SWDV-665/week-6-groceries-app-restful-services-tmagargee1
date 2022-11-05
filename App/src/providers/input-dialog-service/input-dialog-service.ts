import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';

@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceProvider) {}


  showPrompt(item?, index?) {
    let itemId = ''
    if(item){
      const itemId = item._id;
    }
    
    const prompt = this.alertCtrl.create({
      title: item ? 'Edit Item' : 'Add Item',
      message: item ? "Please edit item..." : "Please enter item...",
      inputs: [
        {
            name: 'name',
            placeholder: 'Name',
            value: item ? item.name : null
        },
        {
            type:'number',
            name: 'quantity',
            placeholder: 'Quantity',
            value: item ? item.quantity : null
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: item => {
            if (index !== undefined) {
              item._id = itemId;
              this.dataService.editItem(item);
            }
            else {
              this.dataService.addItem(item);
            }

          }
        }
      ]
    });
    prompt.present();
  }

}
