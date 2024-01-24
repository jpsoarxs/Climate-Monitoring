export default function MetricToImperial(
  measure: "metric" | "imperial" | undefined,
  value: number
) {
  if (measure !== "metric") {
    return (value * 9) / 5 + 32 + "°F";
  }

  return value + "°C";
}
