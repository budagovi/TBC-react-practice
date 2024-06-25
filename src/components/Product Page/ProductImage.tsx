'use client'
import { useState } from 'react';
// --- style
import style from './ProductImage.module.css';
// --- antd
import { Image } from 'antd';

interface IProps {
  imgUrl: string,
  name: string
}

/**
 * Zoomable and auto-draggable image for product page
 */
const ProductImage = ({ imgUrl, name }: IProps) => {

  const [isPreviewlOpen, setIsPreviewlOpen] = useState(false);

  const togglePreview = () => {
    setIsPreviewlOpen(prevState => !prevState);
  };


  const [imageHovered, setImageHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    if (x < -55)
      setPosition(prevState => ({ x: -55, y: prevState.y }));
    else if (x > 55)
      setPosition(prevState => ({ x: 55, y: prevState.y }));
    else
      setPosition(prevState => ({ x, y: prevState.y }));

    if (y < -55)
      setPosition(prevState => ({ x: prevState.x, y: -55 }));
    else if (y > 55)
      setPosition(prevState => ({ x: prevState.x, y: 55 }));
    else
      setPosition(prevState => ({ x: prevState.x, y }));
  };

  return (

    <div
      className={style.imgWrapper}
      onMouseEnter={() => setImageHovered(true)}
      onMouseLeave={() => setImageHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <button onClick={togglePreview}>
        <div className={style.overlay}></div>
        <Image
          src={imgUrl}
          alt={name}
          style={{
            transform: imageHovered && !isPreviewlOpen
              ? `scale(1.4) translate(${position.x}px, ${position.y}px)`
              : 'scale(1)',
          }} />
      </button>
    </div>
  )
}

export default ProductImage;