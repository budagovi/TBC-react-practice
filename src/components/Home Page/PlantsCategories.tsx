// -- style
import style from './PlantsCategories.module.css';
// --- UI
import Link from 'next/link';
// --- next-internationalization
import { getScopedI18n } from '@/src/lib/next-internationalization/server';

/**
 * Plants Categories grid for Home page
 */
const PlantsCategories = async () => {

  const t = await getScopedI18n('/')
  return (
    <div className={style.wrapper}>
      <Link href='/store' className={`${style.item1} ${style.item}`}>
        <div className={style.overlay}>
          <span>{t('plants')} &rarr;</span>
        </div>
      </Link>
      <Link href='/store' className={`${style.item2} ${style.item}`}>
        <div className={style.overlay}>
          <span>{t('cactuses')}  &rarr;</span>
        </div>
      </Link>
      <Link href='/store' className={`${style.item3} ${style.item}`}>
        <div className={style.overlay}>
          <span>{t('bonsais')} &rarr;</span>
        </div>
      </Link>
    </div>
  );
};

export default PlantsCategories;
