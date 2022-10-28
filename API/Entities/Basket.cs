using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }

        public string BuyerId { get; set; }

        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            // To check if product is not in list of items already / & if not...
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            // Gives us our basket item 
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            // Get the item
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            // if the item is null return the list
            if (item == null) return;
            // if it isn't null, decrease the quantity
            item.Quantity -= quantity;
            // if item quantity is 0, remove the item from list
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}