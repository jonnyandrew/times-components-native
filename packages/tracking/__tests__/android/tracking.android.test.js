import tracking from "../tracking.test";
import trackEvents from "../track-events.test";
import trackingContext from "../tracking-context.test";
import resolveAttrs from "../resolve-attrs.test";

describe("Tracking tests on android", () => {
  tracking();
  trackEvents();
  trackingContext();
  resolveAttrs();
});
