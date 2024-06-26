// --- style
import { App } from 'antd';
import style from './OrderItem.module.css';
import { IOrder } from '@/src/lib/types/entities';
import { useScopedI18n } from '@/src/lib/next-internationalization/client';

const OrderItem = ({ order, onRemoveOrder }: { order: IOrder, onRemoveOrder: (id: number) => void }) => {

  const date = order.created.split('T')[0];
  const { message } = App.useApp();

  const t = useScopedI18n('/profile.orders')
  const clickHandler = async () => {
    try {
      const key = 'updatable';
      message.open({
        key,
        type: 'loading',
        content: t('loading msg delete'),
        duration: 3600
      })

      const response = await fetch(`/api/addresses/${order.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        message.open({
          key,
          type: 'success',
          content: t('success msg delete'),
          duration: 3
        })
        onRemoveOrder(order.id);
      } else {
        console.error('Failed to delete the address');
        message.open({
          key,
          type: 'error',
          content: t('failure msg delete'),
          duration: 3
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <tr className={style.row}>
      <td>{order.id}</td>
      <td>{order.totalPrice}</td>
      <td>{order.totalAmount}</td>
      <td>{date}</td>
      <td>
        <button onClick={clickHandler}>cancel</button>
      </td>
    </tr>
  )
}

export default OrderItem;