//count applications

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

//인자 값 123123123이 KEY값이 된다
app.use(cookieParser('dlselrh24'));

var products = {
  1: {
    title: 'The history of web '
  },
  2: {
    title: 'The next web'
  }
};

app.get('/products', function(req, res) {
  var output = ' ';
  for (var name in products) {
    output += `
      <li>
        <a href='/cart/${name}'>${products[name].title}</a>
      </li>`;
  }
  res.send(`
    <h1>Products</h1>
    <ul>${output}</ul>
    <a href='/cart'>Cart</a>`);
});

//request객체에서 signedCookies를 사용하여 cookie에 key값을 부여
app.get('/cart/:id', function(req, res) {
  var id = req.params.id;
  if (req.signedCookies.cart) {
    var cart = req.signedCookies.cart;
  } else {
    var cart = {};
  }
  if (!cart[id]) {
    cart[id] = 0;
  }
  cart[id] = parseInt(cart[id]) + 1;
  res.cookie('cart', cart, {
    signed: true
  });
  res.redirect('/cart');
});

app.get('/cart', function(req, res) {
  var cart = req.signedCookies.cart;
  if (!cart) {
    res.send('empty');
  } else {
    var output = ' ';
    for (var id in cart) {
      output += `<li>${products[id].title} (${cart[id]})</li>`;
    }
  }
  res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Produc ts List</a>
    `);
});

app.get('/count', function(req, res) {
  if (req.signedCookies.count) {
    var count = parseInt(req.signedCookies.count);
  } else {
    var count = 0;
  }
  //응답할 때 보냄 --> response
  res.cookie('count', count + 1, {
    signed: true
  });
  res.send('count : ' + count);
});

app.listen(3000, function() {
  console.log('Connected 3000port');
});
