from dataclasses import dataclass

@dataclass
class Hour:
    opening: int
    closing: int
    day_of_week: str
