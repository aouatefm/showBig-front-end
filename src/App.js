import NavbarC from "./components/NavBar/Navbar";
import Carousel from "./containers/carousel/Carousel";

function App() {
    return (
        <div className="App">
          <NavbarC/>
            <main role="main">
                <Carousel />
            </main>
        </div>

    );
}

export default App;
