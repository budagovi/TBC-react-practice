'use client'
// --- style
import style from './CheckoutSteps.module.css';
// --- hooks
import useIsClient from "@/src/hooks/useIsClient";
// --- antd 
import { ConfigProvider, Steps } from "antd";
// --- next-internationalization
import { useScopedI18n } from '@/src/lib/next-internationalization/client';


const CheckoutSteps = ({ current }: { current: number }) => {

  const t = useScopedI18n('/checkout');
  const isClient = useIsClient();

  if (!isClient)
    return null;

  return (
    <div className={style.stepsWrapper}>
      <ConfigProvider theme={{
        components: {
          Steps: {
            colorPrimary: '#1b3c35',
            colorSplit: '#dce1de',
            fontSize: 16
          }
        }
      }}>
        <Steps
          size="default"
          current={current}
          items={[
            {
              title: t('contacts'),
            },
            {
              title: t('shipping'),
            },
            {
              title: t('payment'),
            },
          ]}
        />
      </ConfigProvider>
    </div>
  )
}

export default CheckoutSteps;