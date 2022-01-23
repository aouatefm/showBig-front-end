import React from "react";
import '@testing-library/jest-dom'
import {shallow} from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProductRating from "../../components/ProductRating/ProductRating";


configure({ adapter: new Adapter() });
it("Product Rating renders without crashing", () => {
    shallow(<ProductRating />);
});