import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { PradziaComponent } from './pradzia/pradzia.component';
import { KlausimynasComponent } from './klausimynas/klausimynas.component';
import { KontaktaiComponent } from './kontaktai/kontaktai.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import { FooterComponent } from './footer/footer.component';
import { PrisijungimasComponent } from './prisijungimas/prisijungimas.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { VartotojaiComponent } from './vartotojai/vartotojai.component';
import { AdminKlausimaiComponent } from './admin-klausimai/admin-klausimai.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './vartotojai/popup';
import { DialogOverviewExampleDialognew } from './vartotojai/popupnew';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PrisijungimasAdminComponent } from './prisijungimas-admin/prisijungimas-admin.component';
import { KlausimasPrideti } from './admin-klausimai/adminklausimai-popup-naujas';
import { KlausimaiRedaguoti } from './admin-klausimai/adminklausimai-popup-redaguoti';
import { ImonePrideti } from './vartotojai/imones-popup-new';
import { ImoneRedaguoti } from './vartotojai/imones-popup-edit';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PradziaComponent,
    KlausimynasComponent,
    KontaktaiComponent,
    FooterComponent,
    PrisijungimasComponent,
    VartotojaiComponent,
    AdminKlausimaiComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialognew,
    AdminHomeComponent,
    PrisijungimasAdminComponent,
    KlausimasPrideti,
    KlausimaiRedaguoti,
    ImonePrideti,
    ImoneRedaguoti,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],

  entryComponents: [
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialognew,
    KlausimasPrideti,
    KlausimaiRedaguoti,
    ImonePrideti,
    ImoneRedaguoti
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
