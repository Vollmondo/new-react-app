self.onmessage = async (e) => {
  console.log(e.data);
  try {
    const data = e.data.data;
    const response = await fetch('http://localhost:5000/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log('Данные успешно записаны в базу данных:', result.insertedId);
    self.postMessage('Данные успешно записаны в базу данных');
  } catch (error) {
    console.error('Ошибка при записи в базу данных:', error);
    self.postMessage('Ошибка при записи в базу данных');
  }
};