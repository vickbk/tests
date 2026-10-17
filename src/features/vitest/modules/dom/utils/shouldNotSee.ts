import { shouldGetByText } from "./shouldGetByText";

export const shouldNotSee = (...texts: (string | RegExp)[]) => {
  shouldGetByText(...texts).forEach(({ expected }) =>
    expected.not.toBeInTheDocument(),
  );
};
