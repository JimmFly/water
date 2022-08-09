// Import React dependencies.
import React, { useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];
// Define a React component renderer for our code blocks.
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const TrySlate = () => {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <div className="trySlate">
      <Slate editor={editor} value={initialValue}>
        <Editable
          onKeyDown={(e) => {
            if (e.key === "&") {
              e.preventDefault();
              editor.insertText("and");
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default TrySlate;
