// Import React dependencies.
import React, { useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor, Editor, Transforms, Text } from "slate";

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

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

const TrySlate = () => {
  const [editor] = useState(() => withReact(createEditor()));

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div className="trySlate">
      <Slate editor={editor} value={initialValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(e) => {
            if (e.key === "&") {
              e.preventDefault();
              editor.insertText("and");
            }
            if (!e.ctrlKey) {
              return;
            }

            switch (e.key) {
              // When "`" is pressed, keep our existing code block logic.
              case "`":
                e.preventDefault();
                const [match] = Editor.nodes(editor, {
                  match: (n) => n.type === "code",
                });
                Transforms.setNodes(
                  editor,
                  { type: match ? null : "code" },
                  { match: (n) => Editor.isBlock(editor, n) }
                );
                break;
              // When "B" is pressed, bold the text in the selection.
              case "b": {
                e.preventDefault();
                const [match] = Editor.nodes(editor, {
                  match: (n) => n.bold === "bold",
                });
                Transforms.setNodes(
                  editor,
                  { bold: match ? null : "bold" },
                  // Apply it to text nodes, and split the text node up if the
                  // selection is overlapping only part of it.
                  { match: (n) => Text.isText(n), split: true }
                );
                break;
              }
              default:
                break;
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default TrySlate;
