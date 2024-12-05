import re

from werkzeug.exceptions import BadRequest

ELASTICSEARCH_ID_REGEX: re = r'^[a-zA-Z0-9_-]{20,}$'

def verify_es_id_format(doc_id: str) -> bool:
    if not re.match(ELASTICSEARCH_ID_REGEX, doc_id):
        raise BadRequest

    return True
