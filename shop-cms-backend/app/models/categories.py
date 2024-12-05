from dataclasses import dataclass
from app.models.category import Category

@dataclass
class Categories:
    categories: list[Category]
