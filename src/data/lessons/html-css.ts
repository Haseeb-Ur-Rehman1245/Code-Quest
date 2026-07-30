import { CourseLessons } from "./types";

export const htmlCssLessons: CourseLessons = {
  easy: [
    {
      id: "html-1", title: "What is HTML?",
      content: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of websites using a system of tags and elements. Every website you visit uses HTML as its foundation. HTML uses a tree structure where elements can contain other elements, creating a hierarchy called the DOM (Document Object Model). Tags are written with angle brackets like <tagname> and most have opening and closing pairs.",
      codeExamples: [
        { language: "html", code: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n  <p>This is my first HTML page.</p>\n</body>\n</html>', explanation: "A basic HTML document with DOCTYPE declaration, head section for metadata, and body for visible content." },
        { language: "html", code: '<h1>Main Heading</h1>\n<h2>Subheading</h2>\n<p>A paragraph of text.</p>\n<strong>Bold text</strong>\n<em>Italic text</em>', explanation: "Common HTML elements for text formatting and headings." }
      ],
      exercises: [
        { question: "Create an HTML page with a heading, a paragraph, and an unordered list of 3 items.", solution: '<!DOCTYPE html>\n<html>\n<body>\n  <h1>My List</h1>\n  <p>Here are my favorite fruits:</p>\n  <ul>\n    <li>Apple</li>\n    <li>Banana</li>\n    <li>Cherry</li>\n  </ul>\n</body>\n</html>', difficulty: "beginner" },
        { question: "Create a page with all 6 heading levels (h1-h6).", solution: '<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "MDN HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML" },
        { title: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" },
        { title: "HackerRank HTML Challenges", url: "https://www.hackerrank.com/domains/tutorials/10-days-of-javascript" }
      ],
      estimatedMinutes: 15
    },
    {
      id: "html-2", title: "HTML Elements & Tags",
      content: "HTML elements are the building blocks of HTML pages. An element is defined by a start tag, some content, and an end tag. Some elements are self-closing (void elements) like <img>, <br>, and <input>. Elements can have attributes that provide additional information. Common attributes include id (unique identifier), class (CSS styling), and style (inline styles). Attributes are always specified in the start tag and usually come in name/value pairs.",
      codeExamples: [
        { language: "html", code: '<!-- Block elements -->\n<div>A division/container</div>\n<p>A paragraph</p>\n<header>Page header</header>\n<footer>Page footer</footer>\n\n<!-- Inline elements -->\n<span>Inline text</span>\n<a href="https://example.com">A link</a>\n<strong>Bold</strong>\n<em>Italic</em>', explanation: "Block elements take full width; inline elements only take needed space." },
        { language: "html", code: '<!-- Self-closing elements -->\n<img src="photo.jpg" alt="A photo">\n<br>\n<hr>\n<input type="text" placeholder="Enter name">', explanation: "Void elements don\'t have closing tags and cannot contain content." }
      ],
      exercises: [
        { question: "Create a webpage with a header, main section, and footer using semantic HTML.", solution: '<header>\n  <h1>My Website</h1>\n  <nav><a href="/">Home</a> | <a href="/about">About</a></nav>\n</header>\n<main>\n  <p>Welcome to my website!</p>\n</main>\n<footer>\n  <p>&copy; 2025 My Website</p>\n</footer>', difficulty: "beginner" },
        { question: "Create a contact form with name, email, and message fields.", solution: '<form>\n  <label>Name: <input type="text" name="name"></label><br>\n  <label>Email: <input type="email" name="email"></label><br>\n  <label>Message: <textarea name="message"></textarea></label><br>\n  <button type="submit">Send</button>\n</form>', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "MDN HTML Elements Reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element" },
        { title: "W3Schools HTML Elements", url: "https://www.w3schools.com/html/html_elements.asp" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "html-3", title: "HTML Lists & Tables",
      content: "HTML provides three types of lists: ordered lists (<ol>), unordered lists (<ul>), and description lists (<dl>). Each list item is wrapped in <li> tags. Tables are created with <table>, rows with <tr>, headers with <th>, and data cells with <td>. Tables should be used for tabular data, not layout. You can span cells across rows or columns using rowspan and colspan attributes.",
      codeExamples: [
        { language: "html", code: '<ul>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Nested list:\n    <ol>\n      <li>Sub-item 1</li>\n      <li>Sub-item 2</li>\n    </ol>\n  </li>\n</ul>', explanation: "Lists can be nested inside each other. UL for bullets, OL for numbers." },
        { language: "html", code: '<table border="1">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Age</th>\n      <th>City</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Alice</td>\n      <td>25</td>\n      <td>NYC</td>\n    </tr>\n    <tr>\n      <td>Bob</td>\n      <td>30</td>\n      <td>LA</td>\n    </tr>\n  </tbody>\n</table>', explanation: "A table with semantic thead and tbody sections." }
      ],
      exercises: [
        { question: "Create a table showing 5 students with Name, Grade, and Subject columns.", solution: '<table>\n  <tr><th>Name</th><th>Grade</th><th>Subject</th></tr>\n  <tr><td>Ali</td><td>A</td><td>Math</td></tr>\n  <tr><td>Sara</td><td>B+</td><td>Science</td></tr>\n  <tr><td>Ahmed</td><td>A-</td><td>English</td></tr>\n  <tr><td>Fatima</td><td>A+</td><td>CS</td></tr>\n  <tr><td>Omar</td><td>B</td><td>History</td></tr>\n</table>', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "MDN HTML Tables", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables" },
        { title: "W3Schools Tables", url: "https://www.w3schools.com/html/html_tables.asp" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "html-4", title: "HTML Forms & Input",
      content: "Forms are essential for collecting user data. The <form> element wraps all input fields and has action (URL to send data) and method (GET or POST) attributes. Input types include text, email, password, number, date, checkbox, radio, file, and more. Labels improve accessibility by associating text with form controls. The required attribute makes fields mandatory, and pattern allows regex validation.",
      codeExamples: [
        { language: "html", code: '<form action="/submit" method="POST">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" required>\n\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" required>\n\n  <label for="pass">Password:</label>\n  <input type="password" id="pass" name="password" minlength="8">\n\n  <label>\n    <input type="checkbox" name="terms"> I agree to terms\n  </label>\n\n  <button type="submit">Register</button>\n</form>', explanation: "A registration form with validation using HTML5 attributes." },
        { language: "html", code: '<fieldset>\n  <legend>Choose your role:</legend>\n  <label><input type="radio" name="role" value="student"> Student</label>\n  <label><input type="radio" name="role" value="teacher"> Teacher</label>\n</fieldset>\n\n<label>Country:\n  <select name="country">\n    <option value="pk">Pakistan</option>\n    <option value="us">USA</option>\n    <option value="uk">UK</option>\n  </select>\n</label>', explanation: "Radio buttons for single selection and dropdown menus." }
      ],
      exercises: [
        { question: "Create a login form with email, password, and a 'Remember me' checkbox.", solution: '<form>\n  <label>Email: <input type="email" required></label>\n  <label>Password: <input type="password" required></label>\n  <label><input type="checkbox"> Remember me</label>\n  <button type="submit">Login</button>\n</form>', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "MDN HTML Forms", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms" },
        { title: "W3Schools Forms", url: "https://www.w3schools.com/html/html_forms.asp" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "html-5", title: "HTML Links & Images",
      content: "The <a> (anchor) element creates hyperlinks. The href attribute specifies the destination URL. Use target='_blank' to open in a new tab. Images use the <img> tag with src (source path) and alt (alternative text for accessibility) attributes. The <figure> and <figcaption> elements provide semantic wrappers for images with captions. Relative paths reference files within your project; absolute paths link to external resources.",
      codeExamples: [
        { language: "html", code: '<!-- Different link types -->\n<a href="https://google.com" target="_blank">External link</a>\n<a href="/about.html">Internal link</a>\n<a href="#section2">Anchor link</a>\n<a href="mailto:test@email.com">Email link</a>\n\n<!-- Images -->\n<img src="photo.jpg" alt="A sunset" width="400" height="300">\n\n<figure>\n  <img src="chart.png" alt="Sales chart">\n  <figcaption>Quarterly sales data</figcaption>\n</figure>', explanation: "Various link types and image usage with semantic figure element." }
      ],
      exercises: [
        { question: "Create a navigation bar with 4 links and an image logo.", solution: '<nav>\n  <img src="logo.png" alt="Logo" width="50">\n  <a href="/">Home</a>\n  <a href="/about">About</a>\n  <a href="/courses">Courses</a>\n  <a href="/contact">Contact</a>\n</nav>', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "MDN Links", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks" },
        { title: "W3Schools Images", url: "https://www.w3schools.com/html/html_images.asp" }
      ],
      estimatedMinutes: 15
    },
    {
      id: "html-6", title: "Semantic HTML",
      content: "Semantic HTML uses meaningful tags instead of generic <div> and <span>. Tags like <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> describe the purpose of content. This improves accessibility for screen readers, SEO for search engines, and code readability for developers. The <article> element represents self-contained content, while <section> groups related content with a heading.",
      codeExamples: [
        { language: "html", code: '<header>\n  <nav>\n    <a href="/">Home</a>\n    <a href="/blog">Blog</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>Blog Post Title</h2>\n    <time datetime="2025-01-15">Jan 15, 2025</time>\n    <p>Article content here...</p>\n  </article>\n\n  <aside>\n    <h3>Related Posts</h3>\n    <ul><li><a href="#">Another Post</a></li></ul>\n  </aside>\n</main>\n\n<footer>\n  <p>&copy; 2025 My Blog</p>\n</footer>', explanation: "A blog layout using semantic HTML5 elements." }
      ],
      exercises: [
        { question: "Convert a div-based layout to use semantic HTML elements.", solution: '<header><h1>Site Title</h1></header>\n<nav><a href="/">Home</a></nav>\n<main>\n  <section><h2>About</h2><p>Content</p></section>\n  <section><h2>Services</h2><p>Content</p></section>\n</main>\n<footer><p>Footer</p></footer>', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "MDN Semantic HTML", url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics" },
        { title: "W3Schools Semantic Elements", url: "https://www.w3schools.com/html/html5_semantic_elements.asp" }
      ],
      estimatedMinutes: 15
    },
    {
      id: "html-7", title: "Introduction to CSS",
      content: "CSS (Cascading Style Sheets) controls the visual presentation of HTML. CSS can be applied inline (style attribute), internally (<style> tag), or externally (linked .css file). External stylesheets are preferred for maintainability. CSS uses selectors to target elements: element selectors (p), class selectors (.classname), ID selectors (#idname), and attribute selectors. Properties like color, font-size, margin, and padding control appearance.",
      codeExamples: [
        { language: "css", code: '/* Element selector */\nh1 {\n  color: #333;\n  font-size: 2rem;\n}\n\n/* Class selector */\n.card {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n}\n\n/* ID selector */\n#hero {\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  padding: 60px;\n  text-align: center;\n}', explanation: "Three types of CSS selectors with common styling properties." },
        { language: "html", code: '<!-- Linking external CSS -->\n<link rel="stylesheet" href="styles.css">\n\n<!-- Internal CSS -->\n<style>\n  body { font-family: Arial, sans-serif; }\n</style>\n\n<!-- Inline CSS (avoid) -->\n<p style="color: red;">Red text</p>', explanation: "Three ways to apply CSS — external is best practice." }
      ],
      exercises: [
        { question: "Style a card component with a shadow, rounded corners, and padding.", solution: '.card {\n  background: #fff;\n  padding: 24px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n  max-width: 400px;\n  margin: 20px auto;\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "MDN CSS First Steps", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps" },
        { title: "W3Schools CSS Tutorial", url: "https://www.w3schools.com/css/" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "html-8", title: "CSS Box Model & Spacing",
      content: "Every HTML element is a rectangular box with four layers: content, padding (space inside border), border, and margin (space outside border). The box-sizing property controls how width/height are calculated. With border-box, padding and border are included in the element's total width, making layout calculations easier. Margins can collapse — when two vertical margins touch, only the larger one applies.",
      codeExamples: [
        { language: "css", code: '/* Always use border-box */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n.container {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;          /* Center horizontally */\n  padding: 0 20px;         /* Side padding */\n}\n\n.card {\n  margin-bottom: 20px;     /* Space between cards */\n  padding: 24px;           /* Inner spacing */\n  border: 1px solid #ddd;  /* Visible border */\n}', explanation: "Box model fundamentals with practical examples." }
      ],
      exercises: [
        { question: "Create a centered container with max-width 800px and consistent padding.", solution: '.container {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n  box-sizing: border-box;\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "MDN Box Model", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model" },
        { title: "W3Schools Box Model", url: "https://www.w3schools.com/css/css_boxmodel.asp" }
      ],
      estimatedMinutes: 20
    },
  ],
  intermediate: [
    {
      id: "html-9", title: "CSS Flexbox",
      content: "Flexbox is a one-dimensional layout system for arranging items in rows or columns. Set display: flex on a container, then use justify-content for horizontal alignment and align-items for vertical alignment. flex-direction controls the main axis (row or column). flex-wrap allows items to wrap to new lines. Individual items can use flex-grow, flex-shrink, and flex-basis (shorthand: flex) to control sizing.",
      codeExamples: [
        { language: "css", code: '.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n}\n\n.card-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.card-grid .card {\n  flex: 1 1 300px; /* grow, shrink, basis */\n}', explanation: "Navbar with space-between and a wrapping card grid." },
        { language: "css", code: '/* Center anything */\n.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n\n/* Sidebar layout */\n.layout {\n  display: flex;\n}\n.sidebar { width: 250px; flex-shrink: 0; }\n.main { flex: 1; }', explanation: "Perfect centering and sidebar layout patterns." }
      ],
      exercises: [
        { question: "Create a header with logo on the left and nav links on the right using Flexbox.", solution: '.header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px;\n}\n.nav-links {\n  display: flex;\n  gap: 20px;\n  list-style: none;\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "CSS Tricks Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
        { title: "Flexbox Froggy Game", url: "https://flexboxfroggy.com/" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "html-10", title: "CSS Grid Layout",
      content: "CSS Grid is a two-dimensional layout system for both rows and columns simultaneously. Define a grid with display: grid and grid-template-columns/rows. Use fr units for fractional space, repeat() for patterns, and minmax() for responsive sizing. Place items using grid-column and grid-row or named grid areas. Grid and Flexbox complement each other — use Grid for page layout, Flexbox for component layout.",
      codeExamples: [
        { language: "css", code: '.dashboard {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 20px;\n}\n\n.page-layout {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";\n  min-height: 100vh;\n}\n.header { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main { grid-area: main; }\n.footer { grid-area: footer; }', explanation: "Responsive card grid and full page layout with named areas." }
      ],
      exercises: [
        { question: "Create a responsive 3-column grid that becomes 1 column on mobile.", solution: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n  padding: 16px;\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "CSS Tricks Grid Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" },
        { title: "Grid Garden Game", url: "https://cssgridgarden.com/" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "html-11", title: "Responsive Design & Media Queries",
      content: "Responsive design ensures your website works on all screen sizes. Use the viewport meta tag, relative units (%, em, rem, vw, vh), and media queries to adapt layouts. Mobile-first design starts with mobile styles and adds complexity for larger screens using min-width queries. Common breakpoints are 480px (mobile), 768px (tablet), 1024px (laptop), 1200px (desktop).",
      codeExamples: [
        { language: "css", code: '/* Mobile-first base styles */\n.container { padding: 16px; }\n.card-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n/* Tablet */\n@media (min-width: 768px) {\n  .card-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .container { max-width: 1200px; margin: 0 auto; }\n  .card-grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}', explanation: "Mobile-first responsive grid using media queries." }
      ],
      exercises: [
        { question: "Create a navigation that shows as a horizontal bar on desktop and stacks vertically on mobile.", solution: '.nav { display: flex; flex-direction: column; gap: 8px; }\n@media (min-width: 768px) {\n  .nav { flex-direction: row; gap: 24px; }\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "MDN Responsive Design", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design" },
        { title: "W3Schools Media Queries", url: "https://www.w3schools.com/css/css_rwd_mediaqueries.asp" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "html-12", title: "CSS Typography & Colors",
      content: "Typography is crucial for readability. Use font-family with fallback fonts, rem units for font-size (1rem = 16px default), and line-height around 1.5-1.7 for body text. CSS supports colors in hex (#ff5733), RGB (rgb(255,87,51)), HSL (hsl(14,100%,60%)), and named colors. CSS custom properties (variables) enable consistent theming with --variable-name syntax.",
      codeExamples: [
        { language: "css", code: ':root {\n  --font-sans: "Inter", system-ui, sans-serif;\n  --font-mono: "Fira Code", monospace;\n  --color-primary: hsl(220, 90%, 56%);\n  --color-text: hsl(220, 20%, 20%);\n  --color-muted: hsl(220, 10%, 60%);\n}\n\nbody {\n  font-family: var(--font-sans);\n  color: var(--color-text);\n  line-height: 1.6;\n}\n\nh1 { font-size: 2.5rem; font-weight: 700; letter-spacing: -0.02em; }\nh2 { font-size: 2rem; font-weight: 600; }\ncode { font-family: var(--font-mono); background: #f4f4f5; padding: 2px 6px; border-radius: 4px; }', explanation: "Typography system with CSS variables for consistent styling." }
      ],
      exercises: [
        { question: "Create a dark theme color scheme using CSS variables.", solution: ':root {\n  --bg: hsl(222, 47%, 6%);\n  --text: hsl(210, 40%, 96%);\n  --primary: hsl(25, 95%, 55%);\n  --muted: hsl(222, 30%, 16%);\n}\nbody { background: var(--bg); color: var(--text); }', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Google Fonts", url: "https://fonts.google.com/" },
        { title: "MDN CSS Colors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "html-13", title: "CSS Transitions & Hover Effects",
      content: "CSS transitions animate property changes smoothly. Use the transition property with property name, duration, timing function, and delay. Common timing functions: ease, ease-in-out, linear, cubic-bezier(). The :hover pseudo-class triggers styles on mouse hover. Transform allows scale, rotate, translate, and skew. Combine transitions with transforms for interactive UI effects.",
      codeExamples: [
        { language: "css", code: '.button {\n  background: hsl(220, 90%, 56%);\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.button:hover {\n  background: hsl(220, 90%, 46%);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0,0,0,0.2);\n}\n\n.card {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.card:hover {\n  transform: scale(1.03);\n  box-shadow: 0 8px 24px rgba(0,0,0,0.15);\n}', explanation: "Button and card hover effects with smooth transitions." }
      ],
      exercises: [
        { question: "Create a link that changes color and adds an underline on hover with a smooth transition.", solution: 'a {\n  color: hsl(220, 90%, 56%);\n  text-decoration: none;\n  transition: color 0.2s ease;\n  border-bottom: 2px solid transparent;\n}\na:hover {\n  color: hsl(220, 90%, 40%);\n  border-bottom-color: currentColor;\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "MDN CSS Transitions", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions" },
        { title: "W3Schools Transitions", url: "https://www.w3schools.com/css/css3_transitions.asp" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "html-14", title: "CSS Pseudo-classes & Pseudo-elements",
      content: "Pseudo-classes select elements based on state (:hover, :focus, :active, :first-child, :nth-child). Pseudo-elements style specific parts of elements (::before, ::after, ::first-line, ::placeholder). Use ::before and ::after with the content property to add decorative elements without extra HTML. :nth-child() accepts formulas like 2n (even), 2n+1 (odd), or specific numbers.",
      codeExamples: [
        { language: "css", code: '/* Zebra-striped table */\ntr:nth-child(even) { background: #f5f5f5; }\ntr:hover { background: #e8e8e8; }\n\n/* Custom bullet points */\n.feature-list li::before {\n  content: "✓ ";\n  color: green;\n  font-weight: bold;\n}\n\n/* Focus styles for accessibility */\ninput:focus {\n  outline: 2px solid hsl(220, 90%, 56%);\n  outline-offset: 2px;\n}\n\n/* Required field indicator */\nlabel.required::after {\n  content: " *";\n  color: red;\n}', explanation: "Practical pseudo-class and pseudo-element patterns." }
      ],
      exercises: [
        { question: "Style a list where every third item has a different background color.", solution: 'li:nth-child(3n) {\n  background: hsl(220, 90%, 95%);\n  padding: 8px;\n  border-radius: 4px;\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "MDN Pseudo-classes", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes" },
        { title: "W3Schools Pseudo-elements", url: "https://www.w3schools.com/css/css_pseudo_elements.asp" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "html-15", title: "CSS Positioning",
      content: "The position property controls element placement: static (default), relative (offset from normal position), absolute (relative to nearest positioned ancestor), fixed (relative to viewport), and sticky (hybrid of relative and fixed). Z-index controls stacking order of positioned elements. Use position: sticky for headers that stick while scrolling. Absolute positioning is great for overlays and tooltips.",
      codeExamples: [
        { language: "css", code: '/* Sticky navigation */\n.navbar {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background: white;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n/* Tooltip */\n.tooltip-wrapper {\n  position: relative;\n}\n.tooltip {\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #333;\n  color: white;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  white-space: nowrap;\n  display: none;\n}\n.tooltip-wrapper:hover .tooltip {\n  display: block;\n}', explanation: "Sticky nav and tooltip patterns using CSS positioning." }
      ],
      exercises: [
        { question: "Create a fixed 'back to top' button in the bottom-right corner.", solution: '.back-to-top {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: hsl(220, 90%, 56%);\n  color: white;\n  border: none;\n  cursor: pointer;\n  z-index: 50;\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "MDN CSS Position", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position" },
        { title: "W3Schools Position", url: "https://www.w3schools.com/css/css_positioning.asp" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "html-16", title: "CSS Variables & Custom Properties",
      content: "CSS custom properties (variables) enable reusable values throughout your stylesheet. Define with --name syntax in a selector (usually :root for global). Access with var(--name, fallback). Variables cascade and can be overridden in child selectors, enabling themes. Combined with JavaScript, you can dynamically change themes. CSS variables work in media queries and calc() expressions.",
      codeExamples: [
        { language: "css", code: ':root {\n  --spacing-sm: 8px;\n  --spacing-md: 16px;\n  --spacing-lg: 24px;\n  --radius: 8px;\n  --color-bg: hsl(0, 0%, 100%);\n  --color-text: hsl(0, 0%, 10%);\n}\n\n/* Dark theme override */\n[data-theme="dark"] {\n  --color-bg: hsl(222, 47%, 6%);\n  --color-text: hsl(210, 40%, 96%);\n}\n\n.card {\n  background: var(--color-bg);\n  color: var(--color-text);\n  padding: var(--spacing-lg);\n  border-radius: var(--radius);\n}', explanation: "Theme-switching system using CSS custom properties." }
      ],
      exercises: [
        { question: "Create a design token system with spacing, colors, and border-radius variables.", solution: ':root {\n  --space-1: 4px;\n  --space-2: 8px;\n  --space-3: 16px;\n  --space-4: 24px;\n  --blue: hsl(220, 90%, 56%);\n  --gray: hsl(220, 10%, 60%);\n  --radius-sm: 4px;\n  --radius-md: 8px;\n  --radius-lg: 16px;\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "MDN CSS Variables", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" }
      ],
      estimatedMinutes: 15
    },
  ],
  hard: [
    {
      id: "html-17", title: "CSS Animations & Keyframes",
      content: "CSS @keyframes animations allow complex multi-step animations. Define keyframes with @keyframes name { from/to or percentages }, then apply with animation property (name, duration, timing, delay, iteration-count, direction, fill-mode). animation-fill-mode: forwards keeps the end state. Use will-change to hint browser for GPU acceleration. Combine with transform for performant animations (avoid animating width/height).",
      codeExamples: [
        { language: "css", code: '@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.05); }\n}\n\n.hero-title {\n  animation: fadeInUp 0.8s ease-out;\n}\n\n.cta-button {\n  animation: pulse 2s ease-in-out infinite;\n}\n\n/* Staggered animation */\n.card:nth-child(1) { animation-delay: 0.1s; }\n.card:nth-child(2) { animation-delay: 0.2s; }\n.card:nth-child(3) { animation-delay: 0.3s; }', explanation: "Keyframe animations with staggered delays for cards." }
      ],
      exercises: [
        { question: "Create a loading spinner using CSS animations.", solution: '.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid hsl(220, 10%, 90%);\n  border-top-color: hsl(220, 90%, 56%);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "MDN CSS Animations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations" },
        { title: "Animista", url: "https://animista.net/" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "html-18", title: "Advanced Selectors & Specificity",
      content: "CSS specificity determines which styles apply when multiple rules target the same element. The hierarchy: inline styles (1000) > IDs (100) > classes/attributes/pseudo-classes (10) > elements/pseudo-elements (1). !important overrides all but should be avoided. Advanced selectors include: :is(), :where(), :has() (parent selector), [attr~=value], and combinator selectors (>, +, ~).",
      codeExamples: [
        { language: "css", code: '/* :has() - the parent selector */\n.card:has(img) {\n  padding: 0;\n}\n\n/* :is() - grouping selectors */\n:is(h1, h2, h3) {\n  font-weight: 700;\n  line-height: 1.2;\n}\n\n/* :where() - zero specificity grouping */\n:where(.card, .panel, .box) {\n  border-radius: 8px;\n}\n\n/* Adjacent sibling */\nh2 + p {\n  font-size: 1.1rem;\n  color: gray;\n}\n\n/* Attribute selectors */\na[href^="https"] { /* starts with https */ }\na[href$=".pdf"] { /* ends with .pdf */ }\na[href*="example"] { /* contains example */ }', explanation: "Modern CSS selectors for powerful, precise targeting." }
      ],
      exercises: [
        { question: "Style all external links (starting with http) differently from internal links.", solution: 'a[href^="http"]::after {\n  content: " ↗";\n  font-size: 0.8em;\n}\na[href^="http"] {\n  color: hsl(220, 90%, 56%);\n}\na:not([href^="http"]) {\n  color: inherit;\n}', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "MDN CSS Specificity", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity" },
        { title: "Specificity Calculator", url: "https://specificity.keegan.st/" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "html-19", title: "CSS Grid Advanced Techniques",
      content: "Advanced Grid includes subgrid (inheriting parent grid tracks), auto-placement algorithms, dense packing, and complex responsive patterns without media queries. Use grid-auto-flow: dense to fill gaps. Container queries (@container) allow components to respond to their container size instead of viewport. Combine with clamp() for fluid typography and spacing.",
      codeExamples: [
        { language: "css", code: '/* Masonry-like layout */\n.masonry {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  grid-auto-rows: 10px;\n  gap: 16px;\n}\n.masonry-item.tall { grid-row: span 20; }\n.masonry-item.medium { grid-row: span 15; }\n.masonry-item.short { grid-row: span 10; }\n\n/* Fluid typography with clamp */\nh1 {\n  font-size: clamp(1.5rem, 4vw, 3rem);\n}\n\n/* Container queries */\n@container (min-width: 400px) {\n  .card { display: flex; gap: 16px; }\n}', explanation: "Advanced grid patterns and modern CSS features." }
      ],
      exercises: [
        { question: "Create a dashboard layout with a sidebar, header, and main content area using CSS Grid.", solution: '.dashboard {\n  display: grid;\n  grid-template-columns: 260px 1fr;\n  grid-template-rows: 64px 1fr;\n  grid-template-areas:\n    "sidebar header"\n    "sidebar main";\n  height: 100vh;\n}\n.sidebar { grid-area: sidebar; }\n.header { grid-area: header; }\n.main { grid-area: main; overflow-y: auto; }', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "MDN CSS Grid", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout" },
        { title: "Grid by Example", url: "https://gridbyexample.com/" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "html-20", title: "Accessibility & ARIA",
      content: "Web accessibility (a11y) ensures everyone can use your website, including people using screen readers, keyboard navigation, or other assistive technologies. Use semantic HTML, proper heading hierarchy, alt text, focus indicators, color contrast (4.5:1 ratio), and ARIA attributes when semantic HTML isn't enough. ARIA roles, states, and properties add meaning to custom widgets.",
      codeExamples: [
        { language: "html", code: '<!-- Accessible navigation -->\n<nav aria-label="Main navigation">\n  <ul role="menubar">\n    <li role="none"><a role="menuitem" href="/">Home</a></li>\n    <li role="none"><a role="menuitem" href="/about">About</a></li>\n  </ul>\n</nav>\n\n<!-- Skip link -->\n<a href="#main" class="skip-link">Skip to main content</a>\n\n<!-- Accessible form -->\n<form>\n  <label for="email">Email (required)</label>\n  <input id="email" type="email" required aria-describedby="email-help">\n  <span id="email-help">We\'ll never share your email.</span>\n</form>\n\n<!-- Screen reader only text -->\n<span class="sr-only">Close modal</span>', explanation: "Accessibility patterns for navigation, forms, and screen readers." }
      ],
      exercises: [
        { question: "Create an accessible modal dialog with ARIA attributes.", solution: '<div role="dialog" aria-modal="true" aria-labelledby="modal-title">\n  <h2 id="modal-title">Confirm Action</h2>\n  <p>Are you sure you want to proceed?</p>\n  <button>Cancel</button>\n  <button>Confirm</button>\n</div>', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "MDN Accessibility", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility" },
        { title: "WebAIM", url: "https://webaim.org/" },
        { title: "A11y Project", url: "https://www.a11yproject.com/" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "html-21", title: "CSS Preprocessors & Modern CSS",
      content: "Modern CSS features reduce the need for preprocessors: nesting (native CSS), :is()/:where(), container queries, cascade layers (@layer), and custom properties. However, Sass/SCSS still offers mixins, functions, and better organization for large projects. PostCSS with Autoprefixer handles vendor prefixes automatically. CSS Modules and CSS-in-JS provide scoping solutions.",
      codeExamples: [
        { language: "css", code: '/* Native CSS Nesting */\n.card {\n  padding: 24px;\n  background: white;\n\n  & .title {\n    font-size: 1.5rem;\n    font-weight: 600;\n  }\n\n  &:hover {\n    box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n  }\n\n  @media (min-width: 768px) {\n    & {\n      display: flex;\n      gap: 24px;\n    }\n  }\n}\n\n/* Cascade layers */\n@layer base, components, utilities;\n\n@layer base {\n  h1 { font-size: 2rem; }\n}\n@layer components {\n  .card { border-radius: 12px; }\n}', explanation: "Modern CSS features including native nesting and cascade layers." }
      ],
      exercises: [
        { question: "Refactor a flat CSS file to use native CSS nesting for a component.", solution: '.card {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n\n  & h3 { margin: 0 0 8px; }\n  & p { color: gray; }\n  &:hover { transform: translateY(-2px); }\n  &.featured { border: 2px solid blue; }\n}', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "MDN CSS Nesting", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting" },
        { title: "Sass Documentation", url: "https://sass-lang.com/documentation" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "html-22", title: "Performance & Optimization",
      content: "Web performance directly impacts user experience and SEO. Optimize images (WebP format, lazy loading, srcset for responsive images), minimize CSS/JS, use efficient selectors, avoid layout thrashing. Critical CSS should be inlined for above-the-fold content. Use font-display: swap for web fonts, preconnect for external resources, and defer/async for scripts.",
      codeExamples: [
        { language: "html", code: '<!-- Responsive images -->\n<img\n  src="photo-800.webp"\n  srcset="photo-400.webp 400w, photo-800.webp 800w, photo-1200.webp 1200w"\n  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"\n  alt="Landscape photo"\n  loading="lazy"\n  decoding="async"\n>\n\n<!-- Preconnect to external origins -->\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n\n<!-- Font optimization -->\n<style>\n@font-face {\n  font-family: "CustomFont";\n  src: url("font.woff2") format("woff2");\n  font-display: swap;\n}\n</style>', explanation: "Performance optimization techniques for images, fonts, and loading." }
      ],
      exercises: [
        { question: "Add lazy loading and responsive images to an image gallery.", solution: '<picture>\n  <source media="(min-width: 800px)" srcset="large.webp">\n  <source media="(min-width: 400px)" srcset="medium.webp">\n  <img src="small.webp" alt="Gallery image" loading="lazy">\n</picture>', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Web.dev Performance", url: "https://web.dev/performance" },
        { title: "PageSpeed Insights", url: "https://pagespeed.web.dev/" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "html-23", title: "HTML5 APIs & Media",
      content: "HTML5 introduced powerful APIs: Canvas for drawing, Audio/Video for media, Geolocation, Web Storage (localStorage/sessionStorage), Drag and Drop, and Web Workers for background processing. The <video> and <audio> elements support multiple formats with fallback content. The <canvas> element enables 2D graphics and animations via JavaScript.",
      codeExamples: [
        { language: "html", code: '<!-- Video with multiple sources -->\n<video controls width="640" poster="thumbnail.jpg">\n  <source src="video.mp4" type="video/mp4">\n  <source src="video.webm" type="video/webm">\n  <p>Your browser doesn\'t support video. <a href="video.mp4">Download</a></p>\n</video>\n\n<!-- Local storage -->\n<script>\n  // Save data\n  localStorage.setItem("theme", "dark");\n  // Read data\n  const theme = localStorage.getItem("theme");\n</script>\n\n<!-- Geolocation -->\n<script>\n  navigator.geolocation.getCurrentPosition((pos) => {\n    console.log(pos.coords.latitude, pos.coords.longitude);\n  });\n</script>', explanation: "HTML5 multimedia and browser APIs." }
      ],
      exercises: [
        { question: "Create a video player with custom controls using HTML5 video element.", solution: '<video id="player" width="640">\n  <source src="video.mp4" type="video/mp4">\n</video>\n<button onclick="document.getElementById(\'player\').play()">Play</button>\n<button onclick="document.getElementById(\'player\').pause()">Pause</button>', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "MDN HTML5 APIs", url: "https://developer.mozilla.org/en-US/docs/Web/API" },
        { title: "W3Schools HTML5", url: "https://www.w3schools.com/html/html5_intro.asp" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "html-24", title: "Building a Complete Website",
      content: "This capstone lesson brings together all HTML & CSS skills to build a complete, responsive, accessible website. You'll create a multi-page site with a navigation system, hero section, content sections, forms, media, and footer. Focus on semantic HTML, mobile-first responsive design, CSS custom properties for theming, and accessibility best practices.",
      codeExamples: [
        { language: "html", code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Portfolio</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <a href="#main" class="skip-link">Skip to content</a>\n  <header>\n    <nav aria-label="Main">\n      <a href="/" class="logo">Portfolio</a>\n      <ul>\n        <li><a href="#about">About</a></li>\n        <li><a href="#projects">Projects</a></li>\n        <li><a href="#contact">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n  <main id="main">\n    <section id="hero">\n      <h1>Hi, I\'m a Web Developer</h1>\n      <p>Building beautiful, accessible websites.</p>\n    </section>\n  </main>\n  <footer><p>&copy; 2025</p></footer>\n</body>\n</html>', explanation: "Complete website structure with semantic HTML and accessibility." }
      ],
      exercises: [
        { question: "Build a complete landing page with hero, features grid, testimonials, and contact form.", solution: "Combine all learned concepts: semantic HTML structure, Flexbox/Grid layout, responsive media queries, CSS variables for theming, transitions for interactivity, and ARIA for accessibility.", difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Frontend Mentor Challenges", url: "https://www.frontendmentor.io/" },
        { title: "freeCodeCamp Projects", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" }
      ],
      estimatedMinutes: 60
    },
  ],
};
