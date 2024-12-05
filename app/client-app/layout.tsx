import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/app/client-app/components/NavBar";

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
