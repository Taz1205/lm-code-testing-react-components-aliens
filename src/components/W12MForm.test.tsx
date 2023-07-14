import { render } from "@testing-library/react";
import { W12MForm } from "./W12MForm";

test("renders form element", () => {
  const mockOnSubmit = jest.fn();
  // we can hold onto the object returned from render()
  // this object has a container property that we can destructure and inspect
  const { container } = render(<W12MForm onSubmit={mockOnSubmit} />);

  // the container is just a normal DOM element, so we can look at normal properties like '.firstChild'
  // for example, the firstChild of our container should be our form element
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toHaveClass("w12MForm");
});
