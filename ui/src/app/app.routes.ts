import { Routes } from '@angular/router';
import { ClassificationComponent } from './main/classification/classification.component';
import { HomeComponent } from './main/home/home.component';
import { MfsInfoComponent } from './main/mfs-info/mfs-info.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'classify', component:ClassificationComponent},
    {path:'info', component:MfsInfoComponent},

    // {
    //     path: 'main',
    //     component: MainComponent,
    //     children: [
    //     //   { path: 'institution', component: InstitutionComponent }
    //     ]
    //   }
];
