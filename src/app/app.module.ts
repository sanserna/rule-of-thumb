import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// App modules
import { AppRoutingModule } from './app-routing.module';

// App directives
import { BgImageDirective } from './directives/bg-image.directive';

// App pipes
import { TrucateTxtPipe } from './pipes/trucate-txt.pipe';

// App containers
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';

// App components
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { VotingCardSimpleComponent } from './components/voting-card-simple/voting-card-simple.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { VotingCardDetailedComponent } from './components/voting-card-detailed/voting-card-detailed.component';
import { FooterComponent } from './components/footer/footer.component';

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
    FooterComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
