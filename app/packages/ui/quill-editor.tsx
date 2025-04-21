import { useEffect, useState, forwardRef } from "react";
import { ClientOnly } from "remix-utils/client-only";
import { FieldError } from "rizzui";
import "react-quill-new/dist/quill.snow.css";
import cn from "../utils/class-names";

// Fallback UI while QuillEditor is loading
function QuillEditorFallback() {
  return <div className="h-[143px] bg-gray-200 animate-pulse rounded-md" />;
}

// QuillEditor client component with dynamic import
const QuillEditorClient = forwardRef(({ value, onChange, className, toolbarPosition }: any, ref) => {
  const [ReactQuill, setReactQuill] = useState<any>(null);

  useEffect(() => {
    import("react-quill-new").then((mod) => {
      setReactQuill(() => mod.default);
    });
  }, []);

  if (!ReactQuill) return <QuillEditorFallback />; // Show loader until Quill is loaded

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      ref={ref}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={quillModules}
      className={cn(
        "react-quill",
        toolbarPosition === "bottom" && "react-quill-toolbar-bottom relative",
        className
      )}

      
    />
  );
});

QuillEditorClient.displayName = "QuillEditorClient";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  toolbarPosition?: "top" | "bottom";
}

export default function QuillEditor({
  value,
  onChange,
  label,
  error,
  className,
  labelClassName,
  errorClassName,
  toolbarPosition = "top",
}: QuillEditorProps) {
  return (
    <div className={cn(className)}>
      {label && (
        <label className={cn("mb-1.5 block", labelClassName)}>{label}</label>
      )}
      {/* Load Quill Editor Only on Client */}
      <ClientOnly fallback={<QuillEditorFallback />}>
        {() => <QuillEditorClient value={value} onChange={onChange} className={className} toolbarPosition={toolbarPosition} />}
      </ClientOnly>
      {error && <FieldError size="md" error={error} className={errorClassName} />}
    </div>
  );
}
