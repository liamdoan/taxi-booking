import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AutoSearchAddress from "@/app/client-app/components/booking-section/AutoSearchAddress";
import { TestContextProvider } from "../TestContextProvider";

const mockSuggestedList = [
    {display_name: "Kokkola"},
    {display_name: "Kotka"},
    {display_name: "Kouvola"}
];

describe("tests for AutoSearchAdress component", () => {
    beforeAll(() => {
        Object.defineProperty(global.navigator, 'geolocation', {
            writable: true,
            value: {
                getCurrentPosition: jest.fn((success) => {
                    // Simulate 1s delayed in response until the fetching is ok
                    setTimeout(() => {
                        success({
                            coords: {latitude: 60.17042546551415, longitude: 24.94102441863807},
                        });
                    }, 1000);
                }),
                watchPosition: jest.fn(),
                clearWatch: jest.fn(),
            },
        });
    });

    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
    });

    test("show Your Location options when clicking inputs", () => {
        render (
            <TestContextProvider>
                <AutoSearchAddress />
            </TestContextProvider>
        );

        fireEvent.focus(screen.getByTestId("input-pickup-address"));
        expect(screen.getByTestId("label-your-location-pickup")).toBeInTheDocument();
        

        fireEvent.focus(screen.getByTestId("input-drop-address"));
        expect(screen.getByTestId("label-your-location-drop")).toBeInTheDocument();
    });

    test("show Your Location when input value is empty", () => {
        render (
            <TestContextProvider>
                <AutoSearchAddress />
            </TestContextProvider>
        );

        fireEvent.change(screen.getByTestId("input-pickup-address"), {target: {value: "Helsinki"}});
        expect(screen.queryByTestId("label-your-location-pickup")).not.toBeInTheDocument();

        fireEvent.change(screen.getByTestId("input-pickup-address"), {target: {value: ""}});
        expect(screen.getByTestId("label-your-location-pickup")).toBeInTheDocument();

        fireEvent.change(screen.getByTestId("input-drop-address"), {target: {value: "Espoo"}});
        expect(screen.queryByTestId("label-your-location-drop")).not.toBeInTheDocument();

        fireEvent.change(screen.getByTestId("input-drop-address"), {target: {value: ""}});
        expect(screen.getByTestId("label-your-location-drop")).toBeInTheDocument();
    });

    test("get rid of Your Location when input has some values", () => {
        render (
            <TestContextProvider>
                <AutoSearchAddress />
            </TestContextProvider>
        );

        fireEvent.change(screen.getByTestId("input-pickup-address"), {target: {value: "Helsinki"}});
        expect(screen.queryByTestId("label-your-location-pickup")).not.toBeInTheDocument();

        fireEvent.change(screen.getByTestId("input-drop-address"), {target: {value: "Espoo"}});
        expect(screen.queryByTestId("label-your-location-drop")).not.toBeInTheDocument();
    });

    test("show suggested list if data can be fetched with user input", async () => {
        //mock fetching data if user input is probable for fetching
        global.fetch = jest.fn((url) => {
            const urlToString = typeof url === "string" ? url : url.toString();

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(
                    urlToString.includes("ko") ? mockSuggestedList : []
                )
            } as Response );
        });

        render (
            <TestContextProvider>
                <AutoSearchAddress />
            </TestContextProvider>
        );

        fireEvent.change(screen.getByTestId("input-pickup-address"), {target: {value: "ko"}});

        // in the logics, there is a 1s delay before the getSuggestedAddresses function is called.
        // jest.runAllTimers() function simulates all the timer immediately, meaning that the 
        // getSuggestedAddresses is simulated to called immediately without delay.
        jest.runAllTimers();

        await waitFor(() => {
            expect(screen.getByText("Kokkola")).toBeInTheDocument();
            expect(screen.getByText("Kotka")).toBeInTheDocument();
            expect(screen.getByText("Kouvola")).toBeInTheDocument();
        })
    });

    test("not show suggested list if data can't be fetched with user input", async () => {
        //mock fetching data if user input is probable for fetching
        global.fetch = jest.fn((url) => {
            const urlToString = typeof url === "string" ? url : url.toString();

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(
                    urlToString.includes("ko") ? mockSuggestedList : []
                )
            } as Response );
        });

        render (
            <TestContextProvider>
                <AutoSearchAddress />
            </TestContextProvider>
        );

        fireEvent.change(screen.getByTestId("input-pickup-address"), {target: {value: "ajshdkj"}});

        // in the logics, there is a 1s delay before the getSuggestedAddresses function is called.
        // jest.runAllTimers() function simulates all the timer immediately, meaning that the 
        // getSuggestedAddresses is simulated to called immediately without delay.
        jest.runAllTimers();

        await waitFor(() => {
            expect(screen.queryByText("Kokkola")).not.toBeInTheDocument();
            expect(screen.queryByText("Kotka")).not.toBeInTheDocument();
            expect(screen.queryByText("Kouvola")).not.toBeInTheDocument();
        })
    });
});
