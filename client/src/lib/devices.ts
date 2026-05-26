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
  // 设备层
  // {
  //   id: "device_1779198421284",
  //   name: "设备层", // 请修改为实际的设备名称
  //   x: 22,
  //   y: 71,
  //   width: 1095,
  //   height: 148,
  // },
  {
    id: "device_1779184740240",
    name: "送风机",
    x: 81,
    y: 121,
    width: 89,
    height: 88,
  }, {
    id: "device_1779184873755",
    name: "防火阀(70°)",
    x: 213,
    y: 123,
    width: 95,
    height: 88,
  }, {
    id: "device_1779184954088",
    name: "送风口",
    x: 347,
    y: 123,
    width: 177,
    height: 91,
  }, {
    id: "device_1779185012865",
    name: "排烟口",
    x: 695,
    y: 134,
    width: 163,
    height: 88,
  }, {
    id: "device_1779185074855",
    name: "排烟防火阀(280°)",
    x: 899,
    y: 137,
    width: 72,
    height: 84,
  }, {
    id: "device_1779185125320",
    name: "排烟风机",
    x: 1028,
    y: 141,
    width: 75,
    height: 81,
  }, {
    id: "device_1779192166021",
    name: "xxx",
    x: 128,
    y: 95,
    width: 30,
    height: 24,
  }, {
    id: "device_1779188468856",
    name: "送风机模块",
    x: 188,
    y: 95,
    width: 29,
    height: 27,
  }, {
    id: "device_1779188954214",
    name: "防火阀模块",
    x: 248,
    y: 98,
    width: 27,
    height: 22,
  }, {
    id: "device_1779188980197",
    name: "送风口模块",
    x: 305,
    y: 97,
    width: 28,
    height: 25,
  }, {
    id: "device_1779188995914",
    name: "排烟口模块",
    x: 840,
    y: 108,
    width: 25,
    height: 24,
  }, {
    id: "device_1779189007313",
    name: "排烟防火阀模块",
    x: 894,
    y: 110,
    width: 24,
    height: 23,
  }, {
    id: "device_1779189017329",
    name: "排烟风机模块",
    x: 948,
    y: 112,
    width: 26,
    height: 23,
  }, {
    id: "device_1779189027229",
    name: "xxx",
    x: 1001,
    y: 114,
    width: 25,
    height: 22,
  },
  // 仿真展板2层
  // {
  //   id: "device_1779198479735",
  //   name: "仿真展板2层", // 请修改为实际的设备名称
  //   x: 37,
  //   y: 228,
  //   width: 1080,
  //   height: 196,
  // },
  {
    id: "device_1779185378168",
    name: "2F-楼梯间-光电感烟探测器",
    x: 70,
    y: 228,
    width: 50,
    height: 18,
  }, {
    id: "device_1779185833534",
    name: "2F-楼梯间-送风口",
    x: 43,
    y: 256,
    width: 63,
    height: 52,
  }, {
    id: "device_1779185410918",
    name: "2F-前室-光电感烟探测器",
    x: 237,
    y: 231,
    width: 38,
    height: 18,
  },
  {
    id: "device_1779185956561",
    name: "2F-前室-送风口",
    x: 258,
    y: 329,
    width: 44,
    height: 40,
  }, {
    id: "device_1779191099849",
    name: "2F-前室-送风口模块",
    x: 260,
    y: 274,
    width: 26,
    height: 22,
  }, {
    id: "device_1779191847041",
    name: "2F-前室-应急照明灯",
    x: 292,
    y: 279,
    width: 53,
    height: 28,
  }, {
    id: "device_1779194338058",
    name: "2F-前室-应急疏散标志灯具", // 请修改为实际的设备名称
    x: 236,
    y: 375,
    width: 90,
    height: 33,
  }, {
    id: "device_1779191419463",
    name: "2F-感温探测器（差定温）",
    x: 434,
    y: 232,
    width: 34,
    height: 16,
  }, {
    id: "device_1779191433279",
    name: "2F-感温探测器（差温）",
    x: 536,
    y: 233,
    width: 34,
    height: 16,
  }, {
    id: "device_1779191129000",
    name: "2F-感温探测器（定温）",
    x: 829,
    y: 238,
    width: 36,
    height: 16,
  }, {
    id: "device_1779189224061",
    name: "2F-声光报警器",
    x: 470,
    y: 270,
    width: 26,
    height: 28,
  }, {
    id: "device_1779191236382",
    name: "2F-光报警器",
    x: 538,
    y: 271,
    width: 25,
    height: 28,
  }, {
    id: "device_1779189245343",
    name: "2F-火灾显示盘",
    x: 521,
    y: 319,
    width: 57,
    height: 34,
  }, {
    id: "device_1779189264460",
    name: "2F-电话分机",
    x: 474,
    y: 313,
    width: 18,
    height: 52,
  }, {
    id: "device_1779189278260",
    name: "2F-可复位手报",
    x: 423,
    y: 333,
    width: 25,
    height: 21,
  }, {
    id: "device_1779189289343",
    name: "2F-破碎型手报",
    x: 425,
    y: 380,
    width: 25,
    height: 24,
  }, {
    id: "device_1779189299293",
    name: "2F-电话插孔",
    x: 473,
    y: 384,
    width: 23,
    height: 21,
  }, {
    id: "device_1779194320075",
    name: "2F-应急疏散标志灯具", // 请修改为实际的设备名称
    x: 507,
    y: 376,
    width: 84,
    height: 34,
  }, {
    id: "device_1779191445379",
    name: "2F-应急照明灯",
    x: 622,
    y: 233,
    width: 36,
    height: 17,
  }, {
    id: "device_1779189202927",
    name: "2F-切非(脉冲)模块",
    x: 623,
    y: 275,
    width: 24,
    height: 22,
  }, {
    id: "device_1779191291265",
    name: "2F-脉冲切电",
    x: 621,
    y: 325,
    width: 26,
    height: 32,
  }, {
    id: "device_1779189114262",
    name: "2F-可燃气体探测器",
    x: 707,
    y: 235,
    width: 32,
    height: 14,
  }, {
    id: "device_1779189156661",
    name: "2F-离子感烟探测器",
    x: 947,
    y: 238,
    width: 37,
    height: 19,
  }, {
    id: "device_1779189176994",
    name: "2F-排烟口模块",
    x: 851,
    y: 277,
    width: 25,
    height: 24,
  }, {
    id: "device_1779189189928",
    name: "2F-声报警器",
    x: 684,
    y: 271,
    width: 30,
    height: 29,
  }, {
    id: "device_1779191341330",
    name: "2F-红外火焰感光模块",
    x: 871,
    y: 333,
    width: 26,
    height: 22,
  }, {
    id: "device_1779191912974",
    name: "2F-红外火焰感光探测器",
    x: 873,
    y: 301,
    width: 43,
    height: 28,
  },
  {
    id: "device_1779191931757",
    name: "2F-排烟口",
    x: 792,
    y: 265,
    width: 47,
    height: 49,
  }, {
    id: "device_1779191946040",
    name: "2F-扬声器",
    x: 727,
    y: 273,
    width: 31,
    height: 31,
  }, {
    id: "device_1779191979423",
    name: "线型感温电缆探测器（可恢复）",
    x: 700,
    y: 321,
    width: 74,
    height: 46,
  }, {
    id: "device_1779191175832",
    name: "感温电缆模块（可恢复）",
    x: 753,
    y: 378,
    width: 23,
    height: 21,
  }, {
    id: "device_1779191965973",
    name: "线型感温电缆探测器（不可恢复）",
    x: 785,
    y: 321,
    width: 75,
    height: 45,
  }, {
    id: "device_1779191162016",
    name: "感温电缆模块（不可恢复）",
    x: 777,
    y: 378,
    width: 22,
    height: 22,
  }, {
    id: "device_1779194296976",
    name: "2F-应急疏散标志灯具", // 请修改为实际的设备名称
    x: 901,
    y: 378,
    width: 78,
    height: 31,
  }, {
    id: "device_1779194439090",
    name: "2F-防火门", // 请修改为实际的设备名称
    x: 662,
    y: 351,
    width: 33,
    height: 59,
  }, {
    id: "device_1779201698823",
    name: "2F-消火栓按钮", // 请修改为实际的设备名称
    x: 934,
    y: 284,
    width: 58,
    height: 69,
  },
  {
    id: "device_1779195712505",
    name: "2F-广播模块", // 请修改为实际的设备名称
    x: 1007,
    y: 344,
    width: 25,
    height: 23,
  }, {
    id: "device_1779201579940",
    name: "2F-总线隔离器", // 请修改为实际的设备名称
    x: 1010,
    y: 294,
    width: 27,
    height: 25,
  }, {
    id: "device_1779201486123",
    name: "2F-红外光束感烟探测器模块", // 请修改为实际的设备名称
    x: 430,
    y: 260,
    width: 27,
    height: 24,
  }, {
    id: "device_1779201473857",
    name: "红外光束感烟探测器（对射型）接收器", // 请修改为实际的设备名称
    x: 396,
    y: 256,
    width: 33,
    height: 24,
  },
  {
    id: "device_1779201446507",
    name: "红外光束感烟探测器（对射型）发射器", // 请修改为实际的设备名称
    x: 1030,
    y: 265,
    width: 60,
    height: 23,
  },
  // 仿真展板1层
  // {
  //   id: "device_1779198514534",
  //   name: "仿真展板1层", // 请修改为实际的设备名称
  //   x: 49,
  //   y: 441,
  //   width: 1040,
  //   height: 181,
  // },
  {
    id: "device_1779185454751",
    name: "1F-楼梯间-光电感烟探测器",
    x: 95,
    y: 435,
    width: 38,
    height: 12,
  },
  {
    id: "device_1779185862534",
    name: "1F-楼梯间-送风口",
    x: 66,
    y: 460,
    width: 50,
    height: 39,
  }, {
    id: "device_1779194508221",
    name: "1F-应急疏散标志灯具", // 请修改为实际的设备名称
    x: 510,
    y: 553,
    width: 74,
    height: 29,
  }, {
    id: "device_1779185978300",
    name: "1F-前室-送风口",
    x: 270,
    y: 508,
    width: 40,
    height: 39,
  },
  {
    id: "device_1779185482468",
    name: "1F-前室-光电感烟探测器",
    x: 250,
    y: 432,
    width: 38,
    height: 14,
  },
  {
    id: "device_1779196922757",
    name: "1F-前室-送风口模块", // 请修改为实际的设备名称
    x: 270,
    y: 457,
    width: 25,
    height: 25,
  }, {
    id: "device_1779196950690",
    name: "1F-前室-应急照明", // 请修改为实际的设备名称
    x: 305,
    y: 452,
    width: 39,
    height: 35,
  }, {
    id: "device_1779196971723",
    name: "1F-前室-电梯模块", // 请修改为实际的设备名称
    x: 351,
    y: 457,
    width: 25,
    height: 24,
  }, {
    id: "device_1779194536888",
    name: "1F-前室-应急疏散标志灯具", // 请修改为实际的设备名称
    x: 254,
    y: 553,
    width: 80,
    height: 29,
  }, {
    id: "device_1779197000240",
    name: "1F-红外光束感烟探测器模块", // 请修改为实际的设备名称
    x: 435,
    y: 441,
    width: 23,
    height: 27,
  }, {
    id: "device_1779197016340",
    name: "1F-红外光束感烟探测器(反射型)", // 请修改为实际的设备名称
    x: 400,
    y: 448,
    width: 35,
    height: 35,
  }, {
    id: "device_1779197051290",
    name: "1F-感温探测器（差定温）", // 请修改为实际的设备名称
    x: 438,
    y: 434,
    width: 31,
    height: 11,
  }, {
    id: "device_1779197064073",
    name: "1F-感温探测器（差温）", // 请修改为实际的设备名称
    x: 540,
    y: 435,
    width: 23,
    height: 9,
  }, {
    id: "device_1779197112258",
    name: "1F-感温探测器（定温）", // 请修改为实际的设备名称
    x: 827,
    y: 435,
    width: 26,
    height: 10,
  }, {
    id: "device_1779197080273",
    name: "1F-应急照明灯", // 请修改为实际的设备名称
    x: 621,
    y: 436,
    width: 33,
    height: 10,
  }, {
    id: "device_1779197096589",
    name: "1F-可燃气体探测器", // 请修改为实际的设备名称
    x: 700,
    y: 435,
    width: 38,
    height: 11,
  }, {
    id: "device_1779197125072",
    name: "1F-离子感烟探测器", // 请修改为实际的设备名称
    x: 938,
    y: 435,
    width: 31,
    height: 12,
  }, {
    id: "device_1779197148591",
    name: "1F-排烟口模块", // 请修改为实际的设备名称
    x: 840,
    y: 453,
    width: 25,
    height: 25,
  }, {
    id: "device_1779202048021",
    name: "1F-排烟口", // 请修改为实际的设备名称
    x: 784,
    y: 446,
    width: 42,
    height: 42,
  }, {
    id: "device_1779200971425",
    name: "1F-紫外火焰感光探测器", // 请修改为实际的设备名称
    x: 866,
    y: 474,
    width: 44,
    height: 32,
  }, {
    id: "device_1779197174039",
    name: "1F-紫外火焰感光模块", // 请修改为实际的设备名称
    x: 860,
    y: 507,
    width: 24,
    height: 21,
  }, {
    id: "device_1779197184223",
    name: "1F-扬声器", // 请修改为实际的设备名称
    x: 720,
    y: 455,
    width: 28,
    height: 26,
  }, {
    id: "device_1779197197922",
    name: "1F-声报警器", // 请修改为实际的设备名称
    x: 684,
    y: 458,
    width: 22,
    height: 21,
  }, {
    id: "device_1779197211056",
    name: "1F-切非（脉冲）模块", // 请修改为实际的设备名称
    x: 619,
    y: 457,
    width: 22,
    height: 25,
  }, {
    id: "device_1779197222889",
    name: "1F-脉冲切电", // 请修改为实际的设备名称
    x: 618,
    y: 503,
    width: 24,
    height: 32,
  }, {
    id: "device_1779201747289",
    name: "1F-消火栓按钮", // 请修改为实际的设备名称
    x: 917,
    y: 463,
    width: 59,
    height: 71,
  },
  {
    id: "device_1779197309755",
    name: "1F-广播模块", // 请修改为实际的设备名称
    x: 988,
    y: 514,
    width: 26,
    height: 25,
  }, {
    id: "device_1779197327289",
    name: "1F-总线隔离器", // 请修改为实际的设备名称
    x: 992,
    y: 469,
    width: 27,
    height: 25,
  }, {
    id: "device_1779197346988",
    name: "1F-光报警器", // 请修改为实际的设备名称
    x: 537,
    y: 457,
    width: 25,
    height: 24,
  }, {
    id: "device_1779197359072",
    name: "1F-声光报警器", // 请修改为实际的设备名称
    x: 472,
    y: 457,
    width: 26,
    height: 24,
  }, {
    id: "device_1779197372222",
    name: "1F-火灾显示盘", // 请修改为实际的设备名称
    x: 524,
    y: 502,
    width: 52,
    height: 31,
  }, {
    id: "device_1779197384655",
    name: "1F-电话分机", // 请修改为实际的设备名称
    x: 478,
    y: 496,
    width: 13,
    height: 48,
  }, {
    id: "device_1779197398888",
    name: "1F-可复位手报", // 请修改为实际的设备名称
    x: 427,
    y: 509,
    width: 24,
    height: 24,
  },
  {
    id: "device_1779197414105",
    name: "1F-破碎型手报", // 请修改为实际的设备名称
    x: 428,
    y: 555,
    width: 24,
    height: 27,
  }, {
    id: "device_1779197424922",
    name: "1F-电话插孔", // 请修改为实际的设备名称
    x: 475,
    y: 554,
    width: 21,
    height: 22,
  }, {
    id: "device_1779200473577",
    name: "防火卷帘", // 请修改为实际的设备名称
    x: 656,
    y: 527,
    width: 33,
    height: 55,
  }, {
    id: "device_1779189444658",
    name: "卷帘全降模块",
    x: 699,
    y: 506,
    width: 24,
    height: 23,
  }, {
    id: "device_1779189455858",
    name: "卷帘半降模块",
    x: 700,
    y: 531,
    width: 21,
    height: 19,
  }, {
    id: "device_1779189469210",
    name: "卷帘故障模块",
    x: 701,
    y: 552,
    width: 19,
    height: 20,
  }, {
    id: "device_1779194508222",
    name: "1F-应急疏散标志灯具", // 请修改为实际的设备名称
    x: 886,
    y: 549,
    width: 74,
    height: 29,
  }, {
    id: "device_1779201411123",
    name: "反射板", // 请修改为实际的设备名称
    x: 1035,
    y: 445,
    width: 43,
    height: 40,
  }, {
    id: "device_1779204134302",
    name: "消火栓泵", // 请修改为实际的设备名称
    x: 729,
    y: 558,
    width: 15,
    height: 20,
  }, {
    id: "device_1779204169065",
    name: "喷淋泵", // 请修改为实际的设备名称
    x: 752,
    y: 558,
    width: 11,
    height: 16,
  }, {
    id: "device_1779204187499",
    name: "放气阀", // 请修改为实际的设备名称
    x: 772,
    y: 559,
    width: 14,
    height: 13,
  }, {
    id: "device_1779204209181",
    name: "压力开关", // 请修改为实际的设备名称
    x: 790,
    y: 557,
    width: 17,
    height: 20,
  },
  {
    id: "device_1779204227165",
    name: "水流指示器", // 请修改为实际的设备名称
    x: 812,
    y: 554,
    width: 17,
    height: 22,
  }, {
    id: "device_1779204244981",
    name: "信号蝶阀", // 请修改为实际的设备名称
    x: 833,
    y: 555,
    width: 18,
    height: 20,
  }, {
    id: "device_1779204312531",
    name: "多线控制", // 请修改为实际的设备名称
    x: 726,
    y: 505,
    width: 47,
    height: 25,
  },
  {
    id: "device_1779204337264",
    name: "总线控制", // 请修改为实际的设备名称
    x: 727,
    y: 530,
    width: 44,
    height: 21,
  },
  {
    id: "device_1779204359881",
    name: "监管模块", // 请修改为实际的设备名称
    x: 771,
    y: 527,
    width: 89,
    height: 24,
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
