export function createMcpDemoAppHtml(scriptUrl: string): string {
	if (!scriptUrl.startsWith('/')) throw new Error('MCP App demo script URL must be root-relative.');
	return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    :root { color-scheme: light dark; font-family: ui-sans-serif, system-ui, sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 16px; background: transparent; color: light-dark(#171717, #f5f5f5); }
    main { display: grid; gap: 12px; }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { margin: 0; font-size: 15px; }
    .status { font-size: 12px; color: light-dark(#666, #aaa); }
    .metric { padding: 12px; border: 1px solid light-dark(#ddd, #3a3a3a); border-radius: 6px; }
    .metric strong { display: block; margin-top: 4px; font-size: 24px; }
    ul { margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.6; }
	    .actions { display: flex; flex-wrap: wrap; gap: 8px; }
	    button { min-height: 32px; padding: 6px 10px; border: 1px solid light-dark(#ccc, #4a4a4a); border-radius: 5px; background: light-dark(#fff, #262626); color: inherit; cursor: pointer; }
	    button:disabled { cursor: wait; opacity: .55; }
	    .event { min-height: 18px; margin: 0; font-size: 12px; color: light-dark(#555, #bbb); }
  </style>
</head>
<body>
  <main>
    <header><h2>Launch readiness</h2><span class="status" id="status">Initializing</span></header>
    <div class="metric"><span>Completed checks</span><strong id="score">0 / 0</strong></div>
    <ul id="checks"></ul>
	    <div class="actions" aria-label="Host bridge actions">
	      <button id="send-message" type="button" disabled>Message</button>
	      <button id="call-tool" type="button" disabled>Tool</button>
	      <button id="update-context" type="button" disabled>Context</button>
	      <button id="open-link" type="button" disabled>Link</button>
	      <button id="download-file" type="button" disabled>Download</button>
	      <button id="send-log" type="button" disabled>Log</button>
	      <button id="display-mode" type="button" disabled>Display</button>
	      <button id="close-app" type="button" disabled>Close</button>
	    </div>
	    <p class="event" id="event" aria-live="polite"></p>
  </main>
	  <script type="module" src="${scriptUrl}"></script>
</body>
</html>`;
}
