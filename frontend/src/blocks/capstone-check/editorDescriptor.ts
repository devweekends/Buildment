import type { JsxComponentDescriptor } from "@mdxeditor/editor";
import { GenericJsxEditor } from "@mdxeditor/editor";

// A capstone check is authored with the ```capstone fence on import. In the rich editor
// it stays a reference to its stored block (the id only): the rubric pack lives on the
// server and is never loaded into the browser.
export const capstoneCheckEditorDescriptor: JsxComponentDescriptor = {
  name: "CapstoneCheck",
  kind: "flow",
  props: [{ name: "id", type: "string" }],
  hasChildren: false,
  Editor: GenericJsxEditor,
};
