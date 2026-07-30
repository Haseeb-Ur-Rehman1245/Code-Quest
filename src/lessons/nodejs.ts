import { CourseLessons } from "./types";

export const nodejsLessons: CourseLessons = {
  easy: [
    {
      id: "node-1", title: "What is Node.js?",
      content: "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript outside the browser. Created by Ryan Dahl in 2009, Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. It's perfect for building fast, scalable network applications like web servers, APIs, and real-time applications. Node.js uses a single-threaded event loop architecture, meaning it can handle thousands of concurrent connections without creating a new thread for each one. This makes it ideal for I/O-heavy applications like chat apps, streaming services, and microservices.",
      codeExamples: [
        { language: "javascript", code: '// Your first Node.js program\nconsole.log("Hello from Node.js!");\n\n// Access command-line arguments\nconsole.log(process.argv);\n\n// Environment variables\nconsole.log(process.env.NODE_ENV);\n\n// Current working directory\nconsole.log(process.cwd());\n\n// Node.js version\nconsole.log(process.version);', explanation: "Basic Node.js program using the global process object." },
        { language: "javascript", code: '// Simple HTTP server\nconst http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "text/html" });\n  res.end("<h1>Hello World from Node.js!</h1>");\n});\n\nserver.listen(3000, () => {\n  console.log("Server running at http://localhost:3000");\n});', explanation: "A basic HTTP server — the foundation of all Node.js web applications." },
        { language: "javascript", code: '// Using built-in modules\nconst os = require("os");\nconst path = require("path");\n\nconsole.log("Platform:", os.platform());\nconsole.log("CPU Cores:", os.cpus().length);\nconsole.log("Free Memory:", (os.freemem() / 1024 / 1024).toFixed(0), "MB");\nconsole.log("Home Dir:", os.homedir());\nconsole.log("File ext:", path.extname("index.html")); // .html', explanation: "Node.js comes with many built-in modules for system info, paths, and more." }
      ],
      exercises: [
        { question: "Create an HTTP server that responds with your name and current date/time.", solution: 'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "text/plain" });\n  res.end(`My name is Ahmed\\nDate: ${new Date().toISOString()}`);\n});\n\nserver.listen(3000);', difficulty: "beginner" },
        { question: "Write a script that prints all environment variables sorted alphabetically.", solution: 'const envVars = Object.entries(process.env).sort(([a], [b]) => a.localeCompare(b));\nenvVars.forEach(([key, value]) => {\n  console.log(`${key}: ${value}`);\n});', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Node.js Official Docs", url: "https://nodejs.org/docs/latest/api/" },
        { title: "W3Schools Node.js Tutorial", url: "https://www.w3schools.com/nodejs/" },
        { title: "MDN Node.js Introduction", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "node-2", title: "Node.js Modules & require",
      content: "Node.js uses a module system to organize code. Every file is a module. Use module.exports to expose values and require() to import them. Node.js supports both CommonJS (require/module.exports) and ES Modules (import/export). Built-in modules like fs, path, http, and os don't need installation. Third-party modules are installed via npm (Node Package Manager). The module resolution algorithm first checks core modules, then node_modules folders.",
      codeExamples: [
        { language: "javascript", code: '// math.js - Creating a module\nconst add = (a, b) => a + b;\nconst subtract = (a, b) => a - b;\nconst multiply = (a, b) => a * b;\n\nmodule.exports = { add, subtract, multiply };\n\n// app.js - Using the module\nconst math = require("./math");\nconsole.log(math.add(5, 3));      // 8\nconsole.log(math.multiply(4, 7)); // 28\n\n// Destructured import\nconst { add, subtract } = require("./math");\nconsole.log(add(10, 5)); // 15', explanation: "Creating and importing custom modules with CommonJS syntax." },
        { language: "javascript", code: '// ES Module syntax (use .mjs or set "type": "module" in package.json)\n\n// utils.mjs\nexport const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);\nexport const slugify = (str) => str.toLowerCase().replace(/\\s+/g, "-");\nexport default function greet(name) {\n  return `Hello, ${name}!`;\n}\n\n// app.mjs\nimport greet, { capitalize, slugify } from "./utils.mjs";\nconsole.log(greet("Ali"));           // Hello, Ali!\nconsole.log(capitalize("hello"));     // Hello\nconsole.log(slugify("My Blog Post")); // my-blog-post', explanation: "ES Module syntax — the modern standard for JavaScript modules." }
      ],
      exercises: [
        { question: "Create a 'stringUtils' module with functions: reverse, isPalindrome, and wordCount. Import and test them.", solution: '// stringUtils.js\nconst reverse = (str) => str.split("").reverse().join("");\nconst isPalindrome = (str) => str === reverse(str);\nconst wordCount = (str) => str.trim().split(/\\s+/).length;\n\nmodule.exports = { reverse, isPalindrome, wordCount };\n\n// test.js\nconst { reverse, isPalindrome, wordCount } = require("./stringUtils");\nconsole.log(reverse("hello"));         // "olleh"\nconsole.log(isPalindrome("racecar"));   // true\nconsole.log(wordCount("Hello World!")); // 2', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Node.js Modules Docs", url: "https://nodejs.org/api/modules.html" },
        { title: "W3Schools Node Modules", url: "https://www.w3schools.com/nodejs/nodejs_modules.asp" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "node-3", title: "File System (fs) Module",
      content: "The fs module provides file system operations. It offers both synchronous (readFileSync) and asynchronous (readFile with callback or fs.promises) methods. Always prefer asynchronous methods in production to avoid blocking the event loop. Common operations include reading, writing, appending, deleting files, and creating directories. The fs.promises API returns Promises for cleaner async/await code.",
      codeExamples: [
        { language: "javascript", code: 'const fs = require("fs");\nconst fsPromises = require("fs").promises;\n\n// Synchronous (blocks event loop — avoid in production)\nconst data = fs.readFileSync("file.txt", "utf-8");\nconsole.log(data);\n\n// Async with callback\nfs.readFile("file.txt", "utf-8", (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});\n\n// Async with Promises (recommended)\nasync function readMyFile() {\n  try {\n    const data = await fsPromises.readFile("file.txt", "utf-8");\n    console.log(data);\n  } catch (err) {\n    console.error("Error:", err.message);\n  }\n}', explanation: "Three ways to read files — prefer async/await with fs.promises." },
        { language: "javascript", code: 'const fs = require("fs").promises;\n\nasync function fileOperations() {\n  // Write file\n  await fs.writeFile("output.txt", "Hello, Node.js!");\n\n  // Append to file\n  await fs.appendFile("output.txt", "\\nNew line added");\n\n  // Read file\n  const content = await fs.readFile("output.txt", "utf-8");\n  console.log(content);\n\n  // Check if file exists\n  try {\n    await fs.access("output.txt");\n    console.log("File exists!");\n  } catch {\n    console.log("File not found");\n  }\n\n  // Delete file\n  await fs.unlink("output.txt");\n}\n\nfileOperations();', explanation: "Common file operations: write, append, read, check, and delete." }
      ],
      exercises: [
        { question: "Write a script that reads a text file, counts the words, and writes the count to a new file.", solution: 'const fs = require("fs").promises;\n\nasync function countWords() {\n  const text = await fs.readFile("input.txt", "utf-8");\n  const count = text.trim().split(/\\s+/).length;\n  await fs.writeFile("count.txt", `Word count: ${count}`);\n  console.log(`Done! ${count} words found.`);\n}\ncountWords();', difficulty: "beginner" },
        { question: "Create a function that recursively lists all files in a directory.", solution: 'const fs = require("fs").promises;\nconst path = require("path");\n\nasync function listFiles(dir) {\n  const entries = await fs.readdir(dir, { withFileTypes: true });\n  const files = [];\n  for (const entry of entries) {\n    const fullPath = path.join(dir, entry.name);\n    if (entry.isDirectory()) {\n      files.push(...await listFiles(fullPath));\n    } else {\n      files.push(fullPath);\n    }\n  }\n  return files;\n}\nlistFiles(".").then(console.log);', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Node.js fs Documentation", url: "https://nodejs.org/api/fs.html" },
        { title: "W3Schools File System", url: "https://www.w3schools.com/nodejs/nodejs_filesystem.asp" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "node-4", title: "npm & Package Management",
      content: "npm (Node Package Manager) is the world's largest software registry. It manages project dependencies, scripts, and package publishing. package.json defines your project metadata and dependencies. Use npm init to create a project, npm install to add packages, and npm scripts for automation. Semantic versioning (semver) uses major.minor.patch format. devDependencies are only needed during development (testing, building).",
      codeExamples: [
        { language: "bash", code: '# Initialize a project\nnpm init -y\n\n# Install packages\nnpm install express          # Production dependency\nnpm install -D nodemon       # Dev dependency\nnpm install -g typescript    # Global install\n\n# Useful commands\nnpm list                     # Show installed packages\nnpm outdated                 # Check for updates\nnpm update                   # Update packages\nnpm uninstall express        # Remove package', explanation: "Essential npm commands for managing Node.js projects." },
        { language: "json", code: '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "description": "My Node.js app",\n  "main": "index.js",\n  "scripts": {\n    "start": "node index.js",\n    "dev": "nodemon index.js",\n    "test": "jest",\n    "build": "tsc"\n  },\n  "dependencies": {\n    "express": "^4.18.0"\n  },\n  "devDependencies": {\n    "nodemon": "^3.0.0",\n    "jest": "^29.0.0"\n  }\n}', explanation: "A typical package.json with scripts, dependencies, and metadata." }
      ],
      exercises: [
        { question: "Create a package.json with start, dev, test, and build scripts. Explain what each script does.", solution: '// Run: npm init -y\n// Then edit package.json:\n{\n  "scripts": {\n    "start": "node src/index.js",     // Production start\n    "dev": "nodemon src/index.js",     // Auto-restart on changes\n    "test": "jest --coverage",         // Run tests with coverage\n    "build": "tsc && npm run lint",    // Compile TypeScript + lint\n    "lint": "eslint src/"              // Check code quality\n  }\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "npm Documentation", url: "https://docs.npmjs.com/" },
        { title: "W3Schools npm", url: "https://www.w3schools.com/nodejs/nodejs_npm.asp" }
      ],
      estimatedMinutes: 15
    },
    {
      id: "node-5", title: "HTTP Module & Building Servers",
      content: "The http module creates web servers that listen for requests and send responses. Every request has a method (GET, POST, etc.), URL, and headers. Responses need a status code, headers, and body. Routing can be done manually by checking req.url and req.method. For production apps, use Express.js instead of the raw http module for better routing, middleware, and error handling.",
      codeExamples: [
        { language: "javascript", code: 'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  // Simple router\n  if (req.method === "GET" && req.url === "/") {\n    res.writeHead(200, { "Content-Type": "text/html" });\n    res.end("<h1>Home Page</h1>");\n  } else if (req.method === "GET" && req.url === "/api/users") {\n    const users = [{ name: "Ali" }, { name: "Sara" }];\n    res.writeHead(200, { "Content-Type": "application/json" });\n    res.end(JSON.stringify(users));\n  } else {\n    res.writeHead(404);\n    res.end("Not Found");\n  }\n});\n\nserver.listen(3000, () => console.log("Server on port 3000"));', explanation: "An HTTP server with basic routing for HTML and JSON responses." },
        { language: "javascript", code: '// Handling POST requests with body parsing\nconst http = require("http");\n\nconst server = http.createServer((req, res) => {\n  if (req.method === "POST" && req.url === "/api/data") {\n    let body = "";\n    req.on("data", (chunk) => {\n      body += chunk.toString();\n    });\n    req.on("end", () => {\n      const data = JSON.parse(body);\n      console.log("Received:", data);\n      res.writeHead(201, { "Content-Type": "application/json" });\n      res.end(JSON.stringify({ message: "Created!", data }));\n    });\n  }\n});\n\nserver.listen(3000);', explanation: "Reading POST request body using streams — data arrives in chunks." }
      ],
      exercises: [
        { question: "Build an HTTP server with routes: GET / (home), GET /about (about page), and GET /api/time (returns current time as JSON).", solution: 'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  if (req.url === "/") {\n    res.writeHead(200, { "Content-Type": "text/html" });\n    res.end("<h1>Welcome Home</h1>");\n  } else if (req.url === "/about") {\n    res.writeHead(200, { "Content-Type": "text/html" });\n    res.end("<h1>About Us</h1>");\n  } else if (req.url === "/api/time") {\n    res.writeHead(200, { "Content-Type": "application/json" });\n    res.end(JSON.stringify({ time: new Date().toISOString() }));\n  } else {\n    res.writeHead(404);\n    res.end("404 Not Found");\n  }\n});\nserver.listen(3000);', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Node.js HTTP Module", url: "https://nodejs.org/api/http.html" },
        { title: "W3Schools HTTP Module", url: "https://www.w3schools.com/nodejs/nodejs_http.asp" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "node-6", title: "Events & EventEmitter",
      content: "Node.js is built on an event-driven architecture. The EventEmitter class lets you create, emit, and listen for custom events. Many Node.js built-in modules (http, fs, streams) extend EventEmitter. Use .on() to listen, .emit() to trigger, and .once() for one-time listeners. Events enable loose coupling between components — the emitter doesn't need to know who's listening.",
      codeExamples: [
        { language: "javascript", code: 'const EventEmitter = require("events");\n\nclass OrderSystem extends EventEmitter {\n  placeOrder(item, qty) {\n    console.log(`Order placed: ${qty}x ${item}`);\n    this.emit("order", { item, qty, time: new Date() });\n  }\n}\n\nconst shop = new OrderSystem();\n\n// Listen for orders\nshop.on("order", (order) => {\n  console.log(`Processing: ${order.qty}x ${order.item}`);\n});\n\nshop.on("order", (order) => {\n  console.log(`Email sent for order: ${order.item}`);\n});\n\nshop.placeOrder("Laptop", 1);\n// Output:\n// Order placed: 1x Laptop\n// Processing: 1x Laptop\n// Email sent for order: Laptop', explanation: "Custom EventEmitter with multiple listeners — like a notification system." }
      ],
      exercises: [
        { question: "Create a Logger class that extends EventEmitter with log, warn, and error methods that emit events.", solution: 'const EventEmitter = require("events");\n\nclass Logger extends EventEmitter {\n  log(msg) { this.emit("log", { level: "info", message: msg, time: new Date() }); }\n  warn(msg) { this.emit("log", { level: "warn", message: msg, time: new Date() }); }\n  error(msg) { this.emit("log", { level: "error", message: msg, time: new Date() }); }\n}\n\nconst logger = new Logger();\nlogger.on("log", (entry) => {\n  console.log(`[${entry.level.toUpperCase()}] ${entry.message}`);\n});\n\nlogger.log("Server started");\nlogger.warn("High memory usage");\nlogger.error("Connection failed");', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Node.js Events", url: "https://nodejs.org/api/events.html" },
        { title: "W3Schools Events", url: "https://www.w3schools.com/nodejs/nodejs_events.asp" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "node-7", title: "Streams & Buffers",
      content: "Streams process data piece by piece without loading everything into memory. This is essential for handling large files, network data, or real-time processing. There are four stream types: Readable, Writable, Duplex (both), and Transform (modify data). Buffers represent raw binary data. Piping connects a readable stream's output to a writable stream's input, creating efficient data pipelines.",
      codeExamples: [
        { language: "javascript", code: 'const fs = require("fs");\n\n// Reading a large file with streams (memory efficient)\nconst readStream = fs.createReadStream("largefile.txt", { encoding: "utf-8" });\nconst writeStream = fs.createWriteStream("copy.txt");\n\nreadStream.on("data", (chunk) => {\n  console.log(`Received ${chunk.length} bytes`);\n});\n\nreadStream.on("end", () => console.log("Done reading"));\n\n// Pipe: connect streams (simplest way to copy)\nfs.createReadStream("source.txt").pipe(fs.createWriteStream("dest.txt"));\n\n// Transform stream (uppercase converter)\nconst { Transform } = require("stream");\nconst upperCase = new Transform({\n  transform(chunk, encoding, callback) {\n    callback(null, chunk.toString().toUpperCase());\n  }\n});\n\nprocess.stdin.pipe(upperCase).pipe(process.stdout);', explanation: "Streams for efficient data processing — crucial for large files and real-time data." }
      ],
      exercises: [
        { question: "Create a program that reads a file, converts it to uppercase, and writes the result to a new file using streams.", solution: 'const fs = require("fs");\nconst { Transform } = require("stream");\n\nconst upperCase = new Transform({\n  transform(chunk, encoding, callback) {\n    callback(null, chunk.toString().toUpperCase());\n  }\n});\n\nfs.createReadStream("input.txt")\n  .pipe(upperCase)\n  .pipe(fs.createWriteStream("output.txt"))\n  .on("finish", () => console.log("Done!"));', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Node.js Streams", url: "https://nodejs.org/api/stream.html" },
        { title: "Stream Handbook", url: "https://github.com/substack/stream-handbook" }
      ],
      estimatedMinutes: 25
    },
  ],
  intermediate: [
    {
      id: "node-8", title: "Express.js Fundamentals",
      content: "Express.js is the most popular Node.js web framework. It simplifies routing, middleware handling, and response management. Express uses a middleware pipeline where each function can process the request, modify it, and pass it to the next middleware. Routes define URL patterns and HTTP methods. Express supports template engines, static file serving, and easy JSON API creation.",
      codeExamples: [
        { language: "javascript", code: 'const express = require("express");\nconst app = express();\n\n// Middleware\napp.use(express.json());  // Parse JSON bodies\napp.use(express.static("public"));  // Serve static files\n\n// Routes\napp.get("/", (req, res) => {\n  res.send("<h1>Welcome!</h1>");\n});\n\napp.get("/api/users", (req, res) => {\n  res.json([{ id: 1, name: "Ali" }, { id: 2, name: "Sara" }]);\n});\n\napp.post("/api/users", (req, res) => {\n  const { name, email } = req.body;\n  res.status(201).json({ id: 3, name, email });\n});\n\napp.listen(3000, () => console.log("Server on port 3000"));', explanation: "Express basics: middleware, GET and POST routes, JSON responses." },
        { language: "javascript", code: '// Route parameters and query strings\napp.get("/api/users/:id", (req, res) => {\n  const { id } = req.params;\n  res.json({ userId: id });\n});\n\n// Query: /api/search?q=javascript&page=2\napp.get("/api/search", (req, res) => {\n  const { q, page = 1 } = req.query;\n  res.json({ query: q, page: Number(page) });\n});\n\n// Custom middleware\nconst logger = (req, res, next) => {\n  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);\n  next(); // Pass to next middleware\n};\napp.use(logger);', explanation: "Route parameters, query strings, and custom middleware." }
      ],
      exercises: [
        { question: "Build a REST API with Express for a todo list: GET /todos, POST /todos, DELETE /todos/:id.", solution: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\nlet todos = [{ id: 1, text: "Learn Node", done: false }];\nlet nextId = 2;\n\napp.get("/todos", (req, res) => res.json(todos));\n\napp.post("/todos", (req, res) => {\n  const todo = { id: nextId++, text: req.body.text, done: false };\n  todos.push(todo);\n  res.status(201).json(todo);\n});\n\napp.delete("/todos/:id", (req, res) => {\n  todos = todos.filter(t => t.id !== Number(req.params.id));\n  res.json({ message: "Deleted" });\n});\n\napp.listen(3000);', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Express.js Documentation", url: "https://expressjs.com/" },
        { title: "MDN Express Tutorial", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "node-9", title: "Middleware & Error Handling",
      content: "Middleware functions have access to req, res, and next(). They execute in order and can modify the request/response cycle. Application-level middleware (app.use), router-level middleware, error-handling middleware (4 parameters), and built-in middleware (express.json, express.static) form the Express pipeline. Error middleware must have exactly 4 parameters: (err, req, res, next).",
      codeExamples: [
        { language: "javascript", code: '// Authentication middleware\nconst authenticate = (req, res, next) => {\n  const token = req.headers.authorization?.split(" ")[1];\n  if (!token) return res.status(401).json({ error: "No token provided" });\n  try {\n    req.user = verifyToken(token);\n    next();\n  } catch {\n    res.status(403).json({ error: "Invalid token" });\n  }\n};\n\n// Apply to specific routes\napp.get("/api/profile", authenticate, (req, res) => {\n  res.json({ user: req.user });\n});\n\n// Error handling middleware (must be last)\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(err.status || 500).json({\n    error: err.message || "Internal Server Error"\n  });\n});', explanation: "Authentication middleware and centralized error handling." }
      ],
      exercises: [
        { question: "Create a rate-limiting middleware that allows max 10 requests per minute per IP.", solution: 'const requestCounts = new Map();\n\nconst rateLimit = (req, res, next) => {\n  const ip = req.ip;\n  const now = Date.now();\n  const windowMs = 60000; // 1 minute\n  \n  if (!requestCounts.has(ip)) {\n    requestCounts.set(ip, { count: 1, start: now });\n    return next();\n  }\n  \n  const record = requestCounts.get(ip);\n  if (now - record.start > windowMs) {\n    record.count = 1;\n    record.start = now;\n    return next();\n  }\n  \n  if (record.count >= 10) {\n    return res.status(429).json({ error: "Too many requests" });\n  }\n  \n  record.count++;\n  next();\n};\n\napp.use(rateLimit);', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Express Middleware Guide", url: "https://expressjs.com/en/guide/using-middleware.html" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "node-10", title: "Async Patterns: Callbacks, Promises, Async/Await",
      content: "Node.js is asynchronous by nature. The evolution: callbacks → promises → async/await. Callbacks can lead to 'callback hell' (nested callbacks). Promises represent eventual values with .then/.catch. async/await is syntactic sugar over Promises, making async code look synchronous. Use Promise.all for parallel operations and Promise.allSettled when you want all results regardless of errors.",
      codeExamples: [
        { language: "javascript", code: '// Callback hell (avoid!)\nfs.readFile("a.txt", (err, a) => {\n  fs.readFile("b.txt", (err, b) => {\n    fs.readFile("c.txt", (err, c) => {\n      console.log(a + b + c);\n    });\n  });\n});\n\n// Promises (better)\nPromise.all([\n  fs.promises.readFile("a.txt", "utf-8"),\n  fs.promises.readFile("b.txt", "utf-8"),\n  fs.promises.readFile("c.txt", "utf-8")\n]).then(([a, b, c]) => console.log(a + b + c));\n\n// Async/await (best)\nasync function readAll() {\n  const [a, b, c] = await Promise.all([\n    fs.promises.readFile("a.txt", "utf-8"),\n    fs.promises.readFile("b.txt", "utf-8"),\n    fs.promises.readFile("c.txt", "utf-8")\n  ]);\n  console.log(a + b + c);\n}', explanation: "Evolution from callback hell to clean async/await code." }
      ],
      exercises: [
        { question: "Write a function that fetches data from 3 URLs in parallel and returns results as an object.", solution: 'async function fetchAll(urls) {\n  const results = await Promise.allSettled(\n    urls.map(url => fetch(url).then(r => r.json()))\n  );\n  return results.map((r, i) => ({\n    url: urls[i],\n    status: r.status,\n    data: r.status === "fulfilled" ? r.value : r.reason.message\n  }));\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "MDN Async/Await", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "node-11", title: "REST API Design",
      content: "REST (Representational State Transfer) is an architectural style for APIs. Resources are identified by URLs, manipulated with HTTP methods (GET=read, POST=create, PUT/PATCH=update, DELETE=remove). Use proper status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error). Version your API, validate input, and return consistent response formats.",
      codeExamples: [
        { language: "javascript", code: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\nlet books = [\n  { id: 1, title: "Clean Code", author: "Robert Martin" },\n  { id: 2, title: "The Pragmatic Programmer", author: "David Thomas" }\n];\n\n// GET all books\napp.get("/api/v1/books", (req, res) => {\n  res.json({ success: true, data: books, count: books.length });\n});\n\n// GET single book\napp.get("/api/v1/books/:id", (req, res) => {\n  const book = books.find(b => b.id === Number(req.params.id));\n  if (!book) return res.status(404).json({ success: false, error: "Book not found" });\n  res.json({ success: true, data: book });\n});\n\n// POST create book\napp.post("/api/v1/books", (req, res) => {\n  const { title, author } = req.body;\n  if (!title || !author) {\n    return res.status(400).json({ success: false, error: "Title and author required" });\n  }\n  const book = { id: books.length + 1, title, author };\n  books.push(book);\n  res.status(201).json({ success: true, data: book });\n});', explanation: "RESTful API with proper status codes, validation, and consistent response format." }
      ],
      exercises: [
        { question: "Design and implement a complete CRUD API for a 'products' resource with input validation.", solution: '// Includes GET all, GET by id, POST, PUT, DELETE\n// with validation and proper error responses\napp.put("/api/v1/books/:id", (req, res) => {\n  const idx = books.findIndex(b => b.id === Number(req.params.id));\n  if (idx === -1) return res.status(404).json({ error: "Not found" });\n  books[idx] = { ...books[idx], ...req.body };\n  res.json({ success: true, data: books[idx] });\n});\n\napp.delete("/api/v1/books/:id", (req, res) => {\n  books = books.filter(b => b.id !== Number(req.params.id));\n  res.json({ success: true, message: "Deleted" });\n});', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "REST API Best Practices", url: "https://restfulapi.net/" },
        { title: "HTTP Status Codes", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "node-12", title: "Database Integration",
      content: "Node.js connects to databases through driver libraries. Popular choices: MongoDB (mongoose), PostgreSQL (pg, Prisma), MySQL (mysql2), SQLite (better-sqlite3). ORMs like Prisma and Sequelize provide type-safe queries. Connection pooling reuses database connections for efficiency. Always use parameterized queries to prevent SQL injection attacks.",
      codeExamples: [
        { language: "javascript", code: '// PostgreSQL with pg library\nconst { Pool } = require("pg");\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL });\n\nasync function getUsers() {\n  // Parameterized query (prevents SQL injection)\n  const result = await pool.query(\n    "SELECT * FROM users WHERE age > $1 ORDER BY name",\n    [18]\n  );\n  return result.rows;\n}\n\n// MongoDB with Mongoose\nconst mongoose = require("mongoose");\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, unique: true },\n  age: { type: Number, min: 0 }\n});\n\nconst User = mongoose.model("User", userSchema);\n\nasync function createUser(data) {\n  const user = new User(data);\n  return await user.save();\n}', explanation: "Database integration with PostgreSQL and MongoDB." }
      ],
      exercises: [
        { question: "Write an Express route handler that fetches paginated results from a database.", solution: 'app.get("/api/users", async (req, res) => {\n  const page = parseInt(req.query.page) || 1;\n  const limit = parseInt(req.query.limit) || 10;\n  const offset = (page - 1) * limit;\n\n  const [users, total] = await Promise.all([\n    pool.query("SELECT * FROM users LIMIT $1 OFFSET $2", [limit, offset]),\n    pool.query("SELECT COUNT(*) FROM users")\n  ]);\n\n  res.json({\n    data: users.rows,\n    page,\n    totalPages: Math.ceil(total.rows[0].count / limit),\n    total: parseInt(total.rows[0].count)\n  });\n});', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Prisma Documentation", url: "https://www.prisma.io/docs" },
        { title: "Mongoose Guide", url: "https://mongoosejs.com/docs/guide.html" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "node-13", title: "Authentication & JWT",
      content: "JSON Web Tokens (JWT) are a secure way to handle authentication in APIs. The flow: user logs in with credentials → server verifies and creates a JWT → client stores the token → client sends token with each request → server verifies token. JWTs contain a header (algorithm), payload (user data), and signature. Use bcrypt to hash passwords — never store plain text passwords.",
      codeExamples: [
        { language: "javascript", code: 'const jwt = require("jsonwebtoken");\nconst bcrypt = require("bcrypt");\n\n// Register\napp.post("/api/register", async (req, res) => {\n  const { email, password } = req.body;\n  const hashedPassword = await bcrypt.hash(password, 10);\n  // Save to database...\n  const user = { id: 1, email, password: hashedPassword };\n  res.status(201).json({ message: "User created" });\n});\n\n// Login\napp.post("/api/login", async (req, res) => {\n  const { email, password } = req.body;\n  const user = await findUserByEmail(email);\n  if (!user || !(await bcrypt.compare(password, user.password))) {\n    return res.status(401).json({ error: "Invalid credentials" });\n  }\n  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {\n    expiresIn: "24h"\n  });\n  res.json({ token });\n});', explanation: "Registration with hashed passwords and login with JWT generation." }
      ],
      exercises: [
        { question: "Create a middleware that verifies JWT tokens and adds user data to the request object.", solution: 'const authMiddleware = (req, res, next) => {\n  const authHeader = req.headers.authorization;\n  if (!authHeader?.startsWith("Bearer ")) {\n    return res.status(401).json({ error: "No token provided" });\n  }\n  try {\n    const token = authHeader.split(" ")[1];\n    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n    req.user = decoded;\n    next();\n  } catch (err) {\n    res.status(403).json({ error: "Invalid or expired token" });\n  }\n};\n\n// Protected route\napp.get("/api/profile", authMiddleware, (req, res) => {\n  res.json({ user: req.user });\n});', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "JWT.io", url: "https://jwt.io/" },
        { title: "OWASP Auth Cheatsheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" }
      ],
      estimatedMinutes: 30
    },
  ],
  hard: [
    {
      id: "node-14", title: "Event Loop & Performance",
      content: "The Node.js event loop is the core of its non-blocking I/O model. It has phases: timers, pending callbacks, idle/prepare, poll, check, close callbacks. Understanding the event loop helps prevent blocking and optimize performance. CPU-intensive tasks should use Worker Threads. process.nextTick runs before the next event loop iteration; setImmediate runs in the check phase.",
      codeExamples: [
        { language: "javascript", code: '// Event loop phases demonstration\nconsole.log("1: Synchronous");\n\nsetTimeout(() => console.log("2: setTimeout (timer phase)"), 0);\n\nsetImmediate(() => console.log("3: setImmediate (check phase)"));\n\nprocess.nextTick(() => console.log("4: nextTick (microtask)"));\n\nPromise.resolve().then(() => console.log("5: Promise (microtask)"));\n\nconsole.log("6: Synchronous");\n\n// Output order: 1, 6, 4, 5, 2, 3\n// Sync → nextTick → Promise → setTimeout → setImmediate\n\n// Worker Threads for CPU-intensive tasks\nconst { Worker, isMainThread, workerData } = require("worker_threads");\n\nif (isMainThread) {\n  const worker = new Worker(__filename, { workerData: 100000000 });\n  worker.on("message", (result) => console.log("Sum:", result));\n} else {\n  let sum = 0;\n  for (let i = 0; i < workerData; i++) sum += i;\n  require("worker_threads").parentPort.postMessage(sum);\n}', explanation: "Event loop phases and Worker Threads for CPU-heavy operations." }
      ],
      exercises: [
        { question: "Write a script that demonstrates the order of execution for setTimeout, setImmediate, process.nextTick, and Promises.", solution: 'console.log("Start");\nsetTimeout(() => console.log("setTimeout"), 0);\nsetImmediate(() => console.log("setImmediate"));\nprocess.nextTick(() => console.log("nextTick"));\nPromise.resolve().then(() => console.log("Promise"));\nconsole.log("End");\n// Start → End → nextTick → Promise → setTimeout → setImmediate', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Node.js Event Loop", url: "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "node-15", title: "Security Best Practices",
      content: "Node.js security covers: input validation, SQL/NoSQL injection prevention, XSS protection, CSRF tokens, rate limiting, CORS configuration, helmet.js for HTTP headers, and environment variable management. Never expose stack traces in production. Always validate and sanitize user input. Use HTTPS, hash passwords with bcrypt, and implement proper authentication/authorization.",
      codeExamples: [
        { language: "javascript", code: 'const express = require("express");\nconst helmet = require("helmet");\nconst cors = require("cors");\nconst rateLimit = require("express-rate-limit");\n\nconst app = express();\n\n// Security headers\napp.use(helmet());\n\n// CORS configuration\napp.use(cors({\n  origin: ["https://myapp.com"],\n  methods: ["GET", "POST", "PUT", "DELETE"],\n  credentials: true\n}));\n\n// Rate limiting\napp.use(rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100 // limit each IP to 100 requests per window\n}));\n\n// Input sanitization\nconst sanitize = (str) => str.replace(/[<>\"\\\'&]/g, "");\n\napp.post("/api/comments", (req, res) => {\n  const comment = sanitize(req.body.text);\n  // Save sanitized comment...\n});', explanation: "Essential security middleware and input sanitization." }
      ],
      exercises: [
        { question: "Implement a secure Express setup with helmet, CORS, rate limiting, and input validation.", solution: '// See code example above for complete implementation\n// Additionally add:\nconst { body, validationResult } = require("express-validator");\n\napp.post("/api/users",\n  body("email").isEmail().normalizeEmail(),\n  body("name").trim().isLength({ min: 2, max: 50 }),\n  body("password").isStrongPassword(),\n  (req, res) => {\n    const errors = validationResult(req);\n    if (!errors.isEmpty()) {\n      return res.status(400).json({ errors: errors.array() });\n    }\n    // Process valid input...\n  }\n);', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Node.js Security Checklist", url: "https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html" },
        { title: "Helmet.js", url: "https://helmetjs.github.io/" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "node-16", title: "Testing Node.js Applications",
      content: "Testing ensures your code works correctly. Unit tests test individual functions. Integration tests test components together. End-to-end tests test the full system. Popular frameworks: Jest, Mocha, Vitest. Use supertest for testing HTTP endpoints. Mock external dependencies to isolate tests. Aim for meaningful test coverage, not 100% coverage.",
      codeExamples: [
        { language: "javascript", code: '// math.js\nconst add = (a, b) => a + b;\nconst divide = (a, b) => {\n  if (b === 0) throw new Error("Cannot divide by zero");\n  return a / b;\n};\nmodule.exports = { add, divide };\n\n// math.test.js (Jest)\nconst { add, divide } = require("./math");\n\ndescribe("Math functions", () => {\n  test("add returns sum of two numbers", () => {\n    expect(add(2, 3)).toBe(5);\n    expect(add(-1, 1)).toBe(0);\n  });\n\n  test("divide returns quotient", () => {\n    expect(divide(10, 2)).toBe(5);\n  });\n\n  test("divide throws on zero", () => {\n    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");\n  });\n});\n\n// API test with supertest\nconst request = require("supertest");\nconst app = require("./app");\n\ndescribe("GET /api/users", () => {\n  it("returns 200 and array of users", async () => {\n    const res = await request(app).get("/api/users");\n    expect(res.status).toBe(200);\n    expect(Array.isArray(res.body.data)).toBe(true);\n  });\n});', explanation: "Unit tests with Jest and API tests with supertest." }
      ],
      exercises: [
        { question: "Write tests for a user authentication module covering: valid login, invalid password, and missing user scenarios.", solution: 'describe("Authentication", () => {\n  test("valid credentials return token", async () => {\n    const res = await request(app)\n      .post("/api/login")\n      .send({ email: "test@test.com", password: "Password1!" });\n    expect(res.status).toBe(200);\n    expect(res.body.token).toBeDefined();\n  });\n\n  test("wrong password returns 401", async () => {\n    const res = await request(app)\n      .post("/api/login")\n      .send({ email: "test@test.com", password: "wrong" });\n    expect(res.status).toBe(401);\n  });\n\n  test("non-existent user returns 401", async () => {\n    const res = await request(app)\n      .post("/api/login")\n      .send({ email: "none@test.com", password: "test" });\n    expect(res.status).toBe(401);\n  });\n});', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Jest Documentation", url: "https://jestjs.io/docs/getting-started" },
        { title: "Supertest", url: "https://github.com/ladakh/supertest" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "node-17", title: "Deployment & Production",
      content: "Production Node.js apps need: process managers (PM2), environment variables, logging, monitoring, clustering for multi-core, graceful shutdown, health checks, and CI/CD. Docker containers ensure consistent environments. Use reverse proxies (Nginx) for SSL, load balancing, and static file serving. Monitor with tools like Datadog or New Relic.",
      codeExamples: [
        { language: "javascript", code: '// Clustering (use all CPU cores)\nconst cluster = require("cluster");\nconst os = require("os");\n\nif (cluster.isPrimary) {\n  const numCPUs = os.cpus().length;\n  console.log(`Primary process starting ${numCPUs} workers`);\n  \n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n  \n  cluster.on("exit", (worker) => {\n    console.log(`Worker ${worker.process.pid} died, restarting...`);\n    cluster.fork();\n  });\n} else {\n  const app = require("./app");\n  app.listen(3000, () => {\n    console.log(`Worker ${process.pid} started`);\n  });\n}\n\n// Graceful shutdown\nprocess.on("SIGTERM", () => {\n  console.log("SIGTERM received, shutting down gracefully");\n  server.close(() => {\n    pool.end(); // Close DB connections\n    process.exit(0);\n  });\n});', explanation: "Clustering for performance and graceful shutdown for reliability." }
      ],
      exercises: [
        { question: "Create a Dockerfile for a Node.js application with multi-stage build.", solution: '# Build stage\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Production stage\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/package*.json ./\nRUN npm ci --production\n\nEXPOSE 3000\nCMD ["node", "dist/index.js"]', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "PM2 Documentation", url: "https://pm2.keymetrics.io/docs/" },
        { title: "Docker Node.js Guide", url: "https://nodejs.org/en/docs/guides/nodejs-docker-webapp" }
      ],
      estimatedMinutes: 30
    },
  ],
};
