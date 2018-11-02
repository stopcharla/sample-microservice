const expect = require('chai').expect;
const request = require('request');
const baseUrl = 'http://localhost:8080/'
const userPath = 'user/'
const orderPath = 'order/'
const uuid = require('node-uuid');


describe("checking the rest api's",() => {
    var currentUser;
    it("checking add user api",(done) => {
        let data = {
            firstName:"Doney",
            lastName:"Alex",
            emailId:"doneyalex@testmail.com",
        }
        request.post({url:baseUrl+userPath+"add",form:data},(err, response, body) => {
            body = JSON.parse(body)
            console.log(body.userId);
            expect(response.statusCode).to.equal(200);
            expect(body.userId).to.not.equal(null);
            currentUser = body.body;
            done();
        });
    })

    it("checking get user api",(done) => {
        request(baseUrl+userPath+currentUser.userId,(err, response, body) => {
            console.log(body);
            body = JSON.parse(body)
            expect(response.statusCode).to.equal(200);
            expect(body.userId).to.not.equal(null);
            done();
        });
    })

    it("placing order for valid user",(done) => {
        let data = {
            orderId: uuid.v4(),
            orderedFrom: "Le Charcoal",
            orderedItems: ["bbq chicken burger","chicken wings"],
            amount: 520,
        }
        console.log(currentUser)
        url = baseUrl+orderPath+currentUser.userId+'/add';
        console.log("url is:",url);
        
        request.post({url:url,form:data},(err, response, body) => {
            body = JSON.parse(body)
            console.log(body.body);
            expect(response.statusCode).to.equal(200);
            done();
        });
    })

    it("placing order for invalid user",(done) => {
        let data = {
            orderId: uuid.v4(),
            orderedFrom: "Le Charcoal",
            orderedItems: ["bbq chicken burger","chicken wings"],
            amount: 520,
        }
        url = baseUrl+orderPath+currentUser.user+'/add';
        console.log("url is:",url);
        
        request.post({url:url,form:data},(err, response, body) => {
            // body = JSON.parse(body)
            console.log(body);
            expect(response.statusCode).to.equal(400);
            done();
        });

    })
})