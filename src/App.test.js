import React from 'react'
import App from './App'
import {store} from './redux/store'
import { Provider } from 'react-redux';

import {render as rtlRender} from'@testing-library/react'

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

describe("App render", () => {
    it('renders without crashing',()=>{
        render(<App/>)
    })
})

