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
Rendered DOM and screenshots with headless Chromium (no Node needed). Every file goes straight into the Proof folder, never into the working tree:
```sh
PROOF="$(git rev-parse --path-format=absolute --git-common-dir)/proof/<run slug>"
mkdir -p "$PROOF"
chromium --headless --disable-gpu --no-sandbox --dump-dom http://127.0.0.1:8765/<path>/ > "$PROOF/dom.html"
chromium --headless --disable-gpu --no-sandbox --hide-scrollbars --window-size=1280,2400 --screenshot="$PROOF/desktop.png" http://127.0.0.1:8765/<path>/
chromium --headless --disable-gpu --no-sandbox --hide-scrollbars --window-size=375,3600 --screenshot="$PROOF/narrow.png" http://127.0.0.1:8765/<path>/
```

Headless screenshots cannot show focus. Step 4 of "How to verify a change" in `AGENTS.md` still needs a real browser: open `http://127.0.0.1:8765/<path>/`, press Tab through every interactive element, and check that the focus ring is visible on each.

## Evidence
The Proof folder is `<git common dir>/proof/<run slug>/`, outside every working tree, so no commit picks the files up. Drive already writes the DOM and screenshots there; save the output of any assertions on the DOM there too.

## Clean up
```sh
kill "$SERVER_PID"
```
