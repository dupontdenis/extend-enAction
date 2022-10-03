class Point {
    constructor(x, y) {
      Object.assign(this, {
        x,
        y
      });
    }
  
    static construct(
      x = Math.round(500 * Math.random()),
      y = Math.round(300 * Math.random())
    ) {
      return new Point(x, y);
    }
  }
  
  class Shape {
    constructor(tabPoints) {
      this.points = tabPoints;
      this.lines = [];
  
      Shape.init();
    }
  
    static construct(...points) {
      return new Shape(points);
    }
  
    static init() {
      console.log("Appel la méthode Static init");
      if (typeof Shape.context === "undefined") {
        let canvas = document.querySelector(".canvas");
        Shape.context = canvas.getContext("2d");
      }
    }
    // method that draws a shape by looping through this.points
    draw() {
      let ctx = Shape.context;
      ctx.fillStyle = this.getColor();
      ctx.beginPath();
  
      this.points.forEach(({ x, y }, i) => {
        console.log(x, y);
        if (i == 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.fill();
  
      return this;
    }
  
    // method that generates a random color
    getColor() {
      let rgb = Array.from(
        {
          length: 3
        },
        () => Math.round(255 * Math.random())
      );
      rgb[3] = Math.random() + 0.05; // à->1
      return `rgba(${rgb.join(",")})`;
    }
  }
  
  class Rectangle extends Shape {
    constructor([P1, P2, P3, P4]) {
      super([P1, P2, P3, P4]);
    }
  
    static construct({ x, y }, side_a, side_b) {
      let points = [
        { x, y },
        Point.construct(x + side_a, y),
        Point.construct(x + side_a, y + side_b),
        Point.construct(x, y + side_b)
      ];
      return new Rectangle(points);
    }
  }
  
  Rectangle.construct(Point.construct(100,100), 200, 100).draw();
  Rectangle.construct(Point.construct(120,200), 20, 40).draw();
  Rectangle.construct(Point.construct(260,200), 20, 40).draw();
  Shape.construct(Point.construct(120,120),Point.construct(100,50),Point.construct(50,100)).draw();
  Shape.construct(Point.construct(310,120),Point.construct(320,40),Point.construct(300,120)).draw();
  