// *
// * Custom hook for validating inputs
// *

// --- react api
import { ChangeEvent, useState } from "react"

const useValidate = (validate: (exp: string) => boolean) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validate(value);
  const isInvalid = !isValid && isTouched;

  const blurHandler = () => {
    setIsTouched(true);
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const reset = () => {
    setIsTouched(false);
    setValue('');
  }

  return { value, isValid, isInvalid, blurHandler, changeHandler, reset };
}

export default useValidate;