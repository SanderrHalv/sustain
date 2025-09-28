# Evidence Summary — WSG 3.8 Defer Non-Critical Resources

## Broken Version (http://localhost:8000)
- **Performance Score:** 54
- **First Contentful Paint (FCP):** 14.8s 
- **Largest Contentful Paint (LCP):** 15.0s 
- **Total Blocking Time (TBT):** 100ms 
- **Speed Index:** 45.4s 
- **Cumulative Layout Shift (CLS):** 0 

Notes:  
- Scripts blocked rendering until after heavy images loaded.  
- Content was delayed, but scripts themselves did not contribute to TBT.  

---

## Fixed Version (http://localhost:8001)
- **Performance Score:** 39
- **First Contentful Paint (FCP):** 0.6s 
- **Largest Contentful Paint (LCP):** 15.0s 
- **Total Blocking Time (TBT):** 13,910ms 
- **Speed Index:** 6.6s 
- **Cumulative Layout Shift (CLS):** 0 

Notes:  
- Content appeared quickly, but deferred scripts still contained blocking code, causing massive TBT.  
- This shows why deferring is not enough, scripts must also be non-blocking (async or optimized).  

---

## Comparison
- **Broken:** Slow first render (FCP), but low blocking.  
- **Fixed:** Fast first render (FCP), but very high blocking due to script logic.  
- **Lesson:** To truly “defer non-critical resources,” scripts must both load late and avoid blocking the main thread. Lazy-loading images worked as intended.  

---

## Next Steps (for presentation)
- Update the fixed demo scripts to use `setTimeout` (async simulation) instead of `while` loops.  
- Re-run Lighthouse → expect **better performance scores on Fixed vs Broken**, proving the benefit of deferring + lazy-loading.
