// import { ClerkProvider } from "@clerk/nextjs";
// import NavBar from "@/app/client-app/components/NavBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // <ClerkProvider>
        <div>
            {/* <header> */}
                {/* <NavBar /> */}
            {/* </header> */}
            <main>{children}</main>
        </div>
        // </ClerkProvider>
    );
}
