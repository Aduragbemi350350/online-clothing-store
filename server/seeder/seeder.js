// 1 USERS
export const users = [
  {
    username: "adminUser",
    email: "admin@example.com",
    role: "admin"
  },
  {
    username: "john_doe",
    email: "john@example.com",
    role: "user"
  },
  {
    username: "mary_jane",
    email: "mary@example.com",
    role: "user"
  }
];

// 2 PRODUCTS
export const products = [
  {
    name: "Blue Ankara Gown",
    description: "Elegant blue Ankara gown for all occasions.",
    category: "ankara",
    price: 15000,
    // will assign createdBy after seeding users
  },
  {
    name: "Classic White Shirt",
    description: "Premium cotton shirt suitable for formal wear.",
    category: "shirt",
    price: 8000
  }
];

// 3 REVIEWS
export const reviews = [
  {
    comment: "Absolutely love this gown!",
    reaction: "like",
    rating: 5
    // will assign user and product after seeding users & products
  },
  {
    comment: "Nice material but a bit expensive.",
    reaction: "dislike",
    rating: 3
  }
];

// 4 ORDERS
export const orders = [
  {
    // will assign user after seeding
    products: [
      { quantity: 2, price: 15000 },
      { quantity: 1, price: 8000 }
    ],
    checkoutCost: 38000
  }
];

// 5 CARTS
export const carts = [
  {
    // will assign user after seeding
    products: [
      { quantity: 1, price: 8000 }
    ]
  }
];

export {users, products, reviews, carts, orders}
