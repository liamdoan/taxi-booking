import Home from "@/app/driver-app/page";
import { useDigitCodeAuthContext } from "@/app/shared/context/DigitCodeAuthContext";
import { render, screen } from "@testing-library/react";

jest.mock("../../app/shared/context/DigitCodeAuthContext", () => ({
    useDigitCodeAuthContext: jest.fn()
}));

describe("test for drive-app homepage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("render pincode page when provided pincode is wrong", () => {
        (useDigitCodeAuthContext as jest.Mock).mockReturnValue({
            isAuthorizedDriver: false,
            setIsAuthorizedDriver: jest.fn()
        });

        render(<Home />);

        expect(screen.queryByTestId("all-ride-info")).not.toBeInTheDocument();
        expect(screen.getByTestId("driver-auth-page")).toBeInTheDocument();
    });

    test("render AllRideInfo component when provided pincode is correct", () => {
        (useDigitCodeAuthContext as jest.Mock).mockReturnValue({
            isAuthorizedDriver: true,
            setIsAuthorizedDriver: jest.fn()
        });

        render(<Home />);

        expect(screen.getByTestId("all-ride-info")).toBeInTheDocument();
        expect(screen.queryByTestId("driver-auth-page")).not.toBeInTheDocument();
    });
});
