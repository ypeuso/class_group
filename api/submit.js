import { createClient } from '@supabase/supabase-js';

export default async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};