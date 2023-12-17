const express = require("express");

const app = express();

const PORT = 3000;

app.get("/sse", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.flushHeaders();

  console.log("New client connected.");

  const intervalId = setInterval(() => {
    const message = `Server Time: ${new Date().toLocaleTimeString()}`;
    console.log({ message });
    res.write(`data: ${JSON.stringify({ event: "new-event", message })}\n\n`);
  }, 2000);

  res.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
