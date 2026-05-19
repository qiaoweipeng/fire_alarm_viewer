import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeviceLabel } from "@/components/DeviceLabel";
import { SelectionBox } from "@/components/SelectionBox";
import { devices, searchDevices, Device } from "@/lib/devices";
import { useDeviceSelector } from "@/hooks/useDeviceSelector";
import { Eye, EyeOff, Search, X, Edit3, Check } from "lucide-react";

/**
 * 火灾报警设备交互查看器
 * 
 * 功能：
 * 1. 显隐切换：通过按钮控制所有设备名称的显示/隐藏
 * 2. 悬停高亮：在隐藏状态下，鼠标悬停在设备上会高亮显示该设备和名称
 * 3. 搜索定位：在搜索框输入完整设备名称，会高亮显示匹配的设备
 * 4. 编辑模式：直接在图片上框选设备，自动生成坐标数据
 */
export default function Home() {
  const [namesVisible, setNamesVisible] = useState(true);
  const [hoveredDeviceId, setHoveredDeviceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Device[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // 判断设备是否应该高亮
  const isDeviceHighlighted = (deviceId: string): boolean => {
    return (
      hoveredDeviceId === deviceId ||
      selectedDeviceId === deviceId ||
      searchResults.some((device) => device.id === deviceId)
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
                火灾报警设备查看器
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                交互式设备识别和定位系统
              </p>
            </div>

            {/* 控制按钮 */}
            <div className="flex gap-2">
              <Button
                onClick={() => setNamesVisible(!namesVisible)}
                variant={namesVisible ? "default" : "outline"}
                className="gap-2"
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
                placeholder="输入设备名称搜索（如：火灾报警主机）"
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
            <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
              {devices.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-8">
                  暂无设备
                </p>
              ) : (
                devices.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => setSelectedDeviceId(device.id)}
                    onMouseEnter={() => setHoveredDeviceId(device.id)}
                    onMouseLeave={() => setHoveredDeviceId(null)}
                    className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-all ${
                      selectedDeviceId === device.id
                        ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400"
                        : isDeviceHighlighted(device.id)
                        ? "bg-yellow-500/30 text-yellow-100 border border-yellow-400"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    <div className="truncate font-medium">{device.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 truncate">
                      {device.id}
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* 清除选择按钮 */}
            {selectedDeviceId && (
              <button
                onClick={() => setSelectedDeviceId(null)}
                className="mt-3 w-full px-3 py-2 text-sm text-slate-300 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
              >
                清除选择
              </button>
            )}
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
              src="/manus-storage/fire_alarm_board_154513f2.png"
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
                    onHover={setHoveredDeviceId}
                  />
                ))}
            </div>
          </div>

          {/* 说明文本 */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="bg-slate-800 border border-slate-700 rounded p-3">
              <h3 className="text-white font-semibold mb-1 flex items-center gap-2 text-xs">
                <Eye className="w-3 h-3 text-blue-400" />
                显隐切换
              </h3>
              <p className="text-xs text-slate-400">
                点击按钮切换名称显示
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded p-3">
              <h3 className="text-white font-semibold mb-1 flex items-center gap-2 text-xs">
                <Search className="w-3 h-3 text-yellow-400" />
                悬停高亮
              </h3>
              <p className="text-xs text-slate-400">
                鼠标放在设备上高亮
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded p-3">
              <h3 className="text-white font-semibold mb-1 flex items-center gap-2 text-xs">
                <Search className="w-3 h-3 text-green-400" />
                搜索定位
              </h3>
              <p className="text-xs text-slate-400">
                搜索框快速查找设备
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
