from dataclasses import dataclass
from app.models.product import Product

@dataclass
class Products:
    products: list[Product]
