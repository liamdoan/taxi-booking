import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripeSecretKey! as string, {
    typescript: true,
    apiVersion: "2024-11-20.acacia"
})

export async function POST(request: any) {
    const data = await request.json();
    const amount = data.amount;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount),
            currency: 'EUR'
        })
        return NextResponse.json(paymentIntent.client_secret, {
            status: 200
        })
    } catch(err: any) {
        return new NextResponse(err, {
            status: 400
        })
    }
}
