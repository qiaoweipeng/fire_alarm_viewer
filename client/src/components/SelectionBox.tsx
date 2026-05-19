import { SelectionBox as SelectionBoxType } from "@/hooks/useDeviceSelector";

interface SelectionBoxProps {
  box: SelectionBoxType;
}

/**
 * 框选可视化组件
 * 显示用户正在框选的区域
 */
export function SelectionBox({ box }: SelectionBoxProps) {
  if (!box.isSelecting || (box.width === 0 && box.height === 0)) {
    return null;
  }

  return (
    <div
      className="absolute border-2 border-dashed border-cyan-400 bg-cyan-100/10 pointer-events-none transition-all"
      style={{
        left: `${box.x}px`,
        top: `${box.y}px`,
        width: `${box.width}px`,
        height: `${box.height}px`,
      }}
    >
      {/* 四个角的标记 */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full" />

      {/* 尺寸显示 */}
      {box.width > 0 && box.height > 0 && (
        <div className="absolute -top-6 left-0 bg-cyan-400 text-gray-900 text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
          {Math.round(box.width)} × {Math.round(box.height)}
        </div>
      )}
    </div>
  );
}
