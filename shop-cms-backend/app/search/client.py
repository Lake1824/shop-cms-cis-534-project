from logging import Logger
from os import environ
from typing import Any

from elasticsearch import Elasticsearch, RequestsHttpConnection
import app.search.queries as queries


class ElasticsearchClient:
    def __init__(self, logger: Logger):
        self.logger = logger
        self.host = environ.get('ES_HOST', 'elasticsearch-cluster')
        self.port = environ.get('ES_PORT', '9200')
        self.es_client = self.create_elasticsearch_client()

    def create_elasticsearch_client(self) -> Elasticsearch | None:
        try:
            self.logger.info("Creating Elasticsearch client")
            es_client: Elasticsearch = Elasticsearch(
                hosts=[{"host": self.host, "port": self.port}],
                connection_class=RequestsHttpConnection,
            )
            self.logger.info("Done creating Elasticsearch client")

            if es_client.ping():
                self.logger.info("Successfully connected to the Elasticsearch cluster")

                return es_client
            else:
                self.logger.error("Ping to Elasticsearch cluster failed")

        except ConnectionError as e:
            self.logger.error("Failed to connect to Elasticsearch: %s", e)

        return None

    def get_all(self, index_name: str, query: dict = None)-> list[dict[str, Any]]:
        if query is None:
            resp = self.es_client.search(index=index_name, body=queries.get_all_docs_query())
        else:
            resp = self.es_client.search(index=index_name, body=query)

        return resp['hits']['hits']

    def get(self, index_name: str, id: str)-> dict[str, Any]:
        return self.es_client.get(index=index_name, id=id)

    def update(self, index_name: str, body: dict[str, Any]) -> None:
        self.es_client.index(index=index_name, id=body['id'], document=body)

    def create(self, index_name: str, body: dict[str, Any]) -> dict[str, Any]:
        return self.es_client.index(index=index_name, document=body)

    def delete(self, index_name: str, id: str) -> None:
        self.es_client.delete(index=index_name, id=id)

    def search(self, index_name: str, query: dict[str, Any]) -> dict[str, Any]:
        return self.es_client.search(index=index_name, body=query)['hits']['hits']
