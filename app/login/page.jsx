import Login from "@/components/Login Page/Login";
import { login } from "./actions";
const page = () => {
  return <><Login loginUser={login} /></>
}

export default page;