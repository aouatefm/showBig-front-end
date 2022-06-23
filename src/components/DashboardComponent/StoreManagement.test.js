import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'

import StoreManagement from "./StoreManagement";
import {store} from "../../redux/store";
import {Provider} from "react-redux";

describe.only("StoreManagement", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    })
    afterAll(() => {
        jest.useRealTimers()
    })
    it("shows Store Management", async () => {
        render(<Provider store={store}><StoreManagement /></Provider>);
        jest.advanceTimersByTime(3000);
    });
});