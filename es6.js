


if ( true )
{
	let b = 2;
}

var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
console.log( foo );
var { x = 3 } = {};
console.log ( x );
function bb(  { a = "231", b = "sdsss" } )
{
	console.log( a );
	console.log( b );
	console.log( window.d );
	return [a, b];
}
let [c, d ] = bb( { b:"aaaaa" } );
console.log( c, d  );
/*bb cannot be bb() but ccc() is ok;*/
function ccc ( {a = "cccc", d ="ddddddd"} = {} ) 
{
	console.log( a );
	console.log( d );
}
ccc( { d: " 213213"} );

ccc();

// 字符串中嵌入变量
var name = "Bob", time = "today";
console.log( `Hello ${name}, 
	how are you ${time}?` );

$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);

var total = 30;
var msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals) {
  var result = '';
  var i = 0;

  while (i < literals.length) {
  	console.log( literals[i]);
    result += literals[i++];    //  arguments[0] = { 0 : "The total is " 1 : " (" 2 : " with tax)" };
    if (i < arguments.length) {
      result += arguments[i];   //	arguments[1] = ${total}, argumens[2] = ${total*1.05}.
    }
  }

  return result;
}

console.log( msg ); // "The total is 30 (31.5 with tax)"



function throwIfMissing() {
  throw new Error('Missing parameter');
}

function funccc ( mustBeProvided = throwIfMissing() ) {
  return mustBeProvided;
}

//funccc();


let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

console.log( map.keys() ); // MapIterator {1, 2, 3}

let arr = [...map.keys()]; // [1, 2, 3]
console.log( arr );


const square = n => n * n; // const square = function(n){return n*n;};
console.log( square(3) );


function objExtent( x, y )
{
	return {x,y};
}
console.log( objExtent( 2 , 3 ).x );


/* getter and setter */
var cart = {
  _wheels: 4,

  get wheels () {
    return this._wheels;
  },

  set wheels (value) {
    if ( value < this._wheels ) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}

console.log( cart.wheels );
cart.wheels = 8;
console.log( cart.wheels );

/* generator */

function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

console.log( hw.next() );

/* promise */

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});