from dataclasses import dataclass
from datetime import datetime

from app.models.hours import Hours

@dataclass
class Restaurant:
    name: str
    street: str
    city: str
    state: str
    zipcode: str
    id: str = ""
    description: str = ""
    facebook_link: str = ""
    x_link: str = ""
    instagram_link: str = ""
    hours: Hours = None
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
