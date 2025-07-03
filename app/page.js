// app/page.js
import { promises as fs } from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Basic CSS styles for markdown rendering
const styles = `
  .markdown-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }
  .markdown-container h1 {
    font-size: 2.5rem;
    border-bottom: 2px solid #333;
    padding-bottom: 0.5rem;
  }
  .markdown-container h2 {
    font-size: 1.8rem;
    margin-top: 2rem;
  }
  .markdown-container pre {
    background: #f4f4f4;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
  }
  .markdown-container code {
    font-family: monospace;
  }
  .markdown-container ul {
    list-style-type: disc;
    padding-left: 2rem;
  }
`;

// Server-side function to read README.md
async function getReadmeContent() {
  try {
    const readmePath = path.join(process.cwd(), 'README.md');
    const content = await fs.readFile(readmePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error reading README.md:', error);
    return '# Error\n\nCould not load README.md content. Please ensure the file exists in the project root.';
  }
}

// Server component to render the README
export default async function Home() {
  const readmeContent = await getReadmeContent();

  return (
    <>
      <style>{styles}</style>
      <div className="markdown-container">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{readmeContent}</ReactMarkdown>
      </div>
    </>
  );
}
