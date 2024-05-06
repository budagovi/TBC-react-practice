import { ReactNode, useState } from "react";
import useClickOutside from "@/src/hooks/useClickOutside";
import style from './DropDown.module.css';

interface Props {
  children: ReactNode,
  trigger: ReactNode,
}
const DropDown = ({ children, trigger }: Props) => {

  const [show, setShow] = useState<boolean>(false);
  const dropRef = useClickOutside(() => setShow(false))
  
  return (
    <div
      className={style.wrapper}
      onClick={() => setShow(prev => !prev)}
      ref={dropRef}
    >
      {trigger}
      <ul className={`${style.dropDown} ${show ? style.show : null}`}>
        {children}
      </ul>
    </div>
  )
}

export default DropDown;