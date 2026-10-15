// Date strings exactly as the design shows them:
// en "Oct 2, 2026" · ja "2026年10月2日" · vi "02/10/2026".
// Dates are read in UTC so a build server's time zone can't shift them by a day.

const pad = (n) => String(n).padStart(2, '0');

const enDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const enMonth = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function formatDate(date, locale) {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  if (locale === 'ja') return `${y}年${m}月${d}日`;
  if (locale === 'vi') return `${pad(d)}/${pad(m)}/${y}`;
  return enDate.format(date);
}

// "Latest · Oct 2026" on the home page.
export function formatMonthYear(date, locale) {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  if (locale === 'ja') return `${y}年${m}月`;
  if (locale === 'vi') return `Th${m} ${y}`;
  return enMonth.format(date);
}

// Experience, education and certificate dates are 'YYYY-MM' or just 'YYYY'.
function parseMonth(value) {
  const [year, month] = value.split('-').map(Number);
  return { year, month };
}

export function formatYearMonth(value, locale) {
  const { year, month } = parseMonth(value);
  if (!month) return locale === 'ja' ? `${year}年` : String(year);
  if (locale === 'ja') return `${year}年${month}月`;
  if (locale === 'vi') return `${pad(month)}/${year}`;
  return enMonth.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatPeriod(start, end, presentLabel, locale) {
  const to = end ? formatYearMonth(end, locale) : presentLabel;
  return `${formatYearMonth(start, locale)} — ${to}`;
}

// Count both the first and the last month, like LinkedIn (a current job counts this month).
export function monthsWorked(start, end, now = new Date()) {
  const from = parseMonth(start);
  if (!from.month) return null;
  if (end) {
    const to = parseMonth(end);
    if (!to.month) return null;
    return to.year * 12 + to.month - (from.year * 12 + from.month) + 1;
  }
  const months = now.getUTCFullYear() * 12 + now.getUTCMonth() + 1 - (from.year * 12 + from.month) + 1;
  return months > 0 ? months : null;
}

// "(1 yr 10 mos)" · "（1年10か月）" · "(1 năm 10 tháng)"
export function formatDuration(months, locale) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (locale === 'ja') {
    return `（${[years && `${years}年`, rest && `${rest}か月`].filter(Boolean).join('')}）`;
  }
  if (locale === 'vi') {
    return `(${[years && `${years} năm`, rest && `${rest} tháng`].filter(Boolean).join(' ')})`;
  }
  const parts = [years && `${years} yr${years > 1 ? 's' : ''}`, rest && `${rest} mo${rest > 1 ? 's' : ''}`];
  return `(${parts.filter(Boolean).join(' ')})`;
}
