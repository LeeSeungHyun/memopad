import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, 
         MatCheckboxModule, 
         MatFormFieldModule,
         MatCardModule,
         MatIconModule,
         MatMenuModule,
         MatDialogModule,
         MatToolbarModule,
         MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { RouterModule, Routes } from '@angular/router';    
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MemopadComponent } from './memopad/memopad.component';
import { AuthService } from './services/auth.service';
import { RegisterService } from './services/register.service';
import { WriteService } from './services/write.service';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'memopad', component: MemopadComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MemopadComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only 
    )
  ],
  providers: [
    AuthService,
    RegisterService,
    WriteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
