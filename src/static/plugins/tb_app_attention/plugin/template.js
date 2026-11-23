var seen = {};
var pending = attentionWindows.filter(function (w) {
  var key = w.umid || w.process.path || String(w.process.id);
  if (seen[key]) return false;
  seen[key] = true;
  return String(w.process.path || w.appName || "").toLowerCase().indexOf("seelen") === -1;
});
if (pending.length === 0) return null;
return pending.map(function (w) {
  return Button({
    style: {
      padding: "2px",
      "border-radius": "var(--radius-m)",
      "background-color": "var(--slu-std-ui-pressed-overlay)",
      animation: "slu-attention-flash 0.5s ease-in-out infinite alternate",
    },
    content: AppIcon({ path: w.process.path, umid: w.umid }),
    tooltip: w.title || w.appName,
    onClick:
      "invoke(SeelenCommand.WegToggleWindowState, { hwnd: " + w.hwnd + ", wasFocused: false })",
  });
});
