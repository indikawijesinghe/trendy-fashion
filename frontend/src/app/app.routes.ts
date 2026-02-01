import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ItemPageComponent } from './components/pages/item-page/item-page.component';

export const routes: Routes = [
    { path:'', component: HomeComponent },
    { path:'search/:searchWord', component: HomeComponent },
    { path:'tag/:tag', component: HomeComponent },
    { path:'item/:id', component: ItemPageComponent }
];
