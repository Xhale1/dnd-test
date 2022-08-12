import { act, render } from "@testing-library/react";
import React from "react";
import { invariant } from "../../../../../src/invariant";
import type { SensorAPI } from "../../../../../src/types";
import App from "../../util/app";
import type { Control } from "../../util/controls";
import { forEachSensor, simpleLift } from "../../util/controls";
import { isDragging } from "../../util/helpers";

forEachSensor((control: Control) => {
  it("should cleanup a drag if a lock is forceably released mid drag", () => {
    const sensor = jest.fn<void, [SensorAPI]>();

    const { getByText } = render(<App sensors={[sensor]} />);
    const handle: HTMLElement = getByText("item: 0");
    const api: SensorAPI | undefined = sensor.mock.calls[0]?.[0];
    invariant(api);

    simpleLift(control, handle);

    expect(api.isLockClaimed()).toBe(true);
    expect(isDragging(handle)).toBe(true);

    act(() => {
      api.tryReleaseLock();
    });

    expect(api.isLockClaimed()).toBe(false);
    expect(isDragging(handle)).toBe(false);

    // allowing reclaiming after
    simpleLift(control, handle);

    expect(api.isLockClaimed()).toBe(true);
    expect(isDragging(handle)).toBe(true);
  });
});
