# 中文文档 
https://www.swiper.com.cn/api/index.html


# loopedSlides

swiper的loopedSlides属性用于设置循环轮播时预加载的slide数量。

注意，在为了实现无限循环所添加的额外slide可能会影响到slide的数量和顺序。

具体作用如下：

* 当设置了loop选项时，即使没有循环的slide也可以通过无限轮播滑动到。loopedSlides属性就是用来设置每次滑动过程中要预加载的slide数量。

* 当只有3个slide时，loopedSlides为1时，初始的SWiper会在左右两侧多加载一个相同的slide，并且它们会有相同的索引，实现循环轮播。

* 当只有3个slide时，loopedSlides为2时，初始的SWiper会在左右两侧各多加载两个相同的slide，并且它们会有相同的索引，实现循环轮播。

* loopedSlides的默认值为0，表示不预加载任何slide。

  
