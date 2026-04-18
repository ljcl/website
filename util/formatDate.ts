export const formatLedgerDate = (iso: string) =>
  new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(new Date(iso))
    .replace(/,/g, "")
    .replace(/\s(\d{4})$/, " / $1")
    .toUpperCase();
