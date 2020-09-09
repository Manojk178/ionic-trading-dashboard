import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ConfirmModalPage } from '../modals/confirm-modal/confirm-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private submitForm: FormGroup;
  isSubmitted = false;
  displayDetails = false;
  dataReturned: any;
  constructor(private formBuilder: FormBuilder, public modalController: ModalController) {

    this.submitForm = this.formBuilder.group({
      arrivalID: ['', Validators.required],
      mechReceived: [''],
      inspectionBegin: [''],
      address: [''],
      track: [''],
      inbound: [''],
      isCheckedCommercial: [''],
      inspecType: ['', Validators.required],
      isCheckedForEdit: [''],
      comments:['', Validators.required]
    });
  }

  get errorControl() {
    return this.submitForm.controls;
  }

  logForm(){
    this.isSubmitted = true;
    if (!this.submitForm.valid) {
      return false;
    } else {
      console.log('success', this.submitForm.value);
      this.openModal();
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ConfirmModalPage,
      componentProps: {
        "formDetails": this.submitForm.value
      },
      backdropDismiss: false
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        this.displayDetails= true;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

}
