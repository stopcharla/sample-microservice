'use strict';
// const util = require('util');
const config = require('../config/config');
const BaseController = require('./base.controller');
const HttpStatus = require('http-status');
const User = require('../models').users;
const mongoose = require('mongoose');
const uuid = require('node-uuid');
mongoose.Promise = require('bluebird');

require('../messageQ/receiver.js').getConnection();


class UsersController extends BaseController {

    constructor() {
        super();
    }

    /**
     * Function to add a user
     * @param {*} req 
     * @param {*} res 
     */
    addUser(req, res) {
        const body = req.body;
        const uniqueId = uuid.v4();
        var user = new User(body);
        user.userId = uniqueId;

        user.save().then((docs) => {
            res.json(super.getSuccessResponse(docs));
        }).catch((err) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(super.getErrorResponse(err));
        });
    }

    getUser(req,res){
        var userId = req.params.userId;
        User.find({userId:userId}).exec().then((docs)=>{
            if(docs.length > 0){
                res.json(super.getSuccessResponse(docs));
            }else{
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(super.getErrorResponse("user not found"));
            }
            
        }).catch((err) => {
            console.log("error ocurred while fetching user from db");
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(super.getErrorResponse(err));
        });
    }

}

module.exports = UsersController;