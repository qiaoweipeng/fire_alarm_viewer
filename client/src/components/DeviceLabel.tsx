import { Device } from "@/lib/devices";
import { cn } from "@/lib/utils";

interface DeviceLabelProps {
  device: Device;
  isVisible: boolean;
  isHighlighted: boolean;
  isSelected?: boolean; // 新增：是否被选中锁定
  onHover: (id: string | null) => void;
  onClick?: () => void;
}

/**
 * 设备标签组件
 * 显示设备的高亮框和名称标签
 */
export function DeviceLabel({
  device,
  isVisible,
  isHighlighted,
  isSelected = false, // 默认 false
  onHover,
  onClick
}: DeviceLabelProps) {

  // 1. 动态计算样式类逻辑
  // 判断是否应该显示标签：可见、高亮或选中时都显示
  const shouldShowLabel = isVisible || isHighlighted || isSelected;

  return (
    <div
      className="absolute pointer-events-auto cursor-pointer z-10"
      style={{
        left: `${device.x}px`,
        top: `${device.y}px`,
        width: `${device.width}px`,
        height: `${device.height}px`,
        // 选中时提高层级，确保呼吸框在最上层
        zIndex: isSelected ? 50 : isHighlighted ? 40 : 10
      }}
      onMouseEnter={() => onHover(device.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* 2. 高亮框 - 应用动态样式 */}
      <div
        className={cn(
          "absolute inset-0 border-2 rounded transition-all duration-200",
          isSelected
            ? "border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse"
            : isHighlighted
              ? "border-yellow-400 bg-yellow-100/20 shadow-lg shadow-yellow-400/50"
              : "border-transparent hover:border-blue-400 hover:bg-blue-100/10"
        )}
      />

      {/* 3. 名称标签 - 应用动态样式 */}
      {shouldShowLabel && (
        <div
          className={cn(
            "absolute left-0 top-full mt-1 px-2 py-1 rounded text-sm font-medium whitespace-nowrap transition-all duration-200 pointer-events-none shadow-lg",
            isSelected
              ? "bg-red-500 text-white animate-pulse"
              : isHighlighted
                ? "bg-yellow-400 text-gray-900"
                : "bg-blue-600 text-white"
          )}
        >
          {device.name}
          {/* 已移除红色小圆点指示器 */}
        </div>
      )}
    </div>
  );
}