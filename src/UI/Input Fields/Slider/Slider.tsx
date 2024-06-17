import './Slider.css';
import { Slider as SliderAntd, ConfigProvider } from 'antd';

interface IProps {
  onChangeComplete: ((value: number[]) => void) | undefined,
  defaultValue: number[],
  max: number,
  value: number[]
}

/**
 * 
 * @returns Custom slider bar for setting some range in numbers
 */
const Slider = ({ onChangeComplete, defaultValue, max, value }: IProps) => {
  return (
    <ConfigProvider theme={{
      components: {
        Slider: {
          dotBorderColor: 'red',
          handleColor: '#1b3c35',
          handleActiveColor: '#1b3c35',
          railBg: '#dce1de',
          railHoverBg: '#dce1de',
          trackBg: '#1b3c35',
          trackHoverBg: '#1b3c35',
        }
      }
    }}>
      <SliderAntd
        tooltip={{ color: '#272727', }}
        onChange={onChangeComplete}
        range={{
          draggableTrack: true,
        }}
        defaultValue={defaultValue}
        max={max}
        value={value}
      />
    </ConfigProvider>
  )
}

export default Slider;