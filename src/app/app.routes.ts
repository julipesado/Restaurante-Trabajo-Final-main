import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard } from './guards/only-public-user-guard-guard';
import { ExplorePage } from './explore-page/explore-page';
import { RestaurantPage } from './restaurant-page/restaurant-page';

export const routes: Routes = [
    {
        path: "login",
        component : LoginPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "",
        component: ExplorePage,

    }
];
