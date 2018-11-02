const UsersController = require('./users.controller');
const OrdersController = require('./orders.controller');

module.exports = {
	getUsersController: function getUsersController () {
		return new UsersController();
	},
	getOrdersController: function getOrdersController(){
		return new OrdersController()
	}
};
