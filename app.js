async function submitForm() {
  const name = document.getElementById('nameInput').value.trim();
  const group = document.getElementById('groupSelect').value;

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, group }),
    });

    if (!response.ok) throw new Error('提交失败');
    alert('提交成功！');
    location.reload();
  } catch (error) {
    alert(`错误：${error.message}`);
  }
}