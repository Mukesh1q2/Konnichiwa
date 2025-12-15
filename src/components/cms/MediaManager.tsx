import { X, Upload } from 'lucide-react';
import { MediaFile } from './RichTextEditor';

interface MediaManagerProps {
    onSelect: (file: MediaFile) => void;
    onClose: () => void;
}

export function MediaManager({ onSelect, onClose }: MediaManagerProps) {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">Media Manager</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-gray-400">
                    <Upload className="w-16 h-16 mb-4" />
                    <p>Media Library Placeholder</p>
                    <button
                        onClick={() => onSelect({
                            id: 'placeholder-1',
                            name: 'placeholder.jpg',
                            type: 'image/jpeg',
                            url: 'https://via.placeholder.com/800x600',
                            size: 1024,
                            dimensions: { width: 800, height: 600 },
                            uploadedAt: new Date()
                        })}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Select Placeholder Image
                    </button>
                </div>
            </div>
        </div>
    );
}
