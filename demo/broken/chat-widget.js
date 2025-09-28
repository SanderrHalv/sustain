// Another blocking script
const startChat = Date.now();
while (Date.now() - startChat < 1500) {
  // block main thread for 1.5 seconds
}
console.log("Chat widget loaded (blocking)");
