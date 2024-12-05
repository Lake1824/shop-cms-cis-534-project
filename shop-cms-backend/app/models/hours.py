from dataclasses import dataclass
from app.models.hour import Hour

@dataclass
class Hours:
    hours: list[Hour] = None
