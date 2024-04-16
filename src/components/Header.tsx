import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/">
          <em>FSE</em> Alias Finder <sup>Beta</sup>
        </Link>
      </h1>
      <p>Data last updated: 30/01/2022</p>
    </header>
  );
};
