'use client'
// --- style
import style from './SortButton.module.css';
// --- antd
import { ConfigProvider, Select } from 'antd';

/**
 * Button to choose with what to sort by
 */
const SortButton = () => {
  return (
    <ConfigProvider theme={{
      components: {
        Select: {

        }
      }
    }}>
      <Select
        placeholder='Default'
        options={[
          { label: 'Default', value: '' },
          { label: 'Price', value: 'price' },
          { label: 'Price Desc', value: 'price desc' }
        ]}
        className={style.sortButton}
        loading={false}
      />
    </ConfigProvider>
  )
}

export default SortButton;