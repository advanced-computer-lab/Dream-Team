const express = require("express");
const userController = require("../Controller/UserController");
const flightRouter = express.flightRouter();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid");

flightRouter.post("/pay", async (req, res) => {
const { product, token, email } = req.body;

return stripe.customers
.create({
email,
source: token.id,
email,
})
.then((customer) => {
stripe.charges
.create({
amount: product.price * 100,
currency: "egp",
customer: customer.id,
receipt_email: email,
})
.then((result) => {
console.log(result);
res.status(200).json({
charge: result,
});
});
})
.catch((err) => console.log(err));
});

flightRouter.post("/refund", userController.refundPipeline, async (req, res) => {
res.status(201).json({
message: "Refunded successfully",
refund: req.refund,
});
});

module.exports = flightRouter;