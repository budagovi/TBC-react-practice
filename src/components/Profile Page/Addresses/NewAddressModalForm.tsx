'use client'
import Input from '@/src/UI/Input Fields/Input/Input';
// --- style
import style from './NewAddressModaForm.module.css';
// --- next-internationalization
import { useCurrentLocale, useScopedI18n } from '@/src/lib/next-internationalization/client';
// --- antd
import { App, Modal } from 'antd';
// --- react api
import { ChangeEvent, FormEvent, useCallback, useState, useTransition } from 'react';
// --- react-icons
import { FiPlus } from 'react-icons/fi';
// --- types
import type { INewAddressForm } from '@/src/lib/types/forms';
import type { IAddress, IUser } from '@/src/lib/types/entities';
// --- utils
import { addressValidator, cityValidator, isRequiredFieldString } from '@/src/lib/validators';
// --- UI
import Button from '@/src/UI/Button/Button';

const initialValue: INewAddressForm = {
  city: '',
  address: '',
  tag: ''
}

interface IProps {
  user: IUser,
  onAddAddress: (newAddress: IAddress) => void
}


const NewAddressModaForm = ({ user, onAddAddress }: IProps) => {

  const t = useScopedI18n('/profile.addresses');
  const locale = useCurrentLocale();

  const { message } = App.useApp();
  // managing form
  const [values, setValues] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reset, setReset] = useState(false);

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      if (
        isRequiredFieldString('').validateFn(values.tag) >= 0 ||
        cityValidator.validateFn(values.city) >= 0 ||
        addressValidator.validateFn(values.address) >= 0
      ) return

      setIsSubmitting(true)
      const key = 'updatable';
      message.open({
        key,
        type: 'loading',
        content: t('loading msg'),
        duration: 3600
      })

      setTimeout(async () => {
        try {
          const response = await fetch('/api/addresses/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...values, userId: user.id, mobile: user.mobile
            })
          })

          if (response.ok) {
            const newAddress = await response.json();
            message.open({
              key,
              type: 'success',
              content: t('success msg'),
              duration: 3
            })

            onAddAddress(newAddress)
            toggleModal();
            setValues(initialValue)
            return;
          }

          throw new Error('something went wrong')
        } catch (e) {
          message.open({
            key,
            type: 'error',
            content: t('failure msg'),
            duration: 2
          })
          console.log(e) // "something went wrong"
        } finally {
          setIsSubmitting(false)
        }
      }, 1000)


    })
  }

  // modal functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {

    if (isModalOpen) {
      setReset(true);
      setTimeout(() => setReset(false), 1000);
      console.log('test')
    }
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <div className={style.wrapper}>
      <button onClick={toggleModal} type='button'><FiPlus />{t('add address')}</button>
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
          <form
            className={style.wrapepr}
            onSubmit={submitHandler}
            style={isSubmitting ? { opacity: 0.7, pointerEvents: 'none' } : undefined}
          >
            <span>Add new address</span>
            {/* -=-=-=- City Field -=-=-=- */}
            <Input
              label={t('city.0')}
              placeholder={t('city.1')}
              type='text'
              name='city' // id
              // for controlling input
              value={values.city}
              onChange={changeHandler}
              // validations
              validate={cityValidator.validateFn}
              errorMsgs={cityValidator.errorMsgs(locale)}
              isRequired={true}
              formSubmitted={isPending}
              reset={reset}
            />

            {/* -=-=-=- Address Field -=-=-=- */}
            <Input
              label={t('address.0')}
              placeholder={t('address.1')}
              type='text'
              name='address' // id
              // for controlling input
              value={values.address}
              onChange={changeHandler}
              // validations
              validate={addressValidator.validateFn}
              errorMsgs={addressValidator.errorMsgs(locale)}
              isRequired={true}
              formSubmitted={isPending}
              reset={reset}
            />

            {/* -=-=-=- Tag Field -=-=-=- */}
            <Input
              label={t('tag.0')}
              placeholder={t('tag.1')}
              type='text'
              name='tag' // id
              // for controlling input
              value={values.tag}
              onChange={changeHandler}
              // validations
              validate={isRequiredFieldString(t('tag.0')).validateFn}
              errorMsgs={isRequiredFieldString(t('tag.0')).errorMsgs(locale)}
              isRequired={true}
              formSubmitted={isPending}
              reset={reset}
            />

            <Button type='submit'>Add</Button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default NewAddressModaForm;