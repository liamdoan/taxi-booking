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
        <ClerkProvider>
            <header>
                <NavBar />
            </header>
            <main>{children}</main>
        </ClerkProvider>
    );
}
