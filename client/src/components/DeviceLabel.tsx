import { Device } from "@/lib/devices";
import { cn } from "@/lib/utils";

interface DeviceLabelProps {
  device: Device;
  isVisible: boolean;
  isHighlighted: boolean;
  onHover: (id: string | null) => void;
}

/**
 * 设备标签组件
 * 显示设备的高亮框和名称标签
 */
export function DeviceLabel({
  device,
  isVisible,
  isHighlighted,
  onHover,
}: DeviceLabelProps) {
  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: `${device.x}px`,
        top: `${device.y}px`,
        width: `${device.width}px`,
        height: `${device.height}px`,
      }}
      onMouseEnter={() => onHover(device.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* 高亮框 */}
      <div
        className={cn(
          "absolute inset-0 border-2 rounded transition-all duration-200",
          isHighlighted
            ? "border-yellow-400 bg-yellow-100/20 shadow-lg shadow-yellow-400/50"
            : "border-transparent hover:border-blue-400 hover:bg-blue-100/10"
        )}
      />

      {/* 名称标签 */}
      {(isVisible || isHighlighted) && (
        <div
          className={cn(
            "absolute left-0 top-full mt-1 px-2 py-1 rounded text-sm font-medium whitespace-nowrap transition-all duration-200 pointer-events-none",
            isHighlighted
              ? "bg-yellow-400 text-gray-900 shadow-lg"
              : "bg-blue-600 text-white shadow-md"
          )}
        >
          {device.name}
        </div>
      )}
    </div>
  );
}
