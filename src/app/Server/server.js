const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { ObjectId } = require('mongodb');




const app = express();
app.use(cors());
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const URI = 'mongodb+srv://juneidshaikh18:JSnre5zxCx1JFqeP@cluster0.jio9xet.mongodb.net/Noor';

const URI = 'mongodb+srv://juneidshaikh18:SX6ACX3LvWyH2k1a@cluster0.jio9xet.mongodb.net/Noor';
mongoose.connect(URI);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  password: String,
  DOB: String,
  address: String,
  gender: String,
});
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const Post = mongoose.model('Post', {
  title: String,
  details: String,
  price: String,
  category: [String],
  imagePath: String,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/posts', upload.single('image'), async (req, res) => {
  try {
    const { title, details, price, category } = req.body;
    const imagePath = req.file ? req.file.filename : '';

    const post = new Post({ title, details, price, category, imagePath });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const Users = mongoose.model('users', userSchema);

app.use(express.json());


app.post('/register', async (req, res) => {
  try {
    const newUser = new Users(req.body);
    await newUser.save();
    console.log('User registered successfully');
    // console.log(newUser);
    res.status(200).json({ redirectTo: 'http://localhost:3000/Registration' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/deleteproduct', async (req, res) => {
  try {
    const { productID } = req.body;

    await Post.findByIdAndDelete(productID);
    
    console.log('Product deleted successfully');
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const matchemail = await Users.findOne({ email });

    const userinfo = {
      objectId: matchemail._id,
      name: matchemail.name,
      email: matchemail.email,
    };

    if (matchemail === null) {
      console.log('No user found with the provided email');
    }

    if (matchemail.password === password) {
      console.log('Login Successful');
      return res.status(200).json({ success: true, message: 'Login Successful', userinfo });
    } else {
      return res.status(401).json({ success: false, error: 'Invalid Password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error.message);
    return res.json({ success: false });
  } finally {
    console.log('Finished');
  }
});

const AdminLogin = mongoose.model('AdminLogin', {
  email: String,
  password: String,
});
app.post('/adminlogin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const matchemail = await AdminLogin.findOne({ email });

    if (!matchemail) {
      console.log('No user found with the provided email');
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // For demo purposes, I'm using simple comparison:
    if (matchemail.password !== password) {
      console.log('Invalid Password');
      return res.status(401).json({ success: false, error: 'Invalid Password' });
    }

    console.log('Login Successful');
    return res.status(200).json({ success: true, message: 'Login Successful', userinfo: matchemail });

  } catch (error) {
    console.error('Error logging in user:', error.message);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    console.log('Finished');
  }
});




app.get('/users', async (req , res) => {
  try {
    const users = await Users.find();
    // console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.log('Error Message to fetch Users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/products', async (req, res) => {
  try {
    const products = await Post.find();
    // console.log('Products:', products);
    res.status(200).json(products);
  } catch (error) {
    console.log('Error Message to fetch products : ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/edit', async (req,res) => {
  try {
    const formData = req.body;

    // console.log('Received edit request:', req.body);
    const response = await Post.findOneAndUpdate(
      { _id: formData.id},
      { $set: formData },
      { new: true }
    );
    console.log(response);
    // console.log(response);
    res.status(200).json({ success: true, message: 'Data successfully updated' });
  } catch (error) {
    console.log("Error To edit the data", error);
    res.status(500).json({error: 'Internal Edit Section Error'})
  }
})


app.delete('/delete/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    // console.log(postId);

    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    // Find and delete the post by ID
    const result = await Post.deleteOne({ _id: ObjectId(postId) });

    if (result.deletedCount === 1) {
      return res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } else {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


const Order = mongoose.model('Order', {
  orderId: String,
  title: String,
  price: String,
  image: String,
  name: String,
  email: String,
  address: String,
  city: String,
  quantity: String,
  zipcode: String,
  userId:String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', {
  cartID: String,
  title: String,
  category: String,
  image: String,
  detail: String,
  price: String,
  userId: String
});

const ContactUs = mongoose.model('contactus', {
  name: String,
  email: String,
  phone: String,
  message: String,
});

const FeedBack = mongoose.model('feedback', {
  name: String,
  email: String,
  message: String,
});

app.post('/order', async (req,res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    console.log('Order Added successfully');
    console.log(newOrder);
    res.status(200).json({ redirectTo: 'http://localhost:3000/Home' });
  } catch (error) {
    console.error('Error Inserting Order:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/cart', async (req,res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    console.log('cart Added successfully');
    console.log(cart);
  } catch (error) {
    console.error('Error Inserting Order:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/deletecart', async (req, res) => {
  try {
    const { itemId } = req.body;

    // Check if itemId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: 'Invalid itemId' });
    }

    // Find and delete the cart item
    const deletedItem = await Cart.findByIdAndDelete(itemId);
    
    // Check if the item was found and deleted
    if (!deletedItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    console.log('Product deleted from the cart successfully');
    res.status(200).json({ message: 'Product deleted from cart successfully' });
  } catch (error) {
    console.error('Error deleting from the cart product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/deleteuserorder', async (req, res) => {
  try {
    const { itemId } = req.body;

    // Check if itemId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: 'Invalid itemId' });
    }

    // Find and delete the cart item
    const deletedItem = await Order.findByIdAndDelete(itemId);
    
    // Check if the item was found and deleted
    if (!deletedItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    console.log('Product deleted from the cart successfully');
    res.status(200).json({ message: 'Product deleted from cart successfully' });
  } catch (error) {
    console.error('Error deleting from the cart product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/contact', async (req, res) => {
  try {
    const message = new ContactUs(req.body);
    await message.save();
    console.log('Message Added successfully');
    // console.log(message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error Inserting Message:', error); // Change 'err' to 'error'
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/feedback', async (req, res) => {
  try {
    const feedback = new FeedBack(req.body);
    await feedback.save();
    console.log('Feedback Added successfully');
    console.log(message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error Inserting Message:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/feedbackmsg', async (req , res) => {
  try {
    const message = await FeedBack.find();
    // console.log(message);
    res.status(200).json(message);
  } catch (error) {
    console.log('Error Message to fetch Feedback message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/findcart', async (req , res) => {
  try {
    const { userId } = req.query; 
    const matchUserCart = await Cart.find({ userId });

    if (!matchUserCart || matchUserCart.length === 0) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Prepare the cart data to send back to the client
    const findCart = matchUserCart.map(item => ({
      cartID: item._id,
      title: item.title,
      image: item.image,
      price: item.price,
    }));

    res.status(200).json(findCart);
  } catch (error) {
    console.log('Error fetching findcart message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/finduserorder', async (req , res) => {
  try {
    const { userId } = req.query; 
    const matchUserCart = await Order.find({ userId });

    if (!matchUserCart || matchUserCart.length === 0) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Prepare the cart data to send back to the client
    const findOrder = matchUserCart.map(item => ({
      orderID: item._id,
      title: item.title,
      image: item.image,
      price: item.price,
    }));

    res.status(200).json(findOrder);
  } catch (error) {
    console.log('Error fetching findcart message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/findorder', async (req , res) => {
  try {
    const order = await Order.find();
    // console.log(message);
    res.status(200).json(order);
  } catch (error) {
    console.log('Error Message to fetch Contactus message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/contactusmsg', async (req , res) => {
  try {
    const message = await ContactUs.find();
    // console.log(message);
    res.status(200).json(message);
  } catch (error) {
    console.log('Error Message to fetch Contactus message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
