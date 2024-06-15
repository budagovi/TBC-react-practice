// --- style
import style from './SectionLabel.module.css';
// --- react api
import { ReactNode } from 'react';

interface Props {
  children: ReactNode
}

/**
 * Custom component to use as section Labels
 */
const SectionLabel = ({ children }: Props) => {

  return (
    <span className={style.intro}>{children}</span>
  )
}

export default SectionLabel;