import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: /FSE Alias Finder/ }),
  ).toBeInTheDocument();
});
