import Login from "../../components/Login Page/Login";
import { getDictionary } from "@/src/dictionaries/dictionary";
import { cookies } from "next/headers";

const page = async () => {

  //const lang: Locale = params.lang;
  const lang = cookies().get('locale')
  const dict = await getDictionary(lang)
  
  return <Login dict={dict.loginPage} />
}

export default page;