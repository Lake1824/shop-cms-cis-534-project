network: ## Creates shop-cms docker network
	@docker network create -d bridge shop-cms || true

run-api: network ## Runs API
	@docker-compose up --build shop-cms-api

run-es-cluster: network ## Starts up a ElasticSearch cluster
	@docker-compose up --build elasticsearch-cluster

run-kibana: network ## Starts up Kibana
	@docker-compose up --build kibana

setup-es-cluster: network ## Sets up the ElasticSearch cluster
	@docker-compose run --rm elasticsearch-config python3 ./scripts/setup_es_cluster.py

index-sample-data: network ## Index sample data into the ElasticSearch cluster
	@docker-compose run --rm elasticsearch-config python3 ./scripts/index_sample_data.py

stop: ## Stops the API and ElasticSearch Cluster
	@docker-compose down
