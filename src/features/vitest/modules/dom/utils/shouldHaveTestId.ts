import { screen } from "@testing-library/react";
import { expect } from "vitest";

export function shouldHaveTestId(...ids: string[]) {
  const testElements = ids.map((id) => screen.getByTestId(id));

  testElements.forEach((element) => expect(element).toBeInTheDocument());
  return testElements;
}
