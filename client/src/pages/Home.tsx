import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeviceLabel } from "@/components/DeviceLabel";
import { SelectionBox } from "@/components/SelectionBox";
import { devices, searchDevices, Device } from "@/lib/devices";
import { useDeviceSelector } from "@/hooks/useDeviceSelector";
import { Eye, EyeOff, Search, X, Edit3, Check, Maximize2, Minimize2 } from "lucide-react";

/**
 * 火灾报警设备交互查看器
 */
export default function Home() {
  const [namesVisible, setNamesVisible] = useState(false); // 默认隐藏名称
  const [hoveredDeviceId, setHoveredDeviceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Device[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 选中状态：点击右侧设备后锁定，直到点击叉号清除
  const [selectedDeviceIdFromImage, setSelectedDeviceIdFromImage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const deviceListRef = useRef<HTMLDivElement>(null);

  const {
    selectionBox,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    clearSelection,
  } = useDeviceSelector(containerRef);

  // 处理搜索
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchDevices(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // 清除搜索
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  // 清除选中状态（点击叉号时调用）
  const handleClearSelection = () => {
    setSelectedDeviceIdFromImage(null);
  };

  // 全屏切换
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        setIsFullscreen(true);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {
        setIsFullscreen(false);
      });
      setIsFullscreen(false);
    }
  };

  // 当从图片中点击设备时，滚动左侧列表到该设备并锁定选中
  const scrollToDevice = (deviceId: string) => {
    if (!deviceListRef.current) return;

    const deviceElement = deviceListRef.current.querySelector(
      `[data-device-id="${deviceId}"]`
    ) as HTMLElement;

    if (deviceElement) {
      deviceElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  // 处理图片中的设备点击
  const handleDeviceClickFromImage = (deviceId: string) => {
    setSelectedDeviceIdFromImage(deviceId);
    scrollToDevice(deviceId);
  };

  // 判断设备是否应该高亮 (右侧图片用)
  const isDeviceHighlighted = (deviceId: string): boolean => {
    const isSearchHighlighted = !!searchQuery && searchResults.some((device) => device.id === deviceId);
    return (
      hoveredDeviceId === deviceId ||
      selectedDeviceIdFromImage === deviceId ||
      isSearchHighlighted
    );
  };

  // 判断左侧列表中的设备是否应该高亮
  const isDeviceHighlightedInList = (deviceId: string): boolean => {
    // 左侧高亮逻辑：悬停 OR 选中 OR 搜索结果
    return (
      hoveredDeviceId === deviceId ||
      selectedDeviceIdFromImage === deviceId ||
      (!!searchQuery && searchResults.some((d) => d.id === deviceId))
    );
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* 顶部控制栏 */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700 shadow-lg">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* 标题 */}
            <div>
              <h1 className="text-2xl font-bold text-white">
                看板设备图（东莞监控考区）
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                design | code by 乔伟鹏 (6/19 2026)
              </p>
            </div>

            {/* 控制按钮 */}
            <div className="flex gap-2">
              <Button
                onClick={toggleFullscreen}
                variant="outline"
                className="gap-2 bg-sky-600 hover:bg-sky-700 border-sky-600"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-4 h-4" />
                    退出全屏
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4" />
                    全屏
                  </>
                )}
              </Button>

              <Button
                onClick={() => setNamesVisible(!namesVisible)}
                variant={namesVisible ? "default" : "outline"}
                className="gap-2 bg-sky-600 hover:bg-sky-700 border-sky-600"
              >
                {namesVisible ? (
                  <>
                    <Eye className="w-4 h-4" />
                    隐藏名称
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" />
                    显示名称
                  </>
                )}
              </Button>

              <Button
                onClick={() => {
                  setEditMode(!editMode);
                  if (!editMode) {
                    clearSelection();
                  }
                }}
                variant={editMode ? "default" : "outline"}
                className="gap-2 bg-amber-600 hover:bg-amber-700 border-amber-600"
              >
                {editMode ? (
                  <>
                    <Check className="w-4 h-4" />
                    退出编辑
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    编辑模式
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="mt-4 flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                placeholder="输入设备名称搜索（如：火灾显示盘）"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 搜索结果提示 */}
          {searchQuery && (
            <div className="mt-2 text-sm text-slate-300 min-h-[20px]">
              {searchResults.length > 0 ? (
                <span className="text-green-400">
                  找到 {searchResults.length} 个设备
                </span>
              ) : (
                <span className="text-red-400">
                  未找到匹配的设备
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 主内容区域 - 使用 flex 布局 */}
      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        {/* 左侧设备列表面板 */}
        <div className="w-72 flex-shrink-0 flex flex-col h-180">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-lg flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">
                设备列表 ({searchQuery ? searchResults.length : devices.length})
              </h3>
            </div>

            {/* 设备列表滚动区域 */}
            <div className="flex-1 overflow-y-auto space-y-2 min-h-0" ref={deviceListRef}>
              {(() => {
                const displayDevices = searchQuery ? searchResults : devices;

                if (displayDevices.length === 0) {
                  return (
                    <p className="text-slate-400 text-sm text-center py-8">
                      {searchQuery ? "无匹配设备" : "暂无设备"}
                    </p>
                  );
                }

                return displayDevices.map((device) => {
                  const isHighlighted = isDeviceHighlightedInList(device.id);
                  const isSelected = selectedDeviceIdFromImage === device.id;
                  const isHovered = hoveredDeviceId === device.id;

                  // 动态样式类
                  let itemClass = "w-full text-left px-3 py-2 rounded text-sm font-medium transition-all cursor-default select-none flex items-center justify-between ";

                  if (isSelected) {
                    // 选中状态：深橙色背景，红色边框，呼吸动画
                    itemClass += "bg-orange-600/40 text-orange-100 border-2 border-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]";
                  } else if (isHighlighted) {
                    // 悬停或搜索高亮：浅黄色背景
                    itemClass += "bg-yellow-500/30 text-yellow-100 border border-yellow-400";
                  } else {
                    // 默认状态
                    itemClass += "bg-slate-700 text-slate-300 hover:bg-slate-600";
                  }

                  return (
                    <div
                      key={device.id}
                      data-device-id={device.id}
                      onMouseEnter={() => setHoveredDeviceId(device.id)}
                      onMouseLeave={() => setHoveredDeviceId(null)}
                      className={itemClass}
                    >
                      <div className="truncate font-medium">{device.name}</div>

                      {/* 只有当该项被选中（来自右侧点击）时，才显示叉号 */}
                      {isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClearSelection();
                          }}
                          className="ml-2 p-0.5 hover:bg-red-500/50 rounded text-red-200 hover:text-white transition-colors"
                          title="取消选中"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>

        {/* 右侧图片容器 */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
          {editMode && (
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>编辑模式已启用：</strong>在图片上拖动鼠标框选设备，松开后坐标数据会打印到控制台。按 F12 打开开发者工具查看详细信息。
              </p>
            </div>
          )}

          <div
            ref={containerRef}
            // 关键修改：设置固定尺寸，防止缩放
            // 注意：这里的 w-[1200px] h-[800px] 是示例，请根据你图片的实际最佳显示尺寸调整
            // 如果希望完全保持图片原始比例且不缩放，可以使用图片原始像素尺寸
            className={`relative bg-slate-800 rounded-lg overflow-hidden shadow-2xl border flex items-center justify-center shrink-0 ${editMode ? "border-amber-500 cursor-crosshair" : "border-slate-700 cursor-default"
              }`}
            style={{
              width: '1135px', // 【重要】设置为固定宽度，例如图片原始宽度或你期望的最小宽度
              height: '713px', // 【重要】设置为固定高度
            }}
            onMouseDown={editMode ? handleMouseDown : undefined}
            onMouseMove={editMode ? handleMouseMove : undefined}
            onMouseUp={editMode ? handleMouseUp : undefined}
            onMouseLeave={(e) => {
              if (!editMode) {
                setHoveredDeviceId(null);
              } else {
                handleMouseUp();
              }
            }}
          >
            {/* 背景图片 */}
            <img
              src="/images/zhanban2940*1846.jpg"
              alt="火灾报警控制器展示板"
              className="w-full h-full object-contain pointer-events-none select-none"
              draggable={false}
            />

            {/* 框选可视化 */}
            {editMode && <SelectionBox box={selectionBox} />}

            {/* 设备标签层 */}
            <div className={`absolute inset-0 ${editMode ? "pointer-events-none" : ""}`}>
              {!editMode &&
                devices.map((device) => {
                  const isSelected = selectedDeviceIdFromImage === device.id;
                  return (
                    <DeviceLabel
                      key={device.id}
                      device={device}
                      isVisible={namesVisible}
                      isHighlighted={isDeviceHighlighted(device.id)}
                      isSelected={isSelected} // 传递选中状态
                      onHover={(id) => {
                        // 如果处于选中状态，悬停不改变选中态，但依然可以触发左侧列表的悬停联动
                        setHoveredDeviceId(id);
                      }}
                      onClick={() => {
                        handleDeviceClickFromImage(device.id);
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}