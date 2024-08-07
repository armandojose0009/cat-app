import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedSelectorComponent } from './components/breed-selector/breed-selector.component';
import { BreedCarouselComponent } from './components/breed-carousel/breed-carousel.component';
import { BreedTableComponent } from './components/breed-table/breed-table.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: BreedSelectorComponent },
  { path: 'carousel', component: BreedCarouselComponent },
  { path: 'table', component: BreedTableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
