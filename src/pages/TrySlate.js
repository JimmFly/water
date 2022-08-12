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
  isH1Active(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "heading-one",
    });
    return !!match;
  },
  isH2Active(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "heading-two",
    });
    return !!match;
  },
  isListItemActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "list-item",
    });
    return !!match;
  },
  isNumberedListActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "numbered-list",
    });
    return !!match;
  },
  isBlockquoteActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "block-quote",
    });
    return !!match;
  },
  isBulletedListActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "bulleted-list",
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
  toggleH1Block(editor) {
    const isActive = CustomEditor.isH1Active(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "heading-one" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleH2Block(editor) {
    const isActive = CustomEditor.isH2Active(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "heading-two" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleListItemBlock(editor) {
    const isActive = CustomEditor.isListItemActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "list-item" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleNumberedListBlock(editor) {
    const isActive = CustomEditor.isNumberedListActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "numbered-list" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleBlockquoteBlock(editor) {
    const isActive = CustomEditor.isBlockquoteActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "block-quote" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleBulletedListBlock(editor) {
    const isActive = CustomEditor.isBulletedListActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "bulleted-list" },
      { match: (n) => Editor.isBlock(editor, n) }
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
const H1Element = (props) => {
  return <h1 {...props.attributes}>{props.children}</h1>;
};
const H2Element = (props) => {
  return <h2 {...props.attributes}>{props.children}</h2>;
};
const ListItemElement = (props) => {
  return <li {...props.attributes}>{props.children}</li>;
};
const NumberedListElement = (props) => {
  return <ol {...props.attributes}>{props.children}</ol>;
};
const BlockElement = (props) => {
  return <blockquote {...props.attributes}>{props.children}</blockquote>;
};
const BulletedListElement = (props) => {
  return <ul {...props.attributes}>{props.children}</ul>;
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        backgroundColor:
          props.children.props.parent.type === "code" ? "#eee" : "white",
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
      case "heading-one":
        return <H1Element {...props} />;
      case "heading-two":
        return <H2Element {...props} />;
      case "list-item":
        return <ListItemElement {...props} />;
      case "numbered-list":
        return <NumberedListElement {...props} />;
      case "block-quote":
        return <BlockElement {...props} />;
      case "bulleted-list":
        return <BulletedListElement {...props} />;
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

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleH1Block(editor);
              }}
            >
              H1
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleH2Block(editor);
              }}
            >
              H2
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleListItemBlock(editor);
              }}
            >
              ListItem
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleNumberedListBlock(editor);
              }}
            >
              NumberedList
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleBlockquoteBlock(editor);
              }}
            >
              Blockquote
            </button>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                CustomEditor.toggleBulletedListBlock(editor);
              }}
            >
              BulletedList
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
