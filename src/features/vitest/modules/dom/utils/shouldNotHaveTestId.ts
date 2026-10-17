import { screen } from "@testing-library/react";
import { expect } from "vitest";

export function shouldNotHaveTestId(...ids: string[]) {
  const testElements = ids.map((id) => screen.queryByTestId(id));

  testElements.forEach((element) => expect(element).not.toBeInTheDocument());
  return testElements;
}
