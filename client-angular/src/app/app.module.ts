import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProjectDisplayComponent } from './project-display/project-display.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, ProjectDisplayComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
