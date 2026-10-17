import type { TEXT_MATCHER } from "@/shared/regex";
import { shouldGetByText } from "./shouldGetByText";

export const shouldSee = (...texts: TEXT_MATCHER[]) => {
  return shouldGetByText(...texts).map(({ expected, element }) => {
    expected.toBeInTheDocument();
    return element!;
  });
};
