// import { ClerkProvider } from "@clerk/nextjs";
// import NavBar from "@/app/client-app/components/NavBar";
import type { Metadata } from 'next';
import DigitCodeAuthProviderWrapper from '../shared/components/digitCodeAuth/DigitCodeAuthProviderWrapper';

export const metadata: Metadata = {
    title: 'Splash Cab - Drivers',
    description: 'Driver view',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // <ClerkProvider>
        <DigitCodeAuthProviderWrapper>
            <div>
                {/* <header> */}
                {/* <NavBar /> */}
                {/* </header> */}
                <main>{children}</main>
            </div>
        </DigitCodeAuthProviderWrapper>
        // </ClerkProvider>
    );
}
