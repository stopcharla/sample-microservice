# sample-microservice
This project is a sample to implement a simple micro service architecture using rabbitmq platform.

The api's provided are add user and get user along with add order.
Once the order is added it is passed on for processing in next service, the next service puts it back to the queue. This processed can be done for as many services using the same architecture.

The dependencies are rabbitmq server and its python wrapper, mongodb
To run the service:
Api server:
clone the repo
cd service-1
npm install
node main.js
npm test <to verfiy if everything is working fine>
 
 
 Service-2:
 cd service-2
 python main.js
