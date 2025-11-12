import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { ExplorePage } from './explore-page/explore-page';
import { RegisterPage } from './register-page/register-page';
import { LoggedLayout } from './logged-layout/logged-layout';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
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
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "restaurant/:id",
        component: RestaurantPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "register",
        component: RegisterPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "admin",
        component: LoggedLayout,
        canActivate: [onlyLoggedUserGuard]
    },
];
