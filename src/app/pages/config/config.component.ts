import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/models/settings';
import { ToastType } from 'src/models/toast';
import { AuthService } from 'src/services/auth.service';
import { CredentialsService } from 'src/services/credentials.service';
import { SettingsService } from 'src/services/settings.service';
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

  private baseUrlTimeout;

  public validUrl: boolean = false;
  public hasOauth: boolean = false;

  constructor(
    private credentials: CredentialsService,
    private auth: AuthService,
    private toast: ToastService,
    private settings: SettingsService,
  ) { }

  ngOnInit() {
    this.model.ombiUrl = this.credentials.baseUrl;
    this.model.username = this.credentials.username;
    this.model.password = this.credentials.password;
    this.validUrl = this.settings.get(Settings.URL_IS_VALID);
    this.hasOauth = this.settings.get(Settings.URL_HAS_OAUTH);
    this.settings.change.subscribe(() => {
      this.validUrl = this.settings.get(Settings.URL_IS_VALID);
      this.hasOauth = this.settings.get(Settings.URL_HAS_OAUTH);
    })
  }

  public submit() {
    this.credentials.username = this.model.username;
    this.credentials.password = this.model.password;
    this.credentials.token = '';
    this.auth.fetchToken()
      .then((t) => this.toast.show(ToastType.SUCCESS, `Successfully signed in as ${this.credentials.name}!`))
      .catch(e => this.toast.show(ToastType.ERROR, 'Unable to sign in with these credentials'));
  }

  public submitWithPlex() {
    this.auth.triggerPlexOauth()
      .then((t) => this.toast.show(ToastType.SUCCESS, `Successfully signed in as ${this.credentials.name}!`))
      .catch(e => this.toast.show(ToastType.ERROR, 'Unable to sign in with Plex'));
  }

  public baseUrlChange(): void {
    clearTimeout(this.baseUrlTimeout);
    this.baseUrlTimeout = setTimeout(() => {
      this.credentials.baseUrl = this.model.ombiUrl;
      this.auth.updateAuthConfig();
    }, 500)
  }

  public get inputType(): typeof InputType {
    return InputType;
  }

  public get hasBaseUrl(): boolean {
    return this.model.ombiUrl != '';
  }

  public get hasCredentials(): boolean {
    return this.model.username != '' && this.model.password != '' && this.hasBaseUrl;
  }

}
