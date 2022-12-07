function replacer(key, value) {
  if (value instanceof Map) {
    return {
      type: 'Map',
      data: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else if (value instanceof Set) {
    return {
      type: 'Set',
      data: [ ...value ]
    }
  } else {
    return value;
  }
}

function reviver(key, value) {
  if (typeof value === 'object' && value !== null) {
    if (value.type === 'Map') {
      return new Map(value.data);
    }
    else if (value.type === 'Set') {
      return new Set(value.data);
    }
  }
  return value;
}

function test_1() {
  console.log("test_1")
  const originalValue = new Map([
    [ "one", "this is one" ],
    [ "two", 200 ],
    [ "three", {
      name: "tubby",
      attitude: "jovial"
    } ],
    [ "four", new Set([ "a", "b", "c" ]) ]
  ])
  console.log(originalValue);

  const str = JSON.stringify(originalValue, replacer);
  console.log(str)

  const newValue = JSON.parse(str, reviver);
  console.log(newValue);

  console.log(" ");
}

function test_2() {
  console.log("test_2")
  const originalValue = new Map([ [ 'a', 1 ] ]);
  console.log(originalValue);

  const str = JSON.stringify(originalValue, replacer);
  console.log(str)

  const newValue = JSON.parse(str, reviver);
  console.log(newValue);
  console.log(" ");
}

function test_3() {
  console.log("test_3")
  // Deep nesting with combination of Arrays, Objects and Maps

  const originalValue = [
    new Map([ [ 'a', {
      b: {
        c: new Map([ [ 'd', 'text' ] ])
      }
    } ] ])
  ];
  console.log(originalValue);

  const str = JSON.stringify(originalValue, replacer);
  console.log(str)
  
  const newValue = JSON.parse(str, reviver);
  console.log(newValue);
  console.log(" ");
}

test_1()
test_2()
test_3()
