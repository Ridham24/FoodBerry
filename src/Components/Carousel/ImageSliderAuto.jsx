import React, { useEffect, useState } from 'react';
import {Box} from '@mui/material'
import './ImageSlider.css';
const ImageData = [
  {
    ImageSrc: 'https://source.unsplash.com/random/900×900/?burger',
  },
  {
    ImageSrc: 'https://source.unsplash.com/random/900×900/?pizza',
  },
  {
    ImageSrc: 'https://source.unsplash.com/random/900×900/?sandwich',
  },
]
const ImageSliderAuto = () => {
  const SliderProperty = {
    ImageNo: '',
    ImageName: '',
    ImageSrc: '',
  }

  const [sliderProperty, setSliderProperty] = useState(SliderProperty)

  const { ImageSrc } = sliderProperty

  const [count, setCount] = useState(0)

  const [animationCls, setAnimationCls] = useState('displayBlock fade')

  const PreClick = () => {
    setAnimationCls(() => 'displayNone fade')
    const myTimeout = setTimeout(() => {
      setAnimationCls('displayBlock fade')
    }, 100)

    if (count > 0) {
      setCount((preCount) => preCount - 1)
    }

    if (count === 0) {
      setCount(ImageData.length - 1)
    }
  }

  const NextClick = () => {
    setAnimationCls(() => 'displayNone fade')
    const myTimeout = setTimeout(() => {
      setAnimationCls('displayBlock fade')
    }, 100)

    if (count <= ImageData.length - 2) {
      setCount((preCount) => preCount + 1)
    }

    if (count === ImageData.length - 1) {
      setCount(0)
    }
  }

  useEffect(() => {
    setSliderProperty((previous) => ({
      ...previous,
      ImageSrc: ImageData[count].ImageSrc,
    }))
  }, [count])
  return (
    <Box >
      <div className="slideshow-container ">
        <div className={animationCls}>
          <img
            src={ImageSrc}
            style={{ width: '100%', height: '100%' }}
            alt="Img"
          />
        </div>

        <button className="prev" onClick={PreClick}>
          ❮
        </button>
        <button className="next" onClick={NextClick}>
          ❯
        </button>
      </div>
    </Box>
  )
}

export default ImageSliderAuto;
