from dataclasses import dataclass
from app.models.addons import Addons

@dataclass
class Product:
    name: str
    description: str
    price: float
    menu_category_name: str
    addons: list[Addons]
