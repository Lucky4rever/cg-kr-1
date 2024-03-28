import CustomMath from "@/utils/custom-math";

class MatrixAnimation {
  private matrix: number[];

  constructor(matrix: number[]) {
    this.matrix = matrix;
  }

  rotate(angleInRadians: number): number[] {
    let cos = CustomMath.cos(angleInRadians);
    let sin = CustomMath.sin(angleInRadians);

    // console.log(cos, sin);

    for (let i = 0; i < this.matrix.length; i += 3) {
      let x = this.matrix[i];
      let y = this.matrix[i + 1];

      this.matrix[i] = x * cos - y * sin;
      this.matrix[i + 1] = x * sin + y * cos;
    }

    return this.matrix;
  }

  hover(deviation: number, angleInRadians: number) {
    let sin = CustomMath.sin(angleInRadians);

    for (let i = 0; i < this.matrix.length; i += 3) {
      let x = this.matrix[i];
      let y = this.matrix[i + 1];

      this.matrix[i] = x;
      this.matrix[i + 1] =  y + deviation * sin;
    }

    return this.matrix;
  }
}

export default MatrixAnimation;
