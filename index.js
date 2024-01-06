import createRammerhead from "rammerhead/src/server/index.js";
import { fileURLToPath } from "node:url";
import { createBareServer } from "@tomphttp/bare-server-node";
import { createServer } from "node:http";
import { hostname } from "node:os";
import serveStatic from "serve-static";
import connect from "connect";
import path from "node:path";
import axios from "axios";
import express from "express";
import { uvPath } from "uv-2.0-pkg";
import { dynamicPath } from "@nebula-services/dynamic";
import bodyParser from 'body-parser';
const apiKey = process.argv[2] || 'none';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
};

const app = express();
app.use(bodyParser.json());
app.use(express.static("./public"));
const __dirname = process.cwd();
const rh = createRammerhead();
const server = createServer();
const bareServer = createBareServer("/bare/", {
  logErrors: false,
  localAddress: undefined,
  maintainer: {
    email: "SeismeticNetwork",
    website: "https://github.com/SeismeticNetwork/elegance",
  },
});

app.use("/uv2/", express.static(uvPath));
app.use("/dynamic/", express.static(dynamicPath));

const rammerheadScopes = [
	"/rammerhead.js",
	"/hammerhead.js",
	"/transport-worker.js",
	"/task.js",
	"/iframe-task.js",
	"/worker-hammerhead.js",
	"/messaging",
	"/sessionexists",
	"/deletesession",
	"/newsession",
	"/editsession",
	"/needpassword",
	"/syncLocalStorage",
	"/api/shuffleDict"
];
const rammerheadSession = /^\/[a-z0-9]{32}/;
function shouldRouteRh(req) {
	const url = new URL(req.url, "http://0.0.0.0");
	return (
	  rammerheadScopes.includes(url.pathname) ||
	  rammerheadSession.test(url.pathname)
	);
  }
  
  function routeRhRequest(req, res) {
	rh.emit("request", req, res);
  }

  function routeRhUpgrade(req, socket, head) {
	rh.emit("upgrade", req, socket, head);
  }

app.use((req, res, next) => {
    if(shouldRouteRh(req)) rh.emit("request", req, res); else next();
});


server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
      } else if (shouldRouteRh(req)) {
        routeRhRequest(req, res);
      } else {
        app(req, res);
      }
  });
  
  
  

server.on("upgrade", (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
      } else if (shouldRouteRh(req)) {
        routeRhUpgrade(req, socket, head);
      }
});

app.use(express.json());

app.post('/ask', async (req, res) => {
  const apiUrl = 'https://api.shuttleai.app/v1';
  const model = 'gpt-4';

  if (apiKey === 'none') {
    const errorResponse = {
      choices: [
        {
          finish_reason: 'stop',
          index: 0,
          message: {
            content: 'Unfortunately, This server does not have AI Enabled. Contact the server maintainer to add AI',
            role: 'assistant'
          }
        }
      ],
      created: 1704414607,
      id: 'chatcmpl-2fbc4f32534d085a3d8a0661257e05e0',
      model: 'gpt-4',
      object: 'chat.completion',
      usage: {
        completion_tokens: null,
        prompt_tokens: null,
        total_tokens: null
      }
    };
  
    return res.json(errorResponse);
  }
  
  try {
    const { question } = req.body;
    const data = {
      model: model,
      messages: [
        { role: 'user', content: question }
      ]
    };
    const shuttleResponse = await axios.post(
      `${apiUrl}/chat/completions`,
      data,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const result = shuttleResponse.data;
    res.json(result);
  } catch (error) {
    console.error(error.response.data); // Log the detailed error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.on("listening", () => {
  const addr = server.address();
  console.log('\x1b[31m%s\x1b[0m', 'Elegance is in Early Beta and issues may occur!')
  console.log('\x1b[32m%s\x1b[0m', 'Using Version 1.2 BETA');
  console.log("");
  console.log('\x1b[33m%s\x1b[0m',`Server running on port ${addr.port}`)
  console.log("");
  console.log("You can now view it in your browser.")
  console.log('\x1b[35m%s\x1b[0m', `Local: http://${addr.family === "IPv6" ? `[${addr.address}]` : addr.address}${addr.port === 80? "" : ":" + addr.port}`);
  console.log('\x1b[35m%s\x1b[0m', `Local: http://localhost${addr.port === 80? "" : ":" + addr.port}`);
  try { console.log('\x1b[35m%s\x1b[0m', `On Your Network: http://${hostname()}${addr.port === 80? "" : ":" + addr.port}`); } catch (err) {/* Can't find LAN interface */};
});

server.listen({ port: process.env.PORT || 8080 }) 