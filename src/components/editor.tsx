"use client";

import { forwardRef } from "react";
import { useTheme } from "next-themes";
import { type editor } from "monaco-editor";
import MonacoEditor, { type Monaco } from "@monaco-editor/react";

import { DEFAULT_LANGUAGE } from "@/lib/consts";

const DARK_THEME_NAME = "dark";
const DARK_THEME: editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#00000000",
    "editorOverviewRuler.bracketMatchForeground": "#00000000",
    "editorOverviewRuler.border": "#00000000",
    "editorOverviewRuler.findMatchForeground": "#00000000",
    "editorOverviewRuler.rangeHighlightForeground": "#00000000",
    "editorOverviewRuler.selectionHighlightForeground": "#00000000",
    "editorOverviewRuler.wordHighlightForeground": "#00000000",
    "editorOverviewRuler.wordHighlightStrongForeground": "#00000000",
    "editorOverviewRuler.modifiedForeground": "#00000000",
    "editorOverviewRuler.addedForeground": "#00000000",
    "editorOverviewRuler.deletedForeground": "#00000000",
    "editorOverviewRuler.errorForeground": "#00000000",
    "editorOverviewRuler.warningForeground": "#00000000",
    "editorOverviewRuler.infoForeground": "#00000000",
  },
};

const LIGHT_THEME_NAME = "light";
const LIGHT_THEME: editor.IStandaloneThemeData = {
  base: "vs",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#00000000",
    "editorOverviewRuler.bracketMatchForeground": "#00000000",
    "editorOverviewRuler.border": "#00000000",
    "editorOverviewRuler.findMatchForeground": "#00000000",
    "editorOverviewRuler.rangeHighlightForeground": "#00000000",
    "editorOverviewRuler.selectionHighlightForeground": "#00000000",
    "editorOverviewRuler.wordHighlightForeground": "#00000000",
    "editorOverviewRuler.wordHighlightStrongForeground": "#00000000",
    "editorOverviewRuler.modifiedForeground": "#00000000",
    "editorOverviewRuler.addedForeground": "#00000000",
    "editorOverviewRuler.deletedForeground": "#00000000",
    "editorOverviewRuler.errorForeground": "#00000000",
    "editorOverviewRuler.warningForeground": "#00000000",
    "editorOverviewRuler.infoForeground": "#00000000",
  },
};

const DEFAULT_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  tabSize: 2,
  quickSuggestions: false,
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: "on",
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  bracketPairColorization: { enabled: true },
  automaticLayout: true,
  hideCursorInOverviewRuler: true,
  padding: { top: 24, bottom: 24 },
  lineDecorationsWidth: 24,
  glyphMargin: false,
  guides: {
    indentation: false,
  },
  folding: false,
  renderLineHighlight: "none",
};

interface Props {
  width?: string;
  height?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  language?: "typescript" | "javascript" | "python";
  options?: editor.IStandaloneEditorConstructionOptions;
}

const Editor = forwardRef<editor.IStandaloneCodeEditor, Props>(
  ({ value, language, options = {}, onValueChange, width, height }, ref) => {
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === "dark" ? DARK_THEME_NAME : LIGHT_THEME_NAME;

    const onChange = (value?: string) => {
      if (!onValueChange || !value) return;
      onValueChange(value);
    };

    const beforeMount = (monaco: Monaco) => {
      monaco.editor.defineTheme(DARK_THEME_NAME, DARK_THEME);
      monaco.editor.defineTheme(LIGHT_THEME_NAME, LIGHT_THEME);
    };

    const onMount = (editor: editor.IStandaloneCodeEditor) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(editor);
        return;
      }

      ref.current = editor;
    };

    return (
      <MonacoEditor
        width={width}
        height={height}
        loading={null}
        value={value}
        theme={theme}
        language={language ?? DEFAULT_LANGUAGE}
        onMount={onMount}
        onChange={onChange}
        beforeMount={beforeMount}
        options={{
          ...DEFAULT_OPTIONS,
          ...options,
        }}
      />
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
