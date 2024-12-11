import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import NavBar from "@/app/client-app/components/NavBar";

export const metadata: Metadata = {
    title: "Splash Cab - Form",
    description: "Booking form",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <header>
                <NavBar />
            </header>
            <main>{children}</main>
        </ClerkProvider>
    );
}
