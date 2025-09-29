# Evidence Summary — WSG 3.8 Defer Non-Critical Resources

## Broken Version (http://localhost:8000)
- *Performance Score:* 54  
- *First Contentful Paint (FCP):*
*14.8 s*  
- *Largest Contentful Paint (LCP):*
*14.8 s*  
- *Total Blocking Time (TBT):*
*100 ms*  
- *Speed Index:*
*14.8 s*  
- *Cumulative Layout Shift (CLS):* 0  

*Notes:*  
- Render-blocking scripts delayed visible content until after heavy images loaded.  
- Scripts themselves were not CPU-heavy, so TBT stayed low.  

---

## Fixed Version (http://localhost:8001)
- *Performance Score:* 39  
- *First Contentful Paint (FCP):*
*0.8 s*  
- *Largest Contentful Paint (LCP):*
*1.0 s*  
- *Total Blocking Time (TBT):*
*13 910 ms*  
- *Speed Index:*
*0.9 s*  
- *Cumulative Layout Shift (CLS):* 0  

*Notes:*  
- Main content appeared almost instantly thanks to deferred script loading and lazy-loaded images.  
- However, the deferred scripts still contained *blocking `while`-loop logic* that monopolised the main thread → *massive TBT* and lower performance score.

---

## Comparison
- *Broken:* very *slow first render* (FCP/LCP) but *low CPU blocking*.  
- *Fixed:*
*fast initial render* (FCP/LCP) but *huge CPU blocking* caused by script logic.  
- *Lesson:* Deferring scripts improves initial paint but is not enough — *scripts must also be non-blocking* (e.g. use async, break up heavy loops, or schedule work off-thread).  
- Lazy-loading of images worked as intended in both versions.
