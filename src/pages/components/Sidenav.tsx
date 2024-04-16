export const Sidenav = () => {
  return (
    <div className="finder-notes">
      <p className="note">
        Highly experimental! Don&apos;t be surprised if things are wrong, for
        any feedback find me on FSE&apos;s Discord (Nordic-FSE)
      </p>
      <h2>About fuel burn</h2>
      <p>
        FSEconomy will check that you use{" "}
        <em>around the same amount of fuel as your aliased model, or more</em>.
      </p>
      <p>
        If you burn more you&apos;ll always be fine, just try not to burn too
        little.{" "}
      </p>
      <p>
        Check the GPH of your aliased plane, if your model burns less, try to
        burn as much as possible to get close to it.
      </p>
      <p>
        <a
          href="https://sites.google.com/site/fseoperationsguide/aircraft/time-and-fuel-requirements"
          target="_blank"
          rel="noreferrer"
        >
          Fuel burn information on the FSE Manual
        </a>
      </p>
    </div>
  );
};
