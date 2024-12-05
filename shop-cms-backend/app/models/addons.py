from dataclasses import dataclass
from app.models.addon import Addon

@dataclass
class Addons:
   addons: list[Addon]
