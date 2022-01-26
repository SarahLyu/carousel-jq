# carousel-jq
## 介绍
swiper.js太庞大了，改了一个贼拉简单的基于jQuery的轮播组件，保留以备用

## 初始化
```javascript
carousel.init(container, options);
```
| 属性             | 说明                      | 类型                          | 默认值        | 是否必须 |
| ---------- | --------------- | ----------------- | -------- | ------ |
| container       | 轮播容器               | HTMLElement             | -               | 是         |
| options          | 轮播个性化配置     | object                       | -               | 否         |
| options.index  | 初始化时轮播索引  | number                       | 0               | 否         |
| options.auto   | 是否自动轮播         | boolean                     | true            | 否         |
| options.time   | 自动轮播时的切换速度，单位ms  | number   | 5000          | 否         |
| options.wrap  | 设置wrapper的css选择器  | string               | '.carousel-wrap'  | 否         |
| options.slide   | 设置slide的css选择器  | string                   | '.carousel-slide'   | 否         |
| options.btnPrev | 设置向前翻页按钮的css选择器 | string       | '.carousel-prev'   | 否         |
| options.btnNext | 设置向后翻页按钮的css选择器 | string      | '.carousel-next'    | 否         |
| options.btnDots | 设置轮播小圆点容器的css选择器  | string  | '.carousel-dots'    | 否         |
