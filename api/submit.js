// api/submit.js
import { createClient } from '@supabase/supabase-js';

export default async (req, res) => {
  // 允许的域名列表
  const allowedOrigins = [
    'https://ypeuso.github.io',
    'http://localhost:3000'
  ];

  // 获取请求来源
  const origin = req.headers.origin;

  // 检查来源是否在允许列表中
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // 设置其他 CORS 头
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理预检请求（OPTIONS）
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 初始化 Supabase 客户端
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  try {
    const { name, group } = JSON.parse(req.body);

    // 输入验证
    if (!name || name.length > 20 || !group) {
      return res.status(400).json({ error: '无效输入' });
    }

    // 插入数据
    const { error } = await supabase
      .from('students')
      .insert([{ name, group }]);

    if (error) throw error;
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('提交失败:', error);
    res.status(500).json({ error: error.message });
  }
};




