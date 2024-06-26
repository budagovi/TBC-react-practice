'use client'
import { IOrder, IUser } from '@/src/lib/types/entities';
import style from './Orders.module.css';
import { useState } from 'react';
import OrderItem from './OrderItem';
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

interface IProps {
  orders: IOrder[],
  user: IUser
}

const Orders = ({ orders: o }: IProps) => {

  const t = useScopedI18n('/profile.orders')
  const [orders, setOrders] = useState(o)

  const removeAddress = (id: number) => {
    setOrders(prevState => prevState.filter(a => a.id != id))
  }

  return (
    <div className={style.wrapper}>
      <table>
        <thead>
          <tr>
            <th>{t('orderNum')}</th>
            <th>{t('price')}</th>
            <th>{t('items')}</th>
            <th>{t('date')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((o) =>
              <OrderItem
                key={o.id}
                order={o}
                onRemoveOrder={removeAddress}
              />)
          }
        </tbody >
      </table>
      {orders.length === 0 && <span>{t('no orders')}</span>}
    </div >
  )
}

export default Orders;