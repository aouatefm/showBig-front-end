import React from 'react';
import Carousel from "./Carousel/Carousel";
import NewReleases from "./NewReleases/NewReleases";
import ProductGrid from "./ProductGrid/ProductGrid";

const Home = (props) => (
    <div>
        <main role="main">
            <Carousel />
        </main>
        <section>
            <NewReleases />
            <ProductGrid />
        </section>
    </div>
);

export default Home;