const express = require("express");
const userController = require("../Controller/UserController");
const flightRouter = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


flightRouter.post("/pay", async (req, res, next) => {
    try {
        console.log('should be called')
        const { totalPrice, name, email } = req.body;
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency: "EGP",
                unit_amount: parseFloat(totalPrice) * 100,
                product_data: {
                  name,
                },
              },
              quantity: 1,
            },
          ],
          customer_email: email,
          success_url: "http://localhost:3000/user_home?success=true",
          cancel_url: "http://localhost:3000/user_home?success=false",
        });
        if (session) {
            res.redirect(303, session.url);
        } else {  
          const error = new Error("Cannot complete transaction");
          next(error);
        }
      } catch (err) {
        next(err);
      }
});

// flightRouter.post("/pay", async (req, res) => {
//   const { product, token, email } = req.body;

//   return stripe.customers
//     .create({
//       email,
//       source: token.id,
//       email,
//     })
//     .then((customer) => {
//       stripe.charges
//         .create({
//           amount: product.price * 100,
//           currency: "egp",
//           customer: customer.id,
//           receipt_email: email,
//         })
//         .then((result) => {
//           console.log(result);
//           res.status(200).json({
//             charge: result,
//           });
//         });
//     })
//     .catch((err) => console.log(err));
// });

flightRouter.post(
  "/refund",
//   userController.refundPipeline,
  async (req, res) => {
    res.status(201).json({
      message: "Refunded successfully",
      refund: req.refund,
    });
  }
);

module.exports = flightRouter;
