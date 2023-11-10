const sensorName = [
  { name: '环境温度 T(℃)', prop: 'env_tmp' },
  { name: '环境湿度(%RH)', prop: 'env_hum' },
  { name: '露点温度 Td(℃)', prop: 'dew_point' },
  { name: '风速(m/s)', prop: 'speed' },
  { name: '两分钟平均风速(m/s)', prop: 'avg_speed2' },
  { name: '十分钟平均风速(m/s)', prop: 'avg_speed10' },
  { name: '风向(°)', prop: 'wind_direction' },
  { name: '电池电压(V)', prop: 'battery_voltage' },
  { name: '雨量日累计(mm)', prop: 'rain_total' },
  { name: '能见度 VIS(m)', prop: 'visibility' },
  { name: '场面气压 QFE(hPa)', prop: 'pressure' },

  { name: '十分钟平均能见度(m)', prop: 'avg_visibility10' },
  { name: '海拔(m)', prop: 'altitude' },
];
// const sensorName = [
//   { name: '辐射1_累计(J/m²)', prop: 'radiation1_total' },
//   { name: '辐射2_累计(J/m²)', prop: 'radiation2_total' },
//   { name: '环境温度1(℃)', prop: 'land_tmp1' },
//   { name: '环境温度2(℃)', prop: 'land_tmp2' },
//   { name: '环境温度3(℃)', prop: 'land_tmp3' },
//   { name: '环境温度4(℃)', prop: 'land_tmp4' },
//   { name: '环境温度5(℃)', prop: 'land_tmp5' },
//   { name: '环境温度(℃)', prop: 'env_tmp' },
//   { name: '环境湿度(%RH)', prop: 'env_hum' },
//   { name: '露点(℃)', prop: 'dew_point' },
//   { name: '气压(hPa)', prop: 'pressure' },
//   { name: '海拔(m)', prop: 'altitude' },
//   { name: '风速(m/s)', prop: 'speed' },
//   { name: '两分钟平均风速(m/s)', prop: 'avg_speed2' },
//   { name: '十分钟平均风速(m/s)', prop: 'avg_speed10' },
//   { name: '风向(°)', prop: 'wind_direction' },
//   { name: '辐射1(J/m²)', prop: 'radiation1' },
//   { name: '辐射2(J/m²)', prop: 'radiation2' },
//   { name: '土湿(%m³/m³)', prop: 'land_hum' },
//   { name: '电池电压(V)', prop: 'battery_voltage' },
//   { name: '雨量日累计(mm)', prop: 'rain_total' },
//   { name: '能见度(m)', prop: 'visibility' },
//   { name: '十分钟平均能见度(m)', prop: 'avg_visibility10' },
//   { name: '日照时日累计(min)', prop: 'sunshine_total' },
//   { name: 'co2', prop: 'CO2(ppm)' },
//   { name: 'compass', prop: '电子罗盘(°)' },
//   { name: 'PM2.5(ug/m³)', prop: 'pm2_5' },
//   { name: 'PM10(ug/m³)', prop: 'pm10' },
//   { name: '噪声', prop: 'noise' },
//   { name: '光照', prop: 'illumination' },
//   { name: '日期', prop: 'date' },
//   { name: '时间', prop: 'time' }
// ];
export { sensorName };