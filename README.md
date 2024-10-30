# Salary Insights Platform

A comprehensive salary analysis platform with real-time market data and company insights.

## Features

- Real-time salary estimates
- Company comparisons
- Market trends analysis
- Geographic salary distribution
- Token-based premium insights
- Stripe payment integration

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your credentials
3. Install dependencies: `npm install`
4. Run database migrations: `npx prisma migrate dev`
5. Seed the database: `npm run seed`
6. Start the development server: `npm run dev`

## Environment Variables

- `DATABASE_URL`: Your database connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `TOKEN_PRICE_ID`: Your Stripe price ID for tokens

## Deployment

The frontend is deployed on Netlify. The backend needs to be deployed separately on a platform that supports Node.js (e.g., Railway, Heroku, or DigitalOcean).

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request