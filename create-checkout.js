import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  pro_monthly: 'price_1TFGLG2UdgdBG3DygiWNVzMT',
  team_annual: 'price_1TFGU62UdgdBG3Dyx4SHcPSY',
  company_annual: 'price_1TFGWu2UdgdBG3DyaMhUbVBZ',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan, email } = req.body;

  if (!plan || !PRICE_IDS[plan]) {
    return res.status(400).json({ error: 'Invalid plan' });
  }

  try {
    const isRecurring = plan === 'pro_monthly';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: isRecurring ? 'subscription' : 'payment',
      customer_email: email || undefined,
      line_items: [
        {
          price: PRICE_IDS[plan],
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: { plan },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
