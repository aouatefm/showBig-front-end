
import React from "react";
import '@testing-library/jest-dom'
import {shallow} from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AdminDashboard from "./AdminDashboard";


configure({ adapter: new Adapter() });
it("Admin Dashboard renders without crashing", () => {
    shallow(<AdminDashboard />);
});
