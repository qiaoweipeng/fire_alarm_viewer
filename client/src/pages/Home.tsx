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
 * 
 * 功能：
 * 1. 显隐切换：通过按钮控制所有设备名称的显示/隐藏 （默认隐藏）
 * 2. 悬停高亮：在隐藏状态下，鼠标悬停在设备上会高亮显示该设备和名称
 * 3. 搜索定位：在搜索框输入完整设备名称，会高亮显示匹配的设备
 * 4. 编辑模式：直接在图片上框选设备，自动生成坐标数据
 * 5. 全屏模式：支持全屏显示
 * 6. 联动交互：左右两侧设备列表和图片联动交互
 */
export default function Home() {
  const [namesVisible, setNamesVisible] = useState(false); // 默认隐藏名称
  const [hoveredDeviceId, setHoveredDeviceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Device[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  // 处理任意交互时清空搜索
  const handleInteraction = () => {
    if (searchQuery) {
      handleClearSearch();
    }
  };

  // 当从图片中点击设备时，滚动左侧列表到该设备
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
    handleInteraction();
    setSelectedDeviceIdFromImage(deviceId);
    scrollToDevice(deviceId);
  };

  // 判断设备是否应该高亮
  const isDeviceHighlighted = (deviceId: string): boolean => {
    // 搜索结果只在搜索框有内容时高亮
    const isSearchHighlighted = !!searchQuery && searchResults.some((device) => device.id === deviceId);
    
    // 如果搜索结果多于1个，不进行联动高亮
    const shouldSearchHighlight = !!searchQuery && searchResults.length === 1 && isSearchHighlighted;
    
    return (
      hoveredDeviceId === deviceId ||
      selectedDeviceIdFromImage === deviceId ||
      !!shouldSearchHighlight
    );
  };

  // 判断左侧列表中的设备是否应该高亮
  const isDeviceHighlightedInList = (deviceId: string): boolean => {
    return (
      hoveredDeviceId === deviceId ||
      selectedDeviceIdFromImage === deviceId ||
      (!!searchQuery && searchResults.length === 1 && searchResults.some((d) => d.id === deviceId))
    );
  };

  // 全屏切换
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        // 忽略错误
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {
        // 忽略错误
      });
      setIsFullscreen(false);
    }
  };

  const mainContent = (
    <>
      {/* 顶部控制栏 */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700 shadow-lg">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* 标题 */}
            <div>
              <h1 className="text-2xl font-bold text-white">
                看板设备图（监控考区）
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                2026年05月19日-乔伟鹏
              </p>
            </div>

            {/* 控制按钮 */}
            <div className="flex gap-2">
              <Button
                onClick={toggleFullscreen}
                variant="outline"
                className="gap-2"
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
            <div className="mt-2 text-sm text-slate-300">
              {searchResults.length > 0 ? (
                <span>
                  找到 {searchResults.length} 个设备：
                  {searchResults.map((d) => d.name).join("、")}
                </span>
              ) : (
                <span className="text-slate-500">
                  未找到匹配的设备，请检查输入
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 主内容区域 - 使用 flex 布局 */}
      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        {/* 左侧设备列表面板 */}
        <div className="w-72 flex-shrink-0 flex flex-col">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-lg flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">
                设备列表 ({devices.length})
              </h3>
            </div>

            {/* 设备列表滚动区域 */}
            <div className="flex-1 overflow-y-auto space-y-2 min-h-0" ref={deviceListRef}>
              {devices.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-8">
                  暂无设备
                </p>
              ) : (
                devices.map((device) => (
                  <div
                    key={device.id}
                    data-device-id={device.id}
                    onMouseEnter={() => {
                      handleInteraction();
                      setHoveredDeviceId(device.id);
                    }}
                    onMouseLeave={() => setHoveredDeviceId(null)}
                    className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-all ${
                      isDeviceHighlightedInList(device.id)
                        ? "bg-yellow-500/30 text-yellow-100 border border-yellow-400"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    <div className="truncate font-medium">{device.name}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 右侧图片容器 */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {editMode && (
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>编辑模式已启用：</strong>在图片上拖动鼠标框选设备，松开后坐标数据会打印到控制台。按 F12 打开开发者工具查看详细信息。
              </p>
            </div>
          )}

          <div
            ref={containerRef}
            className={`relative flex-1 bg-slate-800 rounded-lg overflow-hidden shadow-2xl border flex items-center justify-center ${
              editMode ? "border-amber-500" : "border-slate-700"
            } ${editMode ? "cursor-crosshair" : "cursor-default"}`}
            onMouseDown={editMode ? handleMouseDown : undefined}
            onMouseMove={editMode ? handleMouseMove : undefined}
            onMouseUp={editMode ? handleMouseUp : undefined}
            onMouseLeave={editMode ? handleMouseUp : undefined}
          >
            {/* 背景图片 */}
            <img
              src="/images/ZhanBan.png"
              alt="火灾报警控制器展示板"
              className="max-w-full max-h-full object-contain pointer-events-none"
              draggable={false}
            />

            {/* 框选可视化 */}
            {editMode && <SelectionBox box={selectionBox} />}

            {/* 设备标签层 */}
            <div className={`absolute inset-0 ${editMode ? "pointer-events-none" : ""}`}>
              {!editMode &&
                devices.map((device) => (
                  <DeviceLabel
                    key={device.id}
                    device={device}
                    isVisible={namesVisible}
                    isHighlighted={isDeviceHighlighted(device.id)}
                    onHover={(id) => {
                      handleInteraction();
                      setHoveredDeviceId(id);
                    }}
                    onClick={() => handleDeviceClickFromImage(device.id)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
        {mainContent}
        <Button
          onClick={toggleFullscreen}
          className="fixed bottom-4 right-4 z-[10000]"
        >
          <Minimize2 className="w-4 h-4 mr-2" />
          退出全屏
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {mainContent}
    </div>
  );
}
