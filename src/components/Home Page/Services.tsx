// -- style
import style from './Services.module.css';
// --- react-icons
import { BsTruck } from "react-icons/bs";
import { TbHeadset } from "react-icons/tb";
import { GoShieldCheck } from "react-icons/go";
// next-internationalization
import { getScopedI18n } from '@/src/lib/next-internationalization/server';

/**
 * List of Services ( Horizontally )
 */
const Services = async () => {

  const t = await getScopedI18n('/');

  const services = [
    {
      icon: <BsTruck />,
      title: t('delivery service.0'),
      text: t('delivery service.1')
    },
    {
      icon: <TbHeadset />,
      title: t('support service.0'),
      text: t('support service.1'),
    },
    {
      icon: <GoShieldCheck />,
      title: t('money back service.0'),
      text: t('money back service.1'),
    }
  ]

  return (
    <div className={style.wrapper}>
      {services.map(srv => <div className={style.item}>
        <div className={style.iconWrapper}>
          {srv.icon}
        </div>
        <span className={style.title}>{srv.title}</span>
        <span className={style.text}>{srv.text}</span>
      </div>)}
    </div>
  );
};

export default Services;
