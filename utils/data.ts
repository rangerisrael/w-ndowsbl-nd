import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Israel Alisoso',
      password: bcrypt.hashSync('Onwc!SN'),
      email: 'israel@gmail.com',
      verify: true,
      role: 'admin',
    },
    {
      name: 'Rael Iva Ososila',
      password: bcrypt.hashSync('real!SN'),
      email: 'devisrael28@gmail.com',
      verify: true,
      role: 'seller',
    },
    {
      name: 'Israel Ali',
      password: bcrypt.hashSync('isra!SN'),
      email: 'rael@gmail.com',
      verify: true,
      role: 'deliverer',
    },
    {
      name: 'Rael Israel',
      password: bcrypt.hashSync('rael!SN'),
      email: 'israelali@gmail.com',
      verify: true,
      role: 'buyer',
    },
  ],
  products: [
    {
      name: 'Checker',
      slug: 'checker',
      category: 'Checker',
      image: '/resources/checker.jpg',
      price: 120,
      brand: 'Curtain Plastic',
      rating: 4.5,
      numReviews: 16,
      countInStock: 10,
      description: 'This good product, just get it in affordable price',
    },
    {
      name: 'Cresendo',
      slug: 'cresendo',
      category: 'Cresendo',
      image: '/resources/cresendo.jpg',
      price: 200,
      brand: 'Curtain Steel',
      rating: 5,
      numReviews: 23,
      countInStock: 20,
      description: 'Buy it you dont regret cuz its smooth and  you can get it in affortable price',
    },
    {
      name: 'Curves',
      slug: 'curves',
      category: 'Curves',
      image: '/resources/curves.jpg',
      price: 100,
      brand: 'Curtain Wood',
      rating: 4,
      numReviews: 12,
      countInStock: 35,
      description: 'If you wanted good diplay in your house this is fit for you',
    },

    {
      name: 'Izmir',
      slug: 'izmir',
      category: 'Izmir',
      image: '/resources/izmir.jpg',
      price: 120,
      brand: 'curtain flex',
      rating: 4.5,
      numReviews: 8,
      countInStock: 10,
      description: 'This good and get it in affordable price',
    },

    {
      name: 'Linen',
      slug: 'linen',
      category: 'Linen',
      image: '/resources/linen.jpg',
      price: 110,
      brand: 'Curtain  Wood',
      rating: 4.5,
      numReviews: 6,
      countInStock: 32,
      description: 'Finding a neat and nicer look this best for you',
    },

    {
      name: 'Mono',
      slug: 'mono',
      category: 'Mono',
      image: '/resources/mono.jpg',
      price: 110,
      brand: 'Curtain Wood',
      rating: 3,
      numReviews: 5,
      countInStock: 21,
      description: 'simple but amazing design',
    },

    {
      name: 'Pinova',
      slug: 'pinova',
      category: 'Pinova',
      image: '/resources/pinova.jpg',
      price: 170,
      brand: 'Curtain Foam',
      rating: 5,
      numReviews: 10,
      countInStock: 50,
      description: 'This good and get it in affordable price',
    },

    {
      name: 'Pleast and Twist',
      slug: 'pleast-twist',
      category: 'PleastandTwist',
      image: '/resources/pleastandtwist.jpg',
      price: 190,
      brand: 'Curtain Straw',
      rating: 5,
      numReviews: 34,
      countInStock: 40,
      description: 'A plastic display design a better look in our eyes',
    },

    {
      name: 'Silk',
      slug: 'silk',
      category: 'Silk',
      image: '/resources/silk.jpg',
      price: 150,
      brand: 'Curtain Wood',
      rating: 4.5,
      numReviews: 23,
      countInStock: 15,
      description: 'If you thinking its a shampoo your wrong its a wood curtain design',
    },
  ],
};

export default data;
