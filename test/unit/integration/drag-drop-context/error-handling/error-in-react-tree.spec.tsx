import { act, render } from "@testing-library/react";
import React from "react";
import { invariant } from "../../../../../src/invariant";
import { withError } from "../../../../util/console";
import App from "../../util/app";
import { keyboard, simpleLift } from "../../util/controls";
import { isDragging } from "../../util/helpers";

it("should recover from rfd errors", async () => {
  let hasThrown = false;
  function CanThrow(props: { shouldThrow: boolean }) {
    if (!hasThrown && props.shouldThrow) {
      hasThrown = true;
      invariant(false, "throwing");
    }
    return null;
  }

  const { rerender, getByTestId } = render(
    <App anotherChild={<CanThrow shouldThrow={false} />} />
  );

  simpleLift(keyboard, getByTestId("0"));
  expect(isDragging(getByTestId("0"))).toBe(true);

  withError(() => {
    rerender(<App anotherChild={<CanThrow shouldThrow />} />);
  });

  // TODO: Get this working again
  // expect(isDragging(getByTestId("0"))).toBe(false);
});

it("should not recover from non-rfd errors", () => {
  let hasThrown = false;
  function CanThrow(props: { shouldThrow: boolean }) {
    if (!hasThrown && props.shouldThrow) {
      hasThrown = true;
      throw new Error("Boom");
    }
    return null;
  }

  const { rerender, getByTestId } = render(
    <App anotherChild={<CanThrow shouldThrow={false} />} />
  );

  simpleLift(keyboard, getByTestId("0"));
  expect(isDragging(getByTestId("0"))).toBe(true);

  withError(() => {
    rerender(<App anotherChild={<CanThrow shouldThrow />} />);
  });
});

it("should not recover from runtime errors", async () => {
  let hasThrown = false;
  function CanThrow(props: { shouldThrow: boolean }) {
    if (!hasThrown && props.shouldThrow) {
      hasThrown = true;
      // Boom: TypeError
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.foo();
    }
    return null;
  }

  const { rerender, getByTestId } = render(
    <App anotherChild={<CanThrow shouldThrow={false} />} />
  );

  simpleLift(keyboard, getByTestId("0"));
  expect(isDragging(getByTestId("0"))).toBe(true);

  withError(() => {
    act(() => rerender(<App anotherChild={<CanThrow shouldThrow />} />));
  });
});
