import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../shared/models/Item';
import { CartItem } from '../shared/models/CartItem';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private platformId = inject(PLATFORM_ID);
  
  private cart: Cart = this.getCartFromLocalStorage();

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor(){}

  addToCart(item: Item): void {
    let cartItem = this.cart.cartItems.find(cartItem => cartItem.item.id === item.id);
    if(cartItem)
      return;
    this.cart.cartItems.push(new CartItem(item));
    this.setCartToLocalStorage();
  }

  removeFromCart(itemId: string): void {
    this.cart.cartItems = this.cart.cartItems.filter(cartItem => cartItem.item.id != itemId);
    this.setCartToLocalStorage();
  }

  changeQuantity(itemId: string, quantity: number){
    let cartItem = this.cart.cartItems.find(cartItem => cartItem.item.id === itemId);
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.item.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void{
    this.cart.totalPrice = this.cart.cartItems
              .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.cartItems
              .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('Cart', cartJson);
    }
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart{
    if (isPlatformBrowser(this.platformId)) {
      const cartJson = localStorage.getItem('Cart');
      return cartJson ? JSON.parse(cartJson) : new Cart();
    }
    return new Cart();
  }
}
