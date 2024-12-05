from dataclasses import dataclass
from datetime import datetime

from app.models.products import Products
from app.models.categories import Categories

@dataclass
class Menu:
    restaurant_id: str
    name: str
    id: str = ""
    products: Products = None
    categories: Categories = None
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
