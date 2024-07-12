import dot from '../../storage/client/utils/dot.js'

let obj = {
  t1: "top",
  foo: {
    bar: {
      baz: "hello"
    },
    counts: [
      {
        ray: "sting",
        say: "car"
       },
      {
        ray: "gun",
        more: {
          say: "store"
        }
       }
    ]
  }
}

console.log("t1 = " + dot.get(obj, "t1"));
console.log("baz = " + dot.get(obj, "foo.bar.baz"));

console.log("ray = " + JSON.stringify(dot.get(obj, "foo.counts.ray=sting")))
console.log("say = " + dot.get(obj, "foo.counts.ray=gun.more.say"))

console.log("biz = " + dot.get(obj, "foo.bar.biz"));
console.log("set: " + dot.set(obj, "foo.bar.biz", "world"));
console.log("biz = " + dot.get(obj, "foo.bar.biz"));

console.log("set: " + dot.set(obj, "t2", "bottom"));
console.log("t2 = " + dot.get(obj, "t2"));

console.log("set: " + dot.set(obj, "foo.level.expand", true));
console.log("expand = " + dot.get(obj, "foo.level.expand"));
console.log("set: " + dot.set(obj, "foo.level", "II"));
console.log("expand = " + dot.get(obj, "foo.level.expand"));

let slop = "stringy";
console.log("stray = " + dot.get(slop, "foo.stray"));
console.log("set = " + dot.set(slop, "foo.stray", "drip"));

console.log(JSON.stringify(obj,null,2));
