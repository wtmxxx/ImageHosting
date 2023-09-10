const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 定义要获取数据的 URL
const apiUrl = 'https://img.wotemo.com/randomphotos';

// 获取当前文件所在的目录（api文件夹）
const currentDirectory = __dirname;

// 获取上级目录的路径（root-directory）
const parentDirectory = path.join(currentDirectory, '..');

// 获取randomphotos文件夹的路径
const randomphotosDirectory = path.join(parentDirectory, 'randomphotos');

// 确保randomphotos目录存在，如果不存在则创建
if (!fs.existsSync(randomphotosDirectory)) {
  fs.mkdirSync(randomphotosDirectory);
}

// 定义要写入的 JSON 文件路径
const jsonFilePath = path.join(randomphotosDirectory, 'randomphotos.json');

// 发起 HTTP GET 请求获取数据
axios.get(apiUrl)
  .then((response) => {
    // 获取响应数据
    const responseData = response.data;

    // 将数据写入 JSON 文件
    fs.writeFileSync(jsonFilePath, JSON.stringify(responseData, null, 2), 'utf-8');

    console.log('数据已更新并写入到 randomphotos.json 文件中');
  })
  .catch((error) => {
    console.error('获取数据时发生错误:', error);
  });
