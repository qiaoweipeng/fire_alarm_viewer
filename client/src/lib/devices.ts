/**
 * 火灾报警设备配置
 * 
 * 每个设备对象包含：
 * - id: 唯一标识符
 * - name: 设备名称（用于搜索和显示）
 * - x: 设备在图片中的 X 坐标（像素，从左到右）
 * - y: 设备在图片中的 Y 坐标（像素，从上到下）
 * - width: 高亮框的宽度（像素）
 * - height: 高亮框的高度（像素）
 * 
 * 坐标系统说明：
 * - 原点 (0, 0) 在图片的左上角
 * - X 轴向右递增，Y 轴向下递增
 * - 使用浏览器开发者工具的检查元素功能可以快速获取坐标
 * 
 * 如何添加新设备：
 * 1. 在下面的数组中添加新对象
 * 2. 填入 id（建议使用 device_序号 的格式）
 * 3. 填入 name（设备的中文名称）
 * 4. 使用浏览器开发者工具测量设备在图片中的位置，填入 x, y, width, height
 */

export interface Device {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const devices: Device[] = [
  // 用户添加的真实设备
  {
    id: "device_1779180495250",
    name: "送风机",
    x: 53,
    y: 96,
    width: 68,
    height: 59,
  },
  // 示例设备 - 请根据实际图片中的设备位置修改或添加
  {
    id: "device_1",
    name: "火灾报警主机",
    x: 50,
    y: 100,
    width: 150,
    height: 120,
  },
  {
    id: "device_2",
    name: "手动报警按钮",
    x: 300,
    y: 150,
    width: 80,
    height: 80,
  },
  {
    id: "device_3",
    name: "烟感探测器",
    x: 500,
    y: 120,
    width: 60,
    height: 60,
  },
  {
    id: "device_4",
    name: "温感探测器",
    x: 700,
    y: 180,
    width: 60,
    height: 60,
  },
  {
    id: "device_5",
    name: "声光警报器",
    x: 150,
    y: 350,
    width: 100,
    height: 100,
  },
];

/**
 * 根据名称搜索设备
 * @param query 搜索关键词
 * @returns 匹配的设备数组
 */
export function searchDevices(query: string): Device[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return devices.filter((device) =>
    device.name.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 根据 ID 获取设备
 * @param id 设备 ID
 * @returns 设备对象或 undefined
 */
export function getDeviceById(id: string): Device | undefined {
  return devices.find((device) => device.id === id);
}
