const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const payment = async (req, res, next) => {
  const { product, token } = req.body;

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "egp",
          customer: customer.id,
          receipt_email: token.email,
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

const pay = async (req, res, next) => {
  try {
    const { totalPrice, email } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "EGP",
            unit_amount: totalPrice * 100,
            product_data: {
              name: email,
            },
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/sign-up",
    });
    if (session) {
      req.session = session.id;
      next();
    } else {
      const error = new Error("Cannot complete transaction");
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

const refund = async (req, res, next) => {
  try {
    const { chargeId } = req.body;
    let refund;
    if (req.body.amount) {
      refund = await stripe.refunds.create({
        charge: chargeId,
        amount: req.body.amount * 100,
      });
    } else {
      refund = await stripe.refunds.create({
        charge: chargeId,
      });
      if (refund) {
        req.refund = refund;
        next();
      } else {
        const error = new Error("Cannot refund");
        next(error);
      }
    }
  } catch (err) {
    next(err);
  }
};

const payPipeline = [pay];

const refundPipeline = [refund];

module.exports = {
  payPipeline,
  refundPipeline,
};
