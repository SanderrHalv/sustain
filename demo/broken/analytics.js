// Simulate heavy blocking analytics script
const start = Date.now();
while (Date.now() - start < 2000) {
  // block main thread for 2 seconds
}
console.log("Analytics script finished after blocking 2s");
