const ledgerFormatter = new Intl.DateTimeFormat("en-AU", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const formatLedgerDate = (iso: string) =>
  ledgerFormatter
    .format(new Date(iso))
    .replace(/,/g, "")
    .replace(/\s(\d{4})$/, " / $1")
    .toUpperCase();
