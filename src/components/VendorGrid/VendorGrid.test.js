import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import VendorGrid from "./VendorGrid";



describe.only("VendorGrid", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    })
    afterAll(() => {
        jest.useRealTimers()
    })
    it("shows Loading vendors", async () => {
        render(<VendorGrid />);
        jest.advanceTimersByTime(3000);
    });
});

