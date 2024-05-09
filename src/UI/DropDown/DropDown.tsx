// *
// * Custom dropdown menu component (takes list of <li/> tags as children | takes JSX component as trigger)
// *

// CSS
import style from './DropDown.module.css';

// Custom hooks
import useClickOutside from "@/src/hooks/useClickOutside";

// next.js/react api
import { ReactNode, useState } from "react";

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