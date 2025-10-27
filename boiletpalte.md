# VOLTO Monorepo


- fix the problem when refreshing the page , some race condtioning in the auth context and loadnig false in react boilerplate 
- change apiGateway to apiRoutes and make apiSerivce absctract and api cersive to each model that utilizes apiService
- maybe add zod for api response body schema validation in the dev mode
- add a sonner displaying the url , api Method(get,post,etc) and the payload of a request (smilair to rest Cleint Vs code ) to inspect any request directly upon sneding it without the need to navigate to network in the inspect
