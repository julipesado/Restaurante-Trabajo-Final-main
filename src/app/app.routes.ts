import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ExplorePage } from './explore-page/explore-page';
import { RegisterPage } from './register-page/register-page';
import { LoggedLayout } from './logged-layout/logged-layout';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';

export const routes: Routes = [
    {
        path: "login",
        component : LoginPage,
    },
    {
        path: "",
        component: ExplorePage,
    },
    {
        path: "register",
        component: RegisterPage
    },
    {
        path: "logged-layout",
        component: LoggedLayout,
        canActivate: [onlyLoggedUserGuard]
    }
];
