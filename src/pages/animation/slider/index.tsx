
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules"
import "swiper/swiper-bundle.css";
import "./index.css"


const Slider = () => {

  const list = [{
    text: "text 1",
    color: "#f5222d"
  }, {
    text: "text 2",
    color: "#faad14"
  }, {
    text: "text 3",
    color: "#fadb14"
  },
  {
    text: "text 4",
    color: "#a0d911"
  }, {
    text: "text 5",
    color: "#13c2c2"
  }
  ]

  return <div className='slider-page'>
    <Swiper
      loop={true}
      // loopedSlides 预加载
      loopedSlides={2}
      spaceBetween={15}
      centeredSlides={true}
      slidesPerView={"auto"}
      // autoplay={{
      //   delay: 3000, // 自动切换的延迟时间（单位为毫秒）
      //   disableOnInteraction: false, // 用户操作之后是否停止自动切换
      // }}
      onSlideChange={() => { }}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Autoplay]}
    >
      {list.map((item, index) => {
        return <SwiperSlide key={index} className="item" style={{ background: item.color }}>
          <span className="item-text">{item.text}</span>
        </SwiperSlide>
      })}
    </Swiper>
  </div>
}

export default Slider
