const net = require("net");

const socket = net.createConnection(465, "mail.ipsoftperu.com");

socket.on("connect", () => {
  console.log("✔ SMTP CONECTADO");
  socket.destroy();
});

socket.on("error", (err) => {
  console.log("❌ ERROR SMTP:", err.message);
});