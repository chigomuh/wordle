const breakpoints = ["400px", "600px", "800px", "1000px", "1200px"];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp})`);

export { mq };
