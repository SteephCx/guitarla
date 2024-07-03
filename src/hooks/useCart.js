import { useEffect, useState, useMemo } from "react"
import {db} from '../data/db'


export const useCart = () => {


    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
       }
       
       const [data] = useState(db)
       const [cart, setCart]= useState(initialCart)
      
       const MAX_ITEMS = 5 
       const MIN_ITEMS = 1 
      
       useEffect(()=> {
       localStorage.setItem('cart',JSON.stringify(cart))
       }, [cart])
      
      
       function addToCart(item){
        const itemExists = cart.findIndex((guitar)=> guitar.id === item.id)
        if(itemExists >=0){
          if(cart[itemExists].quantity >= MAX_ITEMS) return
          const updatedCart = [...cart]
          updatedCart[itemExists].quantity++
          setCart(updatedCart)
        }else {
          item.quantity = 1
          setCart (prevCart => [...cart,item])
        }
          }
      
          function removeFromCart(id){
            setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
          }
      /*
      es una manera de hacero desde una api
      useEffect(() => {
        setData(db)
      }, [])
      
      */
      
      function increaseQuantity(id){
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity < MAX_ITEMS){
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
      
      
      function decrementQuantity(id){
        const updatedCart = cart.map(item =>{
          if(item.id==id && item.quantity > MIN_ITEMS){
            return{
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item 
        })
        setCart(updatedCart)
      }
      
      function clearCart(e){
        setCart([])
      }

        //State derivado
    //lo que hace useMemo es que evita que mi codigo se renderice completamente y espera la instrccion de una funcion para ejecutarse
    const isEmpty = useMemo( () => cart.length === 0, [cart])

    //Sumatorio del precio del carrito
    const cartTotal = useMemo( () => cart.reduce ((total, item) => total + (item.quantity * item.price), 0), [cart])



    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decrementQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    
    }
}