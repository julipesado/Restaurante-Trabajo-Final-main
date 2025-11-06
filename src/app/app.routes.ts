import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard } from './guards/only-public-user-guard-guard';
import { ExplorePage } from './explore-page/explore-page';
<<<<<<< HEAD
=======
import { RegisterPage } from './register-page/register-page';
import { LoggedLayout } from './logged-layout/logged-layout';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
>>>>>>> c404d5b125006e24fccd1bc659c861439898858b
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
<<<<<<< HEAD
        canActivateChild: [onlyPublicUserGuard],
        children: [
            {
                path: "",
                component: RestaurantPage
            }
        ]
=======
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
>>>>>>> c404d5b125006e24fccd1bc659c861439898858b
    }
];
