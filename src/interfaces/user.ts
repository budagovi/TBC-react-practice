export default interface User {
  id: number;
  firstname: string;
  lastname: string;
  dob: string;
  gender: 'male' | 'female';
  email: string;
  password: string;
  mobile: string;
  address: string;
  role: 'admin' | 'user';
  created_at: string;
}
