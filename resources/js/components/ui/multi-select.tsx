import { useState } from 'react';

interface MultiSelectProps {
    options: { label: string; value: string }[];
    selected: string[];
    onChange: (selected: string[]) => void;
}

export function MultiSelect({ options, selected, onChange }: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (value: string) => {
        const updatedSelection = selected.includes(value)
            ? selected.filter((item) => item !== value)
            : [...selected, value];
        onChange(updatedSelection);
    };

    const selectAll = () => {
        onChange(options.map((option) => option.value));
    };

    const deselectAll = () => {
        onChange([]);
    };

    return (
        <div className="relative inline-block w-64">
            <button
                className="w-full border px-4 py-2 bg-white hover:bg-gray-100 rounded-md flex justify-between items-center shadow-sm"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="text-gray-700 font-medium">
                    {selected.length > 0 ? `${selected.length} selected` : 'Select Columns'}
                </span>
                <span className="ml-2 text-gray-500">▼</span>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 shadow-lg rounded-md">
                    <div className="flex justify-between px-4 py-2 border-b bg-gray-50">
                        <button onClick={selectAll} className="text-blue-500 hover:underline text-sm">Select All</button>
                        <button onClick={deselectAll} className="text-red-500 hover:underline text-sm">Deselect All</button>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOption(option.value);
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(option.value)}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        toggleOption(option.value);
                                    }}
                                    className="mr-2 accent-blue-500"
                                />
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

interface DropdownRadioSelectProps {
    options: { label: string; value: string }[];
    selected: string;
    onChange: (selected: string) => void;
}

export function DropdownRadioSelect({ options, selected, onChange }: DropdownRadioSelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                className="border px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {options.find((option) => option.value === selected)?.label || 'Select Option'}
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-56 bg-white border shadow-md rounded-md">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            <input
                                type="radio"
                                checked={selected === option.value}
                                readOnly
                                className="mr-2"
                            />
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

interface ColumnRadioSelectProps {
    options: { label: string; value: string }[];
    selected: string;
    onChange: (selected: string) => void;
}

export function ColumnRadioSelect({ options, selected, onChange }: ColumnRadioSelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                className="border px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {options.find((option) => option.value === selected)?.label || 'Select Columns'}
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-56 bg-white border shadow-md rounded-md">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            <input
                                type="radio"
                                checked={selected === option.value}
                                readOnly
                                className="mr-2"
                            />
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}