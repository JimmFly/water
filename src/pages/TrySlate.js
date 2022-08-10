// Import React dependencies.
import React, { useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor, Editor, Transforms, Text } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });
    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });
    return !!match;
  },
  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic === true,
      universal: true,
    });
    return !!match;
  },
  isUnderlineMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.underline === true,
      universal: true,
    });
    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },
  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    Transforms.setNodes(
      editor,
      { underline: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },
};

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
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.underline ? "underline" : "normal",
      }}
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
      <div className="slateEditor">
        <Slate editor={editor} value={initialValue}>
          <div className="slateButton">
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleBoldMark(editor);
              }}
            >
              Bold
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
              }}
            >
              Code Block
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleItalicMark(editor);
              }}
            >
              Italic
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleUnderlineMark(editor);
              }}
            >
              underline
            </button>
          </div>
          <div className="textArea">
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
                    CustomEditor.toggleCodeBlock(editor);
                    break;
                  // When "B" is pressed, bold the text in the selection.
                  case "B":
                  case "b":
                    e.preventDefault();
                    CustomEditor.toggleBoldMark(editor);
                    break;

                  default:
                    break;
                }
              }}
            />
          </div>
        </Slate>
      </div>
    </div>
  );
};

export default TrySlate;
