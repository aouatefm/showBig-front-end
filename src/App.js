import NavbarC from "./components/NavBar/Navbar";
import Carousel from "./containers/carousel/Carousel";
import ProductGrid from './containers/ProductGrid/ProductGrid';
import NewReleases from "./containers/NewReleases/NewReleases";

function App() {
    return (
        <div className="App">
          <NavbarC/>
            <main role="main">
                <Carousel />
            </main>
            <section>
                <NewReleases />
                <ProductGrid />
            </section>
        </div>

    );
}

export default App;
