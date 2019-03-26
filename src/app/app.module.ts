import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Third-party modules
import { NgbModalModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

// App modules
import { AppRoutingModule } from './app-routing.module';

// App directives
import { BgImageDirective } from './directives/bg-image.directive';
import { ExternalUrlDirective } from './directives/external-url.directive';

// App pipes
import { TrucateTxtPipe } from './pipes/trucate-txt.pipe';

// App services
import { AuthViewControllerService } from '@app-providers/auth-view-controller.service';
import { AuthService } from '@app-providers/auth.service';
import { UserFeedbackControllerService } from '@app-providers/user-feedback-controller.service';

// App containers
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';

// App components
import { MainNavbarComponent } from '@app-components/main-navbar/main-navbar.component';
import { VotingCardSimpleComponent } from '@app-components/voting-card-simple/voting-card-simple.component';
import { ProgressBarComponent } from '@app-components/progress-bar/progress-bar.component';
import { VotingCardDetailedComponent } from '@app-components/voting-card-detailed/voting-card-detailed.component';
import { FooterComponent } from '@app-components/footer/footer.component';
import { AuthModalComponent } from '@app-components/auth-modal/auth-modal.component';
import { LoginFormComponent } from '@app-components/login-form/login-form.component';
import { RegisterFormComponent } from '@app-components/register-form/register-form.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavbarComponent,
    VotingCardSimpleComponent,
    ProgressBarComponent,
    VotingCardDetailedComponent,
    BgImageDirective,
    TrucateTxtPipe,
    FooterComponent,
    AuthModalComponent,
    LoginFormComponent,
    RegisterFormComponent,
    DialogComponent,
    ExternalUrlDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbAlertModule
  ],
  providers: [
    AuthViewControllerService,
    AuthService,
    UserFeedbackControllerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AuthModalComponent, DialogComponent]
})
export class AppModule {}
