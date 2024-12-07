(On-going) beta version of a car/taxi booking app built with NextJS, Tailwind, MapLibre for map, and MongoDB for database. Traveling route, price calculation are handled and displayed after user's selection. This project is initially for private event, which is suitable for those having their own cars/cabs to transport guests and attendees.

The project has 2 separate views:

- client view (for users): where booking form and map are placed.
- driver view: where drivers and admins can see ride details.

Driver view provides data about rides (pickup/dropping point, time, distance, ...). Drivers can see:

- ride booked details.
- if ride is received (drivers control).
- if ride is finished (drivers control).

Frontend aims to providing:

- good and clear UI.
- using as much Context and reusabled component as possible.

Backend focuses on:

- building custom API to fetch data.
- building custom hook to reuse function in multiple components.
- building API to handle CRUD operations.
- (for future) managing auth methods to manage roles (users, drivers, admins)

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
