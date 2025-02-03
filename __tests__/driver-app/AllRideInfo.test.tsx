import AllRideInfo from "@/app/driver-app/components/AllRideInfo";
import { useDigitCodeAuthContext } from "@/app/shared/context/DigitCodeAuthContext";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

jest.mock("../../app/shared/context/DigitCodeAuthContext", () => ({
    useDigitCodeAuthContext: jest.fn()
}));

const mockAllRideInfoData = [
    {
        guestName: "Guest 1",
        pickup: "Pickup address",
        Drop: "Drop address",
        pickupTime: "3PM",
        pickupDay: "day -1",
        isRideReveived: false,
        idRideFinished: false
    }
]

describe("AllRideInfo component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("show spinner while fetching data", () => {
        (useDigitCodeAuthContext as jest.Mock).mockReturnValue({
            isAuthorizedDriver: true,
            setIsAuthorizedDriver: jest.fn()
        });

        global.fetch = jest.fn(() => new Promise(() => {})); //mock fetching that never resolves the promise

        render(<AllRideInfo />);

        expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    test("show all ride info after fetching ok", async () => {
        (useDigitCodeAuthContext as jest.Mock).mockReturnValue({
            isAuthorizedDriver: true,
            setIsAuthorizedDriver: jest.fn()
        });

        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockAllRideInfoData)
        } as Response ));

        render(<AllRideInfo />);

        await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"));

        expect(screen.getAllByTestId("ride-info-section").length).toBeGreaterThan(0);
    });
});
