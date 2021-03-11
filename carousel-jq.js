var carousel = {
    opts: {
        index: 0,
        // 自动播放
        auto: true,
        // 播放间隔
        time: 5000,
        // 滚动的元素
        wrap: '.carousel-wrap',
        // 滚动的单项
        slide: '.carousel-slide',
        // 向前翻页按钮
        btnPrev: '.carousel-prev',
        // 向后翻页按钮
        btnNext: '.carousel-next',
        // 小按钮
        btnDots: '.carousel-dots',
    },
    width: 0,
    timer: null,
    init: function ($container, opts) {
        this.opts = $.extend(this.opts, opts);
        this.$wrap = $container.find(this.opts.wrap);
        this.$slide = $container.find(this.opts.slide);
        this.$btnPrev = $container.find(this.opts.btnPrev);
        this.$btnNext = $container.find(this.opts.btnNext);
        this.$btnDots = $container.find(this.opts.btnDots);
        this.width = this.$slide.outerWidth(true);
        this.len = this.$slide.length;
        this.index = this.opts.index < 0 || this.opts.index > this.len - 1 ? 0 : this.opts.index;

        var $firstSlide = this.$slide.first().clone();
        var $lastSlide = this.$slide.last().clone();
        this.$wrap
            .prepend($lastSlide)
            .append($firstSlide)
            .css({
                width: (this.len + 2) * this.width,
                left: -(this.index + 1) * this.width
            });
        this.eventBind();
        this.setDots();
        // 自动轮播
        this.loop();
    },
    loop: function () {
        var that = this;
        if (that.opts.auto) {
            that.timer = setInterval(function () {
                that.animate(-that.width);
            }, that.opts.time);
        }
    },
    animate: function (left) {
        var that = this;
        if (this.$wrap.is(":animated")) {
            // 当正在执行动画的过程中，阻止执行其它动作
            return false;
        } else {
            var curLeft = parseInt(this.$wrap.css("left"));
            left += curLeft;
            this.$wrap.animate({
                left: left
            }, 500, function () {
                if (left < 0 && left < -that.len * that.width) {
                    that.$wrap.css("left", -that.width);
                } else if (left >= 0 && left > -that.width) {
                    that.$wrap.css("left", -that.len * that.width);
                }
                that.index = parseInt(that.$wrap.css("left")) / -that.width - 1;
                that.setDots();
            });
        }
    },
    setDots: function (i) {
        if (i == undefined) {
            i = this.index;
        } else {
            this.index = i < 0 || i > this.len - 1 ? this.index : i;
        }
        this.$btnDots.removeClass('active').eq(i).addClass('active');
    },
    eventBind: function () {
        var that = this;
        this.$btnPrev.click(function () {
            clearInterval(that.timer);
            that.animate(that.width);
            that.loop();
        });
        this.$btnNext.click(function () {
            clearInterval(that.timer);
            that.animate(-that.width);
            that.loop();
        });
        this.$btnDots.each(function (i) {
            $(this).click(function () {
                if ($(this).hasClass('active')) {
                    return false;
                } else {
                    clearInterval(that.timer);
                    that.animate(-(i - that.index) * that.width);
                    that.loop();
                }
            });
        });
        this.$slide.hover(
            function () {
                clearInterval(that.timer);
            },
            function () {
                that.loop();
            }
        );
    }
};
