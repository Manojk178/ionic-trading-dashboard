import { Component, OnInit } from '@angular/core';
import { 
  ModalController,
  NavParams
  } from '@ionic/angular';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.page.html',
  styleUrls: ['./confirm-modal.page.scss'],
})
export class ConfirmModalPage implements OnInit {

  arrivalID: number;
  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    console.table(this.navParams);
    this.arrivalID = this.navParams.data.formDetails.arrivalID;
  }

  async closeModal() {
    const onClosedData: object = this.navParams.data.formDetails;
    await this.modalController.dismiss(onClosedData);
  }

}
