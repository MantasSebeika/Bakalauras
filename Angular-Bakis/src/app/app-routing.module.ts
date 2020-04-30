import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PradziaComponent } from './pradzia/pradzia.component';
import { KlausimynasComponent } from './klausimynas/klausimynas.component';
import { KontaktaiComponent } from './kontaktai/kontaktai.component';
import { AuthGuard } from './guards/auth.guard';
import { PrisijungimasComponent } from './prisijungimas/prisijungimas.component';
import { VartotojaiComponent } from './vartotojai/vartotojai.component';
import { AdminKlausimaiComponent } from './admin-klausimai/admin-klausimai.component';


const routes: Routes = [ 
{ path: 'klausimynas', component: KlausimynasComponent, canActivate: [AuthGuard]},
{ path: 'kontaktai', component: KontaktaiComponent },
{ path: 'admin_klausimai', component: AdminKlausimaiComponent},
{ path: 'vartotojai', component: VartotojaiComponent},
{ path: 'prisijungimas', component: PrisijungimasComponent},
{ path:"**", component: PradziaComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
