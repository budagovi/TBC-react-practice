'use client'
// --- style
import style from './NavigateToCartButton.module.css'
// --- UI
import Button from '@/src/UI/Button/Button';
import getActiveUser from '@/src/server actions/getActiveUser';
// --- antd
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
// --- react api
import { useEffect, useState } from 'react';

interface IProps {
  closeDrawer: () => void
}
/** 
 * Modal for user feedback (need to sign in to proceed)
 */
const NavigateToCartButton = ({ closeDrawer }: IProps) => {


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
      <Button onClick={viewCartHandler}>view cart</Button>
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
          <span>To proceed, you need to sign in!</span>
          <Button onClick={goToLoginHandler}>go to login</Button>
        </div>
      </Modal>
    </div>
  )
}

export default NavigateToCartButton;