import {Switch, Route} from 'react-router-dom';
import Header from "./components/header/header.component";
import Vendor from "./components/store/store.component";

function App() {
    return (
        <div className="App">
            <header>
                <Header/>
            </header>
            <main>
                <div id='content-wrap'><Switch>
                    <Route path='/store-listing' component={Vendor}/>
                </Switch>
                </div>
                {/*<Footer/>*/}
            </main>
        </div>

    );
}

export default App;
