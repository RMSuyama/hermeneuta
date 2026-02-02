import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ title, author, price, link, image }) => {
    return (
        <div className="product-card-premium">
            <div className="product-img-container">
                <img src={image} alt={title} />
            </div>
            <div className="product-info-premium">
                <h4>{title}</h4>
                <span className="product-author">{author}</span>
                {price && <span className="product-price">{price}</span>}
                <a href={link} target="_blank" rel="noopener noreferrer" className="buy-btn-amazon">
                    Ver na Amazon <ShoppingCart size={16} />
                </a>
            </div>
            <style jsx>{`
        .product-card-premium {
          background: var(--color-background);
          border: 1px solid var(--color-border);
          padding: 1.5rem;
          display: flex;
          gap: 1.5rem;
          align-items: center;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .product-card-premium:hover {
          border-color: var(--color-accent);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transform: translateY(-5px);
        }

        body.dark-mode .product-card-premium:hover {
          box-shadow: 0 10px 30px rgba(250, 204, 21, 0.05);
          border: 1px solid var(--color-accent);
        }

        .product-img-container {
          width: 100px;
          height: 140px;
          flex-shrink: 0;
          box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
        }

        .product-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info-premium {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .product-info-premium h4 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          margin: 0;
          color: var(--color-primary);
        }

        .product-author {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .product-price {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--color-accent);
        }

        .buy-btn-amazon {
          margin-top: 0.5rem;
          background: #ff9900;
          color: white;
          text-decoration: none;
          padding: 0.6rem 1.2rem;
          font-size: 0.85rem;
          font-weight: 800;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: fit-content;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .buy-btn-amazon:hover {
          background: #e68a00;
        }

        @media (max-width: 480px) {
          .product-card-premium { flex-direction: column; text-align: center; }
          .buy-btn-amazon { margin: 0.5rem auto 0; }
        }
      `}</style>
        </div>
    );
};

export default ProductCard;
