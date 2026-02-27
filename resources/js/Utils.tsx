const targetTimeZone = 'America/New_York';
const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: targetTimeZone,
    timeZoneName: 'short'
};
const jakartaTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false // Menggunakan format 24 jam
});
const jakartaTime_dmy = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  day: "2-digit",
  month: "long",
  year: "numeric",
});
function getLocalTime(date: string, no_time: boolean = false){
    const utcDate = new Date(date);
    if (no_time){
      return jakartaTime_dmy.format(utcDate);
    }
    return jakartaTime.format(utcDate);
}
const entityMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (input_string: any) {
  if (input_string.startsWith("https://")) (input_string=input_string.slice(8));
  return "https://"+String(input_string).replace(/[&<>"'`=\/]/g, function (s: string) {
    return entityMap[s];
  });
}
export { getLocalTime, escapeHtml };