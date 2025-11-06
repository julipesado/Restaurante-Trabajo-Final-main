import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard } from './guards/only-public-user-guard-guard';
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
        canActivateChild: [onlyPublicUserGuard],
        children: [
            {
                path: "",
                component: RestaurantPage
            }
        ]
    },
    {
        path: "register",
        component: RegisterPage
    },
    {
        path: "admin",
        component: LoggedLayout,
        canActivate: [onlyLoggedUserGuard]
    },
    {
    path: "restaurantpage/:id",
    component: RestaurantPage
    }
];
