// @vitest-environment jsdom
import { fireEvent as rtlFireEvent } from "@testing-library/react";
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";

import { fireEvent } from "./fireEvent";
import * as toggleModule from "./togglePolyfill";
import type { ToggleConfig, ToggleFireEventExtensions } from "./types";

describe("fireEvent", () => {
  const mockedTogglePolyfill = vi.spyOn(toggleModule, "togglePolyfill");

  afterEach(() => {
    mockedTogglePolyfill.mockReset();
  });

  describe("object identity and isolation", () => {
    it("exports an object distinct from Testing Library's fireEvent", () => {
      expect(fireEvent).not.toBe(rtlFireEvent);
    });

    it("does not add the toggle method to the original export", () => {
      expect(Object.hasOwn(rtlFireEvent, "toggle")).toBe(false);
    });

    it("does not mutate the original export when toggle is called", () => {
      mockedTogglePolyfill.mockReturnValue(true);

      fireEvent.toggle(document.body);

      expect(Object.hasOwn(rtlFireEvent, "toggle")).toBe(false);
    });
  });

  describe("standard Testing Library methods", () => {
    it.each([
      "click",
      "change",
      "input",
      "submit",
      "focus",
      "blur",
      "keyDown",
      "keyUp",
      "mouseEnter",
      "mouseLeave",
    ] as const)("preserves the original %s method", (method) => {
      expect(fireEvent[method]).toBe(rtlFireEvent[method]);
    });

    it("dispatches a click through the copied click method", () => {
      const button = document.createElement("button");
      const listener = vi.fn();

      button.addEventListener("click", listener);

      fireEvent.click(button);

      expect(listener).toHaveBeenCalledOnce();
    });

    it("dispatches a change event through the copied change method", () => {
      const input = document.createElement("input");
      const listener = vi.fn();

      input.addEventListener("change", listener);

      fireEvent.change(input, { target: { value: "updated" } });

      expect(listener).toHaveBeenCalledOnce();
      expect(input.value).toBe("updated");
    });

    it("retains the original event method references", () => {
      expect(fireEvent.click).toBe(rtlFireEvent.click);
      expect(fireEvent.change).toBe(rtlFireEvent.change);
      expect(fireEvent.input).toBe(rtlFireEvent.input);
    });

    it("preserves the callable fireEvent API", () => {
      // This test is expected to fail with Object.assign({}, rtlFireEvent, ...):
      // assigning onto {} creates a plain object, not a callable function.
      expect(typeof fireEvent).toBe("function");

      const element = document.createElement("div");
      const event = new Event("custom");

      expect(() => fireEvent(element, event)).not.toThrow();
    });
  });

  describe("toggle", () => {
    it("exists as a function", () => {
      expect(typeof fireEvent.toggle).toBe("function");
    });

    it("uses closed-to-open defaults when no config is provided", () => {
      mockedTogglePolyfill.mockReturnValue(true);

      const element = document.body;
      const result = fireEvent.toggle(element);

      expect(mockedTogglePolyfill).toHaveBeenCalledOnce();
      expect(mockedTogglePolyfill).toHaveBeenCalledWith(element, {
        oldState: "closed",
        newState: "open",
      });
      expect(result).toBe(true);
    });

    it("uses defaults when an empty config is provided", () => {
      mockedTogglePolyfill.mockReturnValue(false);

      const element = document.createElement("div");
      const result = fireEvent.toggle(element, {});

      expect(mockedTogglePolyfill).toHaveBeenCalledWith(element, {
        oldState: "closed",
        newState: "open",
      });
      expect(result).toBe(false);
    });

    it("allows overriding only newState", () => {
      fireEvent.toggle(document.body, { newState: "closed" });

      expect(mockedTogglePolyfill).toHaveBeenCalledWith(document.body, {
        oldState: "closed",
        newState: "closed",
      });
    });

    it("allows overriding only oldState", () => {
      fireEvent.toggle(document.body, { oldState: "open" });

      expect(mockedTogglePolyfill).toHaveBeenCalledWith(document.body, {
        oldState: "open",
        newState: "open",
      });
    });

    it("allows overriding both states", () => {
      const config: ToggleConfig = {
        oldState: "open",
        newState: "closed",
      };

      fireEvent.toggle(document.body, config);

      expect(mockedTogglePolyfill).toHaveBeenCalledWith(document.body, config);
    });

    it("passes the original target to togglePolyfill", () => {
      const targets: Array<Document | Element | Node | Window> = [
        document,
        document.body,
        document.createTextNode("text"),
        window,
      ];

      for (const target of targets) {
        mockedTogglePolyfill.mockClear();

        fireEvent.toggle(target);

        expect(mockedTogglePolyfill).toHaveBeenCalledWith(target, {
          oldState: "closed",
          newState: "open",
        });
      }
    });

    it("does not mutate the supplied config", () => {
      const config: Partial<ToggleConfig> = {
        newState: "closed",
      };
      const snapshot = { ...config };

      fireEvent.toggle(document.body, config);

      expect(config).toEqual(snapshot);
    });

    it("uses defaults for undefined config", () => {
      fireEvent.toggle(document.body, undefined);

      expect(mockedTogglePolyfill).toHaveBeenCalledWith(document.body, {
        oldState: "closed",
        newState: "open",
      });
    });

    it("returns the polyfill's true result", () => {
      mockedTogglePolyfill.mockReturnValue(true);

      expect(fireEvent.toggle(document.body)).toBe(true);
    });

    it("returns the polyfill's false result", () => {
      mockedTogglePolyfill.mockReturnValue(false);

      expect(fireEvent.toggle(document.body)).toBe(false);
    });

    it("propagates errors thrown by the polyfill", () => {
      const error = new Error("Toggle dispatch failed");
      mockedTogglePolyfill.mockImplementation(() => {
        throw error;
      });

      expect(() => fireEvent.toggle(document.body)).toThrow(error);
    });
  });

  describe("TypeScript contract", () => {
    it("exposes the standard fireEvent type and toggle extension", () => {
      expectTypeOf(fireEvent).toExtend<typeof rtlFireEvent>();
      expectTypeOf(fireEvent).toExtend<
        typeof rtlFireEvent & ToggleFireEventExtensions
      >();

      expectTypeOf(fireEvent.toggle).toBeFunction();
    });

    it("accepts partial toggle configuration", () => {
      expectTypeOf(fireEvent.toggle)
        .parameter(1)
        .toEqualTypeOf<Partial<ToggleConfig> | undefined>();
    });
  });
});
