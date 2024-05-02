import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Login from "../../components/Login Page/Login";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionary";
import { cookies } from "next/headers";

const page = async ({ params }: { params: Params }) => {

  //const lang: Locale = params.lang;
  const lang = cookies().get('locale')
  const dict = await getDictionary(lang)
  
  return <Login dict={dict.loginPage} />
}

export default page;