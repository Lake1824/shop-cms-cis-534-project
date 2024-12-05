import json
from operator import index

from elasticsearch import Elasticsearch, RequestsHttpConnection

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

def index_data(es_client, index_name):
    for doc in get_sample_data(index_name):
        es_client.index(index=index_name, body=doc, id=doc["id"])


def get_sample_data(index_name):
    sample_data = []
    with open(f"./scripts/sample_data/{index_name}.txt", "r") as file:
        for line in file:
            sample_data.append(json.loads(line))

    return sample_data

if __name__ == "__main__":
    print("Creating Elasticsearch client")
    es_client = get_es_client()
    print("Done creating Elasticsearch client")

    print("Indexing sample data")
    index_data(es_client, RESTAURANT_INDEX_NAME)
    index_data(es_client, MENU_INDEX_NAME)
    index_data(es_client, FEEDBACK_INDEX_NAME)
    print("Done indexing sample data")
