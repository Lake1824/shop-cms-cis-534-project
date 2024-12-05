from dataclasses import dataclass
from datetime import datetime


@dataclass
class Feedback:
    id: str = ""
    restaurant_id: str = ""
    rating: int = None
    comment: str = ""
    featured: bool = False
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
