'use client'
// --- style
import style from './CheckoutSteps.module.css';
// --- hooks
import useIsClient from "@/src/hooks/useIsClient";
// --- antd 
import { ConfigProvider, Steps } from "antd";

const CheckoutSteps = ({ current }: { current: number }) => {
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
              title: 'Contact Details',
            },
            {
              title: 'Shipping',
            },
            {
              title: 'Payment',
            },
          ]}
        />
      </ConfigProvider>
    </div>
  )
}

export default CheckoutSteps;