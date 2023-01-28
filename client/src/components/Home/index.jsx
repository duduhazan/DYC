import { Card } from "../Card";
import "./style.css";

export const Home = () => {
  return (
    <main role="main">
      <section className="jumbotron text-center">
        <div className="container">
          <br />
          <h1 className="jumbotron-heading">Design Your Cards</h1>
          <h2 className="lead">
            Here you can design your own business cards, here are a few examples
          </h2>
        </div>
      </section>

      <Card />
    </main>
  );
};


