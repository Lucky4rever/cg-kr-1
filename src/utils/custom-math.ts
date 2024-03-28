class CustomMath {
  public static readonly PI = Math.PI;
  private static width: number = window.innerWidth;
  private static height: number = window.innerHeight;
  public static horizontalRadius: number = 1;
  public static verticalRadius: number = 1;

  static radians = (angle: number) => (angle * this.PI) / 180;

  static setCustomLenghts(widhh: number, height: number) {
    this.width = widhh;
    this.height = height;
  }

  static cos(angleInRadians: number): number {
    return Math.cos(angleInRadians);
    // return Math.cos(angleInRadians) * this.horizontalRadius;
  }

  static sin(angleInRadians: number): number {
    return Math.sin(angleInRadians);
    // return Math.sin(angleInRadians) * this.verticalRadius;
  }
}

export default CustomMath;
