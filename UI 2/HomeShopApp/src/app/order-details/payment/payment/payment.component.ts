import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { LocalStorageService } from '../../../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  form: FormGroup = this.fb.group({
    from_name: "",
    to_name: "",
    message: "",
  })

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router){}

  async ngOnInit(): Promise<void> {
   emailjs.init('eclR0_YzCEnq8tatB');
   let response = await emailjs.send("service_el4c17x","template_xr3snvr",{
   from_name: this.form.value.from_name,
   to_name: this.form.value.to_name,
   message: this.form.value.message,
  });
  alert ("Email has been Sent");
  this.form.reset();
  }

}

