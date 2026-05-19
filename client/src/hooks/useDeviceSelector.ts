import { useState, useRef, useCallback } from "react";

export interface SelectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelecting: boolean;
}

interface MousePosition {
  x: number;
  y: number;
}

/**
 * 用于处理设备框选的 Hook
 * 支持在图片上拖动鼠标框选设备，并生成坐标数据
 */
export function useDeviceSelector(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [selectionBox, setSelectionBox] = useState<SelectionBox>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isSelecting: false,
  });

  const startPos = useRef<MousePosition>({ x: 0, y: 0 });
  const containerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  /**
   * 处理鼠标按下事件
   */
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // 只在左键点击时触发
    if (e.button !== 0) return;

    const container = containerRef.current;
    if (!container) return;

    // 获取容器相对于视口的位置
    const rect = container.getBoundingClientRect();
    containerPos.current = { x: rect.left, y: rect.top };

    // 获取鼠标相对于容器的位置
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    startPos.current = { x, y };
    setSelectionBox({
      x,
      y,
      width: 0,
      height: 0,
      isSelecting: true,
    });
  }, [containerRef]);

  /**
   * 处理鼠标移动事件
   */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectionBox.isSelecting) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // 计算框选框的坐标和大小
    const x = Math.min(startPos.current.x, currentX);
    const y = Math.min(startPos.current.y, currentY);
    const width = Math.abs(currentX - startPos.current.x);
    const height = Math.abs(currentY - startPos.current.y);

    setSelectionBox({
      x,
      y,
      width,
      height,
      isSelecting: true,
    });
  }, [selectionBox.isSelecting, containerRef]);

  /**
   * 处理鼠标释放事件
   */
  const handleMouseUp = useCallback(() => {
    if (!selectionBox.isSelecting) return;

    // 生成设备配置代码
    const deviceConfig = {
      id: `device_${Date.now()}`,
      name: "新设备", // 用户需要手动修改
      x: Math.round(selectionBox.x),
      y: Math.round(selectionBox.y),
      width: Math.round(selectionBox.width),
      height: Math.round(selectionBox.height),
    };

    // 打印到控制台
    console.log("=== 新设备配置 ===");
    console.log("复制以下代码到 devices.ts 的 devices 数组中：");
    console.log("");
    console.log(JSON.stringify(deviceConfig, null, 2));
    console.log("");
    console.log("TypeScript 格式：");
    console.log(`{
  id: "${deviceConfig.id}",
  name: "设备名称", // 请修改为实际的设备名称
  x: ${deviceConfig.x},
  y: ${deviceConfig.y},
  width: ${deviceConfig.width},
  height: ${deviceConfig.height},
},`);
    console.log("==================");

    // 也显示在页面上
    alert(
      `设备坐标已生成！\n\n` +
        `X: ${deviceConfig.x}\n` +
        `Y: ${deviceConfig.y}\n` +
        `Width: ${deviceConfig.width}\n` +
        `Height: ${deviceConfig.height}\n\n` +
        `详细信息已打印到浏览器控制台（按 F12 查看）`
    );

    // 重置框选状态
    setSelectionBox({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      isSelecting: false,
    });
  }, [selectionBox]);

  /**
   * 清除框选
   */
  const clearSelection = useCallback(() => {
    setSelectionBox({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      isSelecting: false,
    });
  }, []);

  return {
    selectionBox,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    clearSelection,
  };
}
