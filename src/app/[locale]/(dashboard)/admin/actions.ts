'use server'

export async function addUser(formData: FormData) {

  const data = {
    firstname: formData.get('firstname') as string,
    lastname: formData.get('lastname') as string,
    dob: formData.get('dob') as string,
    gender: formData.get('gender') as string,
    mobile: formData.get('mobile') as string,
    address: formData.get('address') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    role: formData.get('role') as string
  }

  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

  const apiUrl = `${baseUrl}/api/users`;

  console.log(baseUrl)
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    const data = await response.json();
    console.log('User added successfully:', data);
  } else {
    console.error('Failed to add user. Status:', response.status);
    console.log(await response.json())
  }
}
