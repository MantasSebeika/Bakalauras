import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PradziaComponent } from './pradzia/pradzia.component';
import { KlausimynasComponent } from './klausimynas/klausimynas.component';
import { KontaktaiComponent } from './kontaktai/kontaktai.component';
import { AuthGuard } from './guards/auth.guard';
import { PrisijungimasComponent } from './prisijungimas/prisijungimas.component';


const routes: Routes = [ 
{ path: 'Klausimynas', component: KlausimynasComponent, canActivate: [AuthGuard]},
{ path: 'Kontaktai', component: KontaktaiComponent },
{ path: 'Prisijungimas', component: PrisijungimasComponent},
{ path:"**", component: PradziaComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
