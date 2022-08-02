function example(x:string | number , y: string | boolean) {
  if (x===y) {
    x.toUpperCase()
    y.toLowerCase()
  }
  else{
    console.log(x);
    console.log(y);
  }
}
example("yjf","YJF")