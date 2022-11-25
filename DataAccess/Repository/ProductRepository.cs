using Ecommerce.Data;
using Ecommerce.DataAccess.Repository.IRepository;
using Ecommerce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.DataAccess.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly ApplicationDbContext _db;

        public ProductRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Product product)
        {
            var productToUpdate = _db.Products.FirstOrDefault(p => p.Id == product.Id);

            if (productToUpdate != null)
            {
                productToUpdate.Title = product.Title;
                productToUpdate.Description = product.Description;
                productToUpdate.ISBN = product.ISBN;
                productToUpdate.Price = product.Price;
                productToUpdate.Author = product.Author;
                productToUpdate.CategoryId = product.CategoryId;
                productToUpdate.CoverTypeId = product.CoverTypeId;

                if (product.ImageUrl != null)
                {
                    productToUpdate.ImageUrl = product.ImageUrl;
                }
            }
        }
    }
}
