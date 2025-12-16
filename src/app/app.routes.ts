import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { ExplorePage } from './explore-page/explore-page';
import { RegisterPage } from './register-page/register-page';
import { LoggedLayout } from './logged-layout/logged-layout';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
import { RestaurantPage } from './restaurant-page/restaurant-page';
import { AddProducts } from './add-products/add-products';
import { AddCategories } from './categories/add-categories';
import { ProductPage } from './product-page/product-page';
import { EditUserPage } from './edit-user-page/edit-user-page';

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
        path: "restaurant/:idRestaurant",
        component: RestaurantPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "restaurant-page",
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
    {
        path: "add-product",
        component: AddProducts,
        canActivate: [onlyLoggedUserGuard]
    },
    {
        path: "product/:idProduct/edit",
        component: AddProducts,
        canActivate: [onlyLoggedUserGuard]
    },
    {
        path: "add-categories",
        component: AddCategories,
        canActivate: [onlyLoggedUserGuard]
    },
    {
        path: "category/:idCategory/edit",
        component: AddCategories,
        canActivate: [onlyLoggedUserGuard]
    },
    {
        path: "product/:idProduct",
        component: ProductPage
    },
    {
        path: "edit-user",
        component: EditUserPage,
        canActivate: [onlyLoggedUserGuard]
    }
];
