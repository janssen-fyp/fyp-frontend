export default function CongestionToggle({ enabled, onToggle }) {
  return (
    <div className="absolute top-6 right-6 bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3 border border-gray-200">
      {/* 图标（模拟上面三条小线的样式） */}
      <div className="flex flex-col gap-1">
        <span className="w-5 h-1 bg-gray-400 rounded"></span>
        <span className="w-5 h-1 bg-gray-400 rounded"></span>
        <span className="w-5 h-1 bg-gray-400 rounded"></span>
      </div>

      <span className="text-gray-700 font-medium text-sm">
        Show Congestion Overlay
      </span>

      {/* Toggle Switch */}
      <button
        onClick={onToggle}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
