import json

from elasticsearch import RequestsHttpConnection
from elasticsearch.client import Elasticsearch

RESTAURANT_INDEX_NAME = "restaurant"
MENU_INDEX_NAME = "menu"
FEEDBACK_INDEX_NAME = "feedback"

def get_es_client():
    es_client = Elasticsearch(
        hosts=[{"host": "elasticsearch-cluster", "port": 9200}],
        connection_class=RequestsHttpConnection,
    )

    if es_client.ping():
        print("Successfully pinged cluster")
        return es_client
    else:
        print("Failed to ping cluster")

    return es_client

def create_es_index(client, index_name):
    client.indices.create(index=index_name, body=get_index_settings(index_name))
    client.indices.put_mapping(index=index_name, body=get_index_mapping(index_name))

def get_index_settings(index_name):
    with open(f"./scripts/es_index_settings_and_mappings/{index_name}_settings.json", "r") as file:
        index_settings = json.load(file)

    return index_settings

def get_index_mapping(index_name):
    with open(f"./scripts/es_index_settings_and_mappings/{index_name}_mapping.json", "r") as file:
        index_mapping = json.load(file)

    return index_mapping


if __name__ == "__main__":
    print("Creating Elasticsearch client")
    es_client = get_es_client()
    print("Done creating Elasticsearch client")

    print("Creating Elasticsearch indices")
    create_es_index(es_client, RESTAURANT_INDEX_NAME)
    create_es_index(es_client, MENU_INDEX_NAME)
    create_es_index(es_client, FEEDBACK_INDEX_NAME)
    print("Done creating indices")
