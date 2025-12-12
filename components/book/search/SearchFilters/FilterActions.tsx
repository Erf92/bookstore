"use client";

interface FilterActionsProps {
  onApply: () => void;
  onClear: () => void;
  disabled?: boolean;
  pendingText?: string;
}

export function FilterActions({
  onApply,
  onClear,
  disabled = false,
  pendingText = "در حال اعمال...",
}: FilterActionsProps) {
  return (
    <div className="flex flex-col justify-end space-y-2">
      <button
        onClick={onApply}
        disabled={disabled}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {disabled ? pendingText : "اعمال فیلترها"}
      </button>
      <button
        onClick={onClear}
        disabled={disabled}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        پاک کردن همه
      </button>
    </div>
  );
}
