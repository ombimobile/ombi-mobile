import { Component, OnInit } from '@angular/core';
import { ToastType } from 'src/models/toast';
import { AuthService } from 'src/services/auth.service';
import { CredentialsService } from 'src/services/credentials.service';
import { ToastService } from 'src/services/toast.service';
import { InputType } from '../../../models/input';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  public model = {
    ombiUrl: '',
    username: '',
    password: ''
  }

  constructor(
    private credentials: CredentialsService,
    private auth: AuthService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.model.ombiUrl = this.credentials.baseUrl;
    this.model.username = this.credentials.username;
    this.model.password = this.credentials.password;
  }

  public submit() {
    this.credentials.baseUrl = this.model.ombiUrl;
    this.credentials.username = this.model.username;
    this.credentials.password = this.model.password;
    this.auth.fetchToken()
      .then(() => this.toast.show(ToastType.SUCCESS, "Successfully signed in!"));
  }

  public get inputType(): typeof InputType {
    return InputType;
  }

}
