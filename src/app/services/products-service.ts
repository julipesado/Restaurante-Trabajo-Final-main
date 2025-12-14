import { inject, Injectable, OnInit, signal } from "@angular/core";
import { AuthService } from "./auth-service";
import { Product, NewProduct, HappyHour } from "../interfaces/interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit {
  ngOnInit(): void {
  }
  authService = inject(AuthService);
  userProducts: Product[] = [];
  restaurantProducts: Product[] = [];

  async createProduct(nuevoProducto: NewProduct) {
    const res = await fetch("https://w370351.ferozo.com/api/products/",
      {
        method: "POST",
        body: JSON.stringify(nuevoProducto),
        headers: {
          "Content-Type": "application/json", Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return
    }
    const resJson: Product = await res.json()
    this.userProducts.push(resJson)
    return resJson
  }
  async getProductsMe() {
    const res = await fetch("https://w370351.ferozo.com/api/products/me",
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const resJson: Product[] = await res.json()
    return resJson;
  }
  async getRestaurantProducts(restaurantId: number | string) {
    const res = await fetch("https://w370351.ferozo.com/api/users/" + restaurantId + "/products",
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return
    }
    return this.restaurantProducts = await res.json();
  }

  async getProductsByUserId(id: number | undefined) {
    const res = await fetch('https://w370351.ferozo.com/api/products/' + this.authService.getUserId());
    if (!res.ok) return undefined;
    return await res.json();

  }

  async editProduct(productoEditado: Product) {
    const res = await fetch("https://w370351.ferozo.com/api/products/" + "/" + productoEditado.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.token,
      },
      body: JSON.stringify(productoEditado),
    });
    if (!res.ok) return;
    this.userProducts = this.userProducts.map(product => {
      if (product.id === productoEditado.id) return productoEditado;
      return product
    })
    return productoEditado;
  }

  async deleteProduct(id: number | string) {
    const res = await fetch("https://w370351.ferozo.com/api/products/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.authService.token
      }
    });
    if (!res.ok) return; {
      this.userProducts = this.userProducts.filter(product => product.id !== id)
    }
    return true;
  }
  async setHappyHour(id: string | number, hasHappyHour: HappyHour) {
    const res = await fetch("https://w370351.ferozo.com/api/products/" + id + "/happyHour",
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(hasHappyHour)
      });

    return res.ok;
  }
  async setDiscount(id: number | string, discount: number) {
    const res = await fetch("https://w370351.ferozo.com/api/products/" + id + "/discount",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(discount),
      });
    if (!res.ok) {
      return
    }
    this.userProducts = this.userProducts.map(product => {
      if (product.id === id) {
        return { ...product, discount };
      };
      return product;
    });
    return true;
  }
  getFinalPrice(product: Product): number {
    if (!product.discount || product.discount === 0) {
      return product.price;
    }
    return product.price - (product.price * (product.discount / 100));
  }

}
