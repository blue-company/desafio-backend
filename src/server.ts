import { app } from "./app";

app.listen(
  {
    host: "0.0.0.0",
    port: 3000,
  },
  () => console.log("🚀 HTTP Server is running!")
);
