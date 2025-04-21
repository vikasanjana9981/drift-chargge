import { useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa";

interface CopyToClipboardProps {
    text: any;
    className?: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, className }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <span
            onClick={handleCopy}
            className={className}
            aria-label="Copy to clipboard"
        >
            {copied ? <FaCheck className="text-green-500" /> : <FaRegCopy />}
        </span>
    );
};

export default CopyToClipboard;
