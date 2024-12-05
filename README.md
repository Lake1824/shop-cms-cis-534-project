# cis-534-group-project

## Shop CMS Backend Setup (Mac OS)
#### Elasticsearch cluster
1. Download and Install [Docker Desktop](https://www.docker.com/) and [Xcode Command Line Tools](https://mac.install.guide/commandlinetools/)
2. Navigate to the _shop-cms-backend_ directory
3. Run the command `make run-es-cluster` to start up an Elasticsearch cluster
4. After the cluster starts up, run the command `make setup-es-cluster` to create and setup the indices
5. **Optional** Run the command `make index-sample-data` to index sample data for restaurants, menus, and feedback

#### Kibana
Kibana is another Elastic tool which allows you to visualize the data in an Elasticsearch cluster. You can use the dev tools
to query the data.
1. Run the command `make run-kibana` to start up Kibana
2. In a browser go to http://0.0.0.0:5601/app/home#/ to use Kibana

### API
The API will be exposed from the port `8000`
1. Run the command `make run-api` to start up the API

## Shop CMS Frontend Setup
1. After the backend Elasticsearch and API are setup and running navigate to the _shop-cms-frontend_ directory
2. Make a `.env.local` file
3. Inside the file add this:
```
AUTH0_SECRET=XXX
AUTH0_BASE_URL=XXX
AUTH0_ISSUER_BASE_URL=XXX
AUTH0_CLIENT_ID=XXX
AUTH0_CLIENT_SECRET=XXX
```
4. Ask @Lake1824 to give you the values to those env vars
4. Run the command `npm run dev`
5. Navigate to http://localhost:3000/ to see the Next.JS website
6. Ask @Lake1824 to make you a Auth0 account

