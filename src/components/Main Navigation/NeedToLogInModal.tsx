'use client'
// --- style
import style from '@/src/components/Main Navigation/NeedToLoginModal.module.css'
// --- UI
import Button from '@/src/UI/Button/Button';
// --- antd
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
// --- react api
import { useState } from 'react';
// --- next-international
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  closeDrawer: () => void,
  isLogged: boolean
}
/** 
 * Button that activates feedback modal (to sign in) if user is non-autorized
 */
const NavigateToCartButton = ({ closeDrawer, isLogged }: IProps) => {

  const t = useScopedI18n('header')

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const viewCartHandler = () => {
    if (isLogged) {
      router.push('/cart');
      closeDrawer();
    }
    else
      setIsModalOpen(true);
  }

  const goToLoginHandler = () => {
    router.push('/sign-in');
    toggleModal();
    closeDrawer()
  }

  return (
    <div className={style.wrapper}>
      <Button onClick={viewCartHandler}>{t('view cart')}</Button>
      <Modal
        open={isModalOpen}
        onOk={toggleModal}
        onCancel={toggleModal}
        cancelText=''
        footer=''
        closable={false}
        className={style.modal}
      >
        <div className={style.modalContent}>
          <span>{t('to proceed')}</span>
          <Button onClick={goToLoginHandler}>{t('sign in')}</Button>
        </div>
      </Modal>
    </div>
  )
}

export default NavigateToCartButton;