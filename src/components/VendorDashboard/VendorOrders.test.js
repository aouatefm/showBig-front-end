import React from "react";
import '@testing-library/jest-dom'
import VendorOrders from "./VendorOrders";
import {shallow} from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {store} from "../../redux/store";
import {Provider} from "react-redux";
configure({ adapter: new Adapter() });
it("Vendor orders renders without crashing", () => {
    shallow(<Provider store={store}><VendorOrders /></Provider>);
});

