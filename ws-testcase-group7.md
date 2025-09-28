# STAR Test-case: WSG 3.8 — Defer the loading of non-critical resources
Group: Sander Halvorsen, Saif Rana
Date: 2025-09-24

## 1) WSG criterion (exact quote)
> 3.8 Defer the loading of non-critical resources  
> "Ensure that resources not essential for initial rendering (such as analytics, ads, chat widgets, or below-the-fold images) are deferred, asynchronously loaded, or lazy-loaded."

Source: https://w3c.github.io/sustainableweb-wsg/#defer-the-loading-of-non-critical-resources

## 2) Plain-language summary
Load only what’s needed to render the first visible content. Scripts, styles, or images that don’t affect above-the-fold content should be deferred or lazy-loaded.

## 3) Why it matters
- **Performance**: Improves First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
- **CO₂ / Energy**: Saves bandwidth and CPU usage by avoiding unnecessary early loads.
- **UX / Accessibility**: Users see meaningful content faster without blocking delays.

## 4) Machine-testable? (yes / partly)
- **Automatable**: Detect blocking `<script>` without `defer/async`, detect images without `loading="lazy"`.
- **Manual**: Judging which resources are truly non-critical.

## 5) Signals to check
- `<script>` in `<head>` without `defer` or `async`.
- Images below-the-fold missing `loading="lazy"`.
- Large script/data transfer early in the network waterfall.
- Lighthouse warnings: “Eliminate render-blocking resources”.

## 6) Pass / Fail rules
- **PASS if**: Only critical resources load first; other scripts/images are deferred or lazy-loaded.  
- **FAIL if**: Non-critical JS blocks rendering OR non-visible images load eagerly.

## 7) Exact test steps (reproducible)
1. Serve broken version locally:
   ```bash
   cd demo/broken
   npx http-server . -p 8000
   ```

2. Run Lighthouse.
    ```bash
    npx lighthouse 'http://localhost:8000' \
    --output=json --output-path=../../evidence/audit-broken.json \
    --save-assets --chrome-flags="--headless"
    ```

3. Save screenshot in evidence/before.png.

4. Repeat steps for 1-3 for fixed version.
    ```bash
    cd demo/fixed
    npx http-server . -p 8001
    npx lighthouse 'http://localhost:8001' \
    --output=json --output-path=../../evidence/audit-fixed.json \
    --save-assets --chrome-flags="--headless"
    ```

5. Save screenshot in evidence/after.png.

6. write evidence/summary comparing results.

## 8) Evidence required 
- audit-broken.json, audit-fixed.json
- before.png, after.png
- summary.md

## 9) Automation hints
Scripts can parse Lighthouse JSON to check if blocking scripts exist.
    
## 10) Assumptions & notes
CO₂ calculations: SWDM v4 defaults.
Throttling: Lighthouse simulated mobile defaults.
“Above-the-fold” = visible content at 375px wide viewport.