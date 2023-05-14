var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { v4: uuidv4 } = require("uuid");
const User = require("./database/model");
const Products = require("./database/productModel");
const connectToMongoose = require("./database/connect");
connectToMongoose();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const products = [
  {
    productName: "iWatch",
    description: "aaaaa",
    category: "category1",
    price: 120,
    quantity: 20,
    image: "https://m.media-amazon.com/images/I/51QNrr2cdBL._SX679_.jpg",
  },
  {
    productName: "iphone",
    description: "bbbbb",
    category: "category1",
    price: 820,
    quantity: 10,
    image: "https://m.media-amazon.com/images/I/51QNrr2cdBL._SX679_.jpg",
  },
];
app.get("/allProducts", async (_, res) => {
  const productsFromDataBase = await Products.find({});
  const productList = productsFromDataBase.map(
    ({ productName, description, category, price, quantity, image, id }) => {
      return {
        productName,
        description,
        category,
        price,
        quantity,
        image,
        id,
      };
    }
  );
  res.json(productList);
});
app.post("/addProduct", async (req, res) => {
  if (req.body && req.body.image && req.body.price) {
    const { productName, description, category, price, quantity, image } =
      req.body;
    const newProduct = new Products({
      productName,
      description,
      category,
      price,
      quantity,
      image,
      id: uuidv4(),
    });

    const retValue = await newProduct.save();
    if (newProduct == retValue) {
      res.status(201).json({
        message: "added",
        status: 201,
        newProduct: {
          productName: newProduct.productName,
          description: newProduct.description,
          category: newProduct.category,
          price: newProduct.price,
          quantity: newProduct.quantity,
          image: newProduct.image,
          id: newProduct.id,
        },
      });
    }

    return;
  }
  //error handling
  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
});
app.put("/editProduct", async (req, res) => {
  if (req.body && req.body.id) {
    const id = req.body.id;
    const queryResult = await Products.findOne({ id });

    const { modifiedCount } = await queryResult.updateOne({
      productName: req.body.productName,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.body.image,
    });
    if (!modifiedCount) {
      res.status(404).json({
        message: "update field",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: "update succeed",
    });
    return;
  }
  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
});

app.get("/logout", async (_, res) => {
  const usersFromDataBase = await User.find({});
  const userList = usersFromDataBase.map(({ email, password, cart, id }) => {
    return {
      email,
      password,
      cart,
      id,
    };
  });
  res.json(userList);
});

app.post("/addUser", async (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    const { email, password } = req.body;
    let existUser = await User.exists({ email });
    if (existUser) {
      res.status(406).json({
        error: "Not Acceptable",
        message: "User already exist",
      });
      return;
    }
    const newUser = new User({
      email,
      password,
      id: uuidv4(),
    });
    const retValue = await newUser.save();
    if (newUser == retValue) {
      res.status(201).json({
        message: "user registered",
        status: 201,
        newUser: {
          email: newUser.email,
          password: newUser.password,
          cart: newUser.cart,
          id: newUser.id,
        },
      });
    }
    return;
  }
  res.status(404).json({
    error: "failed",
    message: "input faild",
  });
});

app.post("/login", async (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    const { email, password } = req.body;
    const queryResult = await User.findOne({ email });
    if (queryResult) {
      if (queryResult.password == password) {
        res.status(200).json({
          message: "user logged in",
          status: 200,
          currentUser: {
            email: queryResult.email,
            password: queryResult.password,
            cart: queryResult.cart,
            id: queryResult.id,
          },
        });
      } else {
        res.status(401).json({
          error: "Unauthorized",
          message: "incorrect password",
        });
      }
      return;
    }
    res.status(404).json({
      error: "failed",
      message: "no such user, please sign up",
    });
    return;
  }
  res.status(404).json({
    error: "failed",
    message: "input faild",
  });
});

app.post("/addCart", async (req, res) => {
  if (req.body && req.body.user && req.body.itemAdded && req.body.count) {
    const { user, itemAdded, count } = req.body;
    let cartInfo = {
      itemAdded: itemAdded,
      count: count,
    };
    let currentUser = await User.findOne({ email: user });
    currentUser.cart.push(cartInfo);
    await currentUser.save();
    console.log(currentUser);

    if (
      currentUser.cart[currentUser.cart.length - 1].itemAdded ==
      cartInfo.itemAdded
    ) {
      res.status(201).json({
        message: "cart added",
        status: 201,
      });

      return;
    } else {
      res.status(404).json({
        error: "failed",
        message: "Input is not valid",
      });
    }

    return;
  }

  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
});

app.put("/increment", async (req, res) => {
  if (req.body && req.body.user && req.body.itemAdded) {
    const { user, itemAdded } = req.body;
    let test = 0;
    let currentUser = await User.findOne({ email: user });

    currentUser.cart.forEach((item) => {
      if (item.itemAdded === itemAdded) {
        test = item.count;
        item.count++;
      }
    });
    await currentUser.save();
    let tmp = 0;
    await currentUser.save();
    currentUser.cart.forEach((item) => {
      if (item.itemAdded === itemAdded) {
        tmp = item.count;
      }
    });
    if (tmp === test + 1) {
      res.status(201).json({
        message: "item increment",
        status: 201,
        cartUpdated: { itemAdded: itemAdded, count: test + 1 },
      });

      return;
    } else {
      res.status(404).json({
        error: "failed",
        message: "Input is not valid",
      });
    }
    return;
  }

  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
});

app.put("/decrement", async (req, res) => {
  if (req.body && req.body.user && req.body.itemAdded) {
    const { user, itemAdded } = req.body;
    let test = 0;
    let currentUser = await User.findOne({ email: user });

    currentUser.cart.forEach((item) => {
      if (item.itemAdded === itemAdded) {
        test = item.count;
        if (item.count > 1) {
          item.count--;
        }
      }
    });
    let tmp = 0;
    await currentUser.save();
    currentUser.cart.forEach((item) => {
      if (item.itemAdded === itemAdded) {
        tmp = item.count;
      }
    });
    if (tmp === 1 || tmp === test - 1) {
      res.status(201).json({
        message: "item decrement",
        status: 201,
        cartUpdated: { itemAdded: itemAdded, count: tmp },
      });

      return;
    } else {
      res.status(404).json({
        error: "failed",
        message: "Input is not valid",
      });
    }
    return;
  }

  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
});

app.put("/itemDetail", async (req, res) => {
  if (req.body && req.body.id) {
    const id = req.body.id;
    const queryResult = await Products.findOne({ id });
    if (queryResult) {
      res.status(200).json({
        message: "item founded",
        status: 200,
        itemInfo: {
          productName: queryResult.productName,
          price: queryResult.price,
          image: queryResult.image,
        },
      });
      return;
    } else {
      res.status(404).json({
        error: "failed",
        message: "failed to find the product",
      });
    }
    return;
  }
  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
