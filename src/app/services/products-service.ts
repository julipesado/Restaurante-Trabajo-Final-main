import { inject, Injectable, OnInit, signal } from "@angular/core";
import { AuthService } from "./auth-service";
import { Product, NewProduct } from "../interfaces/interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit {
  ngOnInit(): void {
  }
  authService = inject(AuthService);
  products: Product[] = [];

  async createProduct(nuevoProducto: NewProduct) {
    const res = await fetch("https://w370351.ferozo.com/api/products",
      {
        method: "POST",
        body: JSON.stringify(nuevoProducto),
        headers: {
          "Content-Type": "application/json", Authorization: "Bearer" + this.authService.token,
        },
      })
    if (!res.ok) {
      return
    }
    const resJson: Product = await res.json()
    this.products.push(resJson)
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
    this.products = resJson;
  }
  async getProductsById(id: number) {
    const res = await fetch('https://w370351.ferozo.com/api/products/' + id,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return
    }
    return await res.json();
  }
  async getProductsByUserId(id: number) {
    const res = await fetch('https://w370351.ferozo.com/api/products/' + this.authService.getUserId,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return
    }
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
    this.products = this.products.map(contact => {
      if (contact.id === productoEditado.id) return productoEditado;
      return contact
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
      this.products = this.products.filter(product => product.id !== id)
    }
    return true;
  }
  async setHappyHour(id: string | number) {
    const res = await fetch("https://w370351.ferozo.com/api/products/" + id + "/happyHour",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer" + this.authService.token,
        }
      });
    if (!res.ok) {
      return
    }
    this.products = this.products.map(product => {
      if (product.id === id) {
        return { ...product, hasHappyHour: !product.hasHappyHour };
      };
      return product;
    });
    return true;
  }
  async setDiscount(id:number | string, discount: number){
    const res = await fetch ("https://w370351.ferozo.com/api/products/" + id + "/discount",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer" + this.authService.token,
        },
        body: JSON.stringify(discount),
      });
      if (!res.ok){
        return
      }
      this.products = this.products.map (product => {
      if (product.id === id) {
        return { ...product, discount };
      };
      return product;
    });
    return true;
  }
}
