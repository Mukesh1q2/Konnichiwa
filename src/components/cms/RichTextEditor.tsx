import { useState } from 'react';

export interface MediaFile {
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
    dimensions: { width: number; height: number };
    uploadedAt: Date;
}

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    showPreview?: boolean;
    onSave?: () => void;
    className?: string;
}

export function RichTextEditor({
    content,
    onChange,
    placeholder,
    showPreview,
    onSave,
    className = ''
}: RichTextEditorProps) {
    return (
        <div className={`flex flex-col h-full ${className}`}>
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex space-x-2">
                {/* Toolbar Placeholder */}
                <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
                <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
                <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
            </div>
            <textarea
                className="flex-1 p-4 resize-none outline-none font-mono text-sm"
                value={content}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
            {showPreview && (
                <div className="h-1/3 border-t border-gray-200 p-4 overflow-auto prose prose-sm max-w-none bg-gray-50">
                    <div className="text-xs text-gray-400 uppercase font-bold mb-2">Preview</div>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            )}
        </div>
    );
}
