import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/Basket";

// Values of the store context
interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number ) => void;
}

// Create Store Context
export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

// Check if the Store Context is undefined
export function useStoreContext() {

    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error('Oops - we do not seem to be in the provide')
    }

    return context;
}  

export function StoreProvider({children}: PropsWithChildren<any>){
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number){
        // if there is no basket return
        if (!basket) return;    
        // get the items in the basket
        const items = [...basket.items];
        // get the index of the item
        const itemIndex = items.findIndex(i => i.productId === productId);
        // remove method
        if (itemIndex >= 0){
            // decrease quantity
            items[itemIndex].quantity -= quantity;
            // Remove if its the only item in basket
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            // display the changes
            setBasket(prevState => {
                return {...prevState!, items}
            })
        }
        
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}

