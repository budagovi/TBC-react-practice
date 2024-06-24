'use client'
// --- style
import style from '@/src/components/Main Navigation/NeedToLoginModal.module.css'
// --- UI
import Button from '@/src/UI/Button/Button';
import getActiveUser from '@/src/server actions/getActiveUser';
// --- antd
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
// --- react api
import { useEffect, useState } from 'react';
// --- next-international
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  closeDrawer: () => void
}
/** 
 * Button that activates feedback modal (to sign in) if user is non-autorized
 */
const NavigateToCartButton = ({ closeDrawer }: IProps) => {

  const t = useScopedI18n('header')

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const user = await getActiveUser();
      setIsLogged(!!user);
    }

    getSession()
  }, [])

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