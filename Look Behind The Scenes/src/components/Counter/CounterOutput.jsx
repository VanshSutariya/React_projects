import { log } from "../../log.js";

export default function CounterOutput({ value }) {
  console.log("value", value);
  log("<CounterOutput /> rendered", 2);

  const cssClass = value >= 0 ? "counter-output" : "counter-output negative";
  return <span className={cssClass}>{value}</span>;
}
