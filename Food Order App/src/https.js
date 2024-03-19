export default async function fetchAvailableMeals() {
  const response = await fetch('http://localhost:3000/meals');
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch Meals');
  }
  return resData;
}

export async function UpdateOrderDetails(items, customerData) {
  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order: {
        items: items,
        customer: customerData,
      },
    }),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Not found ');
  }
  return resData.message;
}
