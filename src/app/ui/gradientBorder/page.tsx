"use client"

// https://juejin.cn/post/7363220159505694747
// 渐变边框文字效果

import "./index.scss"

const GradientBorder = () => {
  return (
    <div className="gradient-border">
      <section className="section1">
        <div className="gradient">Normal Text</div>
        <div className="gradient dilate">Normal Text</div>
        <div className="gradient erode">Normal Text</div>
        <svg width="0" height="0">
          <filter id="dilate">
            <feMorphology
              in="SourceAlpha"
              result="DILATED"
              operator="dilate"
              radius="3"
            ></feMorphology>
          </filter>
          <filter id="erode">
            <feMorphology
              in="SourceAlpha"
              result="ERODE"
              operator="erode"
              radius="1"
            ></feMorphology>
          </filter>
        </svg>
      </section>

      <section className="section2">
        <span className="text" data-text="我能吞下玻璃而不伤身体"></span>
      </section>

      <section className="section3">
        <div data-text="123/678"></div>
        <svg width="0" height="0">
          <filter id="outline">
            <feMorphology
              in="SourceAlpha"
              result="ERODE"
              operator="erode"
              radius="2"
            ></feMorphology>
            <feFlood floodColor="#fff" floodOpacity="1" result="flood"></feFlood>
            <feComposite in="flood" in2="ERODE" operator="in" result="OUTLINE"></feComposite>
            <feMerge>
              <feMergeNode in="OUTLINE" />
            </feMerge>
          </filter>
        </svg>
      </section>
    </div>
  )
}

export default GradientBorder
