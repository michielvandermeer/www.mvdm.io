# Run recipe

The site is plain static files; running it means serving the repository root.

## Check
```sh
command -v python3
command -v chromium || command -v chromium-browser || command -v google-chrome
```

## Launch
From the repository root, on a free port (AGENTS.md uses 8000; pick another if it is taken):
```sh
python3 -m http.server 8765 --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER_PID=$!
```

## Ready
```sh
for i in $(seq 1 50); do curl -sf http://127.0.0.1:8765/ >/dev/null && break; sleep 0.1; done
```

## Drive
Rendered DOM and screenshots with headless Chromium (no Node needed):
```sh
chromium --headless --disable-gpu --no-sandbox --dump-dom http://127.0.0.1:8765/<path>/ > dom.html
chromium --headless --disable-gpu --no-sandbox --hide-scrollbars --window-size=1280,2400 --screenshot=desktop.png http://127.0.0.1:8765/<path>/
chromium --headless --disable-gpu --no-sandbox --hide-scrollbars --window-size=375,3600 --screenshot=narrow.png http://127.0.0.1:8765/<path>/
```

## Evidence
Save the dumped DOM, the screenshots, and the output of any assertions on the DOM in the Proof folder: `<git common dir>/proof/<run slug>/`, outside every working tree, so no commit picks the files up.

## Clean up
```sh
kill "$SERVER_PID"
```
