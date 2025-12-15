<template>
  <view class="radar-chart">
    <canvas 
      canvas-id="radarCanvas" 
      class="radar-canvas"
      @touchstart="handleTouch"
    />
  </view>
</template>

<script>
export default {
  name: 'RadarChart',
  props: {
    values: {
      type: Array,
      default: () => [85, 60, 90, 75, 70] // 进攻、防守、网前、意识、体能
    }
  },
  data() {
    return {
      ctx: null,
      canvasWidth: 200,
      canvasHeight: 200,
      center: 100,
      radius: 80,
      labels: ['进攻', '防守', '网前', '意识', '体能']
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initCanvas()
    })
  },
  watch: {
    values: {
      handler() {
        this.drawChart()
      },
      deep: true
    }
  },
  methods: {
    initCanvas() {
      const query = uni.createSelectorQuery().in(this)
      query.select('.radar-canvas').boundingClientRect((rect) => {
        if (rect) {
          this.canvasWidth = rect.width
          this.canvasHeight = rect.height
          this.center = Math.min(rect.width, rect.height) / 2
          this.radius = this.center * 0.8
          
          this.ctx = uni.createCanvasContext('radarCanvas', this)
          this.drawChart()
        }
      }).exec()
    },
    
    drawChart() {
      if (!this.ctx) return
      
      // 清空画布
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      
      // 设置画布中心
      this.ctx.translate(this.center, this.center)
      
      // 绘制背景网格
      this.drawGrid()
      
      // 绘制数据区域
      this.drawDataArea()
      
      // 绘制数据点
      this.drawDataPoints()
      
      // 绘制标签
      this.drawLabels()
      
      this.ctx.draw()
    },
    
    drawGrid() {
      const angleStep = (Math.PI * 2) / this.labels.length
      
      // 绘制同心圆
      this.ctx.setStrokeStyle('#e5e7eb')
      this.ctx.setLineWidth(1)
      
      // 外圆
      this.ctx.beginPath()
      this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
      this.ctx.stroke()
      
      // 中圆
      this.ctx.setStrokeStyle('#e5e7eb')
      this.ctx.setLineWidth(0.5)
      this.ctx.setLineDash([4, 4])
      this.ctx.beginPath()
      this.ctx.arc(0, 0, this.radius * 0.5, 0, Math.PI * 2)
      this.ctx.stroke()
      this.ctx.setLineDash([])
      
      // 绘制射线
      this.ctx.setStrokeStyle('#f3f4f6')
      this.ctx.setLineWidth(0.5)
      
      for (let i = 0; i < this.labels.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = Math.cos(angle) * this.radius
        const y = Math.sin(angle) * this.radius
        
        this.ctx.beginPath()
        this.ctx.moveTo(0, 0)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
      }
    },
    
    drawDataArea() {
      const angleStep = (Math.PI * 2) / this.labels.length
      
      // 绘制数据多边形
      this.ctx.setFillStyle('rgba(204, 243, 129, 0.4)')
      this.ctx.setStrokeStyle('#ccf381')
      this.ctx.setLineWidth(2)
      
      this.ctx.beginPath()
      
      for (let i = 0; i < this.values.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = Math.max(0, Math.min(100, this.values[i]))
        const distance = (value / 100) * this.radius
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        
        if (i === 0) {
          this.ctx.moveTo(x, y)
        } else {
          this.ctx.lineTo(x, y)
        }
      }
      
      this.ctx.closePath()
      this.ctx.fill()
      this.ctx.stroke()
    },
    
    drawDataPoints() {
      const angleStep = (Math.PI * 2) / this.labels.length
      
      // 绘制数据点
      this.ctx.setFillStyle('#1a1a1a')
      this.ctx.setStrokeStyle('#ffffff')
      this.ctx.setLineWidth(2)
      
      for (let i = 0; i < this.values.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = Math.max(0, Math.min(100, this.values[i]))
        const distance = (value / 100) * this.radius
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        
        this.ctx.beginPath()
        this.ctx.arc(x, y, 4, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.stroke()
      }
    },
    
    drawLabels() {
      const angleStep = (Math.PI * 2) / this.labels.length
      
      this.ctx.setFillStyle('#999999')
      this.ctx.setFontSize(10)
      this.ctx.setTextAlign('center')
      this.ctx.setTextBaseline('middle')
      
      for (let i = 0; i < this.labels.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const labelDistance = this.radius + 20
        const x = Math.cos(angle) * labelDistance
        const y = Math.sin(angle) * labelDistance
        
        this.ctx.fillText(this.labels[i], x, y)
      }
    },
    
    handleTouch() {
      // 可以添加交互效果
    }
  }
}
</script>

<style lang="scss" scoped>
.radar-chart {
  width: 100%;
  aspect-ratio: 1;
  max-width: 400rpx;
  margin: 0 auto;
  box-sizing: border-box;
}

.radar-canvas {
  width: 100%;
  height: 100%;
}
</style>