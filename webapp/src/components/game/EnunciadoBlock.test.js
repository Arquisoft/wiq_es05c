import { render } from "@testing-library/react";
import { EnunciadoBlock } from "./EnunciadoBlock";

describe("EnunciadoBlock", () => {
  it("renders the question correctly", () => {
    const pregunta = "What is the capital of France?";
    const darkMode = { darkMode: false };

    const { getByText } = render(
      <EnunciadoBlock pregunta={pregunta} darkMode={darkMode} />
    );

    expect(getByText(pregunta)).toBeInTheDocument();
  });

  it("renders with the correct text color in dark mode", () => {
    const pregunta = "What is the capital of France?";
    const darkMode = { darkMode: true };

    const { getByText } = render(
      <EnunciadoBlock pregunta={pregunta} darkMode={darkMode} />
    );

    expect(getByText(pregunta)).toHaveStyle({ color: "#FCFAF0" });
  });

  it("renders with the correct text color in light mode", () => {
    const pregunta = "What is the capital of France?";
    const darkMode = { darkMode: false };

    const { getByText } = render(
      <EnunciadoBlock pregunta={pregunta} darkMode={darkMode} />
    );

    expect(getByText(pregunta)).toHaveStyle({ color: "#08313A" });
  });
});