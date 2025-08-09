// src/api/mockApi.js

const mockUsers = [
  { id: 1, name: 'Alaa Sameh', email: 'admin@medicalrep.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Omar M. Ahmed', email: 'rep@medicalrep.com', password: 'rep123', role: 'medical_rep' },
  { id: 3, name: 'Yoana Youssif', email: 'yoana@medicalrep.com', password: 'rep123', role: 'medical_rep' }
];

const mockClients = [
  { id: 101, name: 'Dr. Karim Mahmoud Clinic', specialty: 'Cardiology', address: '15 Abbas El Akkad St, Nasr City, Cairo' },
  { id: 102, name: 'Al-Salam Hospital', specialty: 'General Hospital', address: 'Road 9, Maadi, Cairo' },
  { id: 103, name: 'Dr. Fatima Ali Dermatology', specialty: 'Dermatology', address: '55 El Hegaz St, Heliopolis, Cairo' },
  { id: 104, name: 'El-Gendy Optics', specialty: 'Ophthalmology', address: '26th of July Corridor, Zamalek, Cairo' }
];

const mockTasks = [
  // Tasks for Omar M. Ahmed (rep id: 2)
  { 
    id: 1, 
    title: 'Product Presentation at Cardiology Clinic', 
    description: 'Present new cardiac medication line to Dr. Karim Mahmoud',
    clientId: 101, 
    clientName: 'Dr. Karim Mahmoud Clinic',
    assignedRepId: 2, 
    status: 'pending', 
    priority: 'high', 
    dueDate: new Date().toISOString().split('T')[0], // Today
    createdDate: '2024-01-15'
  },
  { 
    id: 2, 
    title: 'Follow-up Visit - Al-Salam Hospital', 
    description: 'Check on previous order status and discuss new products',
    clientId: 102, 
    clientName: 'Al-Salam Hospital',
    assignedRepId: 2, 
    status: 'pending', 
    priority: 'medium', 
    dueDate: '2024-01-20',
    createdDate: '2024-01-10'
  },
  { 
    id: 3, 
    title: 'Dermatology Product Demo', 
    description: 'Demonstrate new skincare product line',
    clientId: 103, 
    clientName: 'Dr. Fatima Ali Dermatology',
    assignedRepId: 2, 
    status: 'completed', 
    priority: 'medium', 
    dueDate: '2024-01-12',
    createdDate: '2024-01-05'
  },
  { 
    id: 4, 
    title: 'Monthly Report Submission', 
    description: 'Submit monthly sales and visit report',
    clientId: null, 
    clientName: 'Internal Task',
    assignedRepId: 2, 
    status: 'pending', 
    priority: 'low', 
    dueDate: '2024-01-25',
    createdDate: '2024-01-01'
  },
  { 
    id: 8, 
    title: 'Product Sample Distribution', 
    description: 'Distribute new product samples to key clients',
    clientId: 102, 
    clientName: 'Al-Salam Hospital',
    assignedRepId: 2, 
    status: 'in_progress', 
    priority: 'medium', 
    dueDate: '2024-01-18',
    createdDate: '2024-01-12'
  },
  { 
    id: 5, 
    title: 'Eye Care Product Training', 
    description: 'Complete training session on new ophthalmology products',
    clientId: 104, 
    clientName: 'El-Gendy Optics',
    assignedRepId: 2, 
    status: 'completed', 
    priority: 'high', 
    dueDate: '2024-01-08',
    createdDate: '2024-01-02'
  },
  // Tasks for Yoana Youssif (rep id: 3)
  { 
    id: 6, 
    title: 'Hospital Equipment Demo', 
    description: 'Present new medical equipment to hospital staff',
    clientId: 102, 
    clientName: 'Al-Salam Hospital',
    assignedRepId: 3, 
    status: 'pending', 
    priority: 'high', 
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    createdDate: '2024-01-14'
  },
  { 
    id: 7, 
    title: 'Client Relationship Review', 
    description: 'Review client satisfaction and feedback',
    clientId: 103, 
    clientName: 'Dr. Fatima Ali Dermatology',
    assignedRepId: 3, 
    status: 'completed', 
    priority: 'low', 
    dueDate: '2024-01-10',
    createdDate: '2024-01-05'
  }
];

const mockProducts = [
  { 
    id: 1, 
    name: 'CardioMax 50mg', 
    category: 'Cardiovascular', 
    description: 'Advanced cardiac medication for hypertension treatment',
    price: 125.99,
    stock: 150,
    manufacturer: 'PharmaCorp Ltd',
    expiryDate: '2025-12-31'
  },
  { 
    id: 2, 
    name: 'DermaClear Cream', 
    category: 'Dermatology', 
    description: 'Topical treatment for eczema and skin conditions',
    price: 89.50,
    stock: 75,
    manufacturer: 'SkinMed Industries',
    expiryDate: '2025-08-15'
  },
  { 
    id: 3, 
    name: 'VisionPlus Eye Drops', 
    category: 'Ophthalmology', 
    description: 'Lubricating eye drops for dry eye syndrome',
    price: 45.25,
    stock: 200,
    manufacturer: 'EyeCare Solutions',
    expiryDate: '2025-06-30'
  },
  { 
    id: 4, 
    name: 'PainRelief 200mg', 
    category: 'General Medicine', 
    description: 'Fast-acting pain relief tablets',
    price: 35.75,
    stock: 300,
    manufacturer: 'MediCore Pharmaceuticals',
    expiryDate: '2025-10-20'
  }
];

const mockOrders = [
  {
    id: 1001,
    clientId: 101,
    clientName: 'Dr. Karim Mahmoud Clinic',
    repId: 2,
    repName: 'Omar M. Ahmed',
    products: [
      { productId: 1, productName: 'CardioMax 50mg', quantity: 50, unitPrice: 125.99 },
      { productId: 4, productName: 'PainRelief 200mg', quantity: 100, unitPrice: 35.75 }
    ],
    totalAmount: 9874.50,
    status: 'delivered',
    orderDate: '2024-01-10',
    deliveryDate: '2024-01-15'
  },
  {
    id: 1002,
    clientId: 103,
    clientName: 'Dr. Fatima Ali Dermatology',
    repId: 2,
    repName: 'Omar M. Ahmed',
    products: [
      { productId: 2, productName: 'DermaClear Cream', quantity: 25, unitPrice: 89.50 }
    ],
    totalAmount: 2237.50,
    status: 'pending',
    orderDate: '2024-01-18',
    deliveryDate: null
  },
  {
    id: 1003,
    clientId: 104,
    clientName: 'El-Gendy Optics',
    repId: 3,
    repName: 'Yoana Youssif',
    products: [
      { productId: 3, productName: 'VisionPlus Eye Drops', quantity: 75, unitPrice: 45.25 }
    ],
    totalAmount: 3393.75,
    status: 'processing',
    orderDate: '2024-01-16',
    deliveryDate: '2024-01-22'
  }
];

const mockSalesReports = [
  {
    id: 'SR001',
    repId: 2,
    repName: 'Omar M. Ahmed',
    month: 'January 2024',
    totalSales: 12112.00,
    ordersCount: 2,
    clientsVisited: 3,
    newClients: 1,
    targetAchievement: 85.5,
    topProducts: ['CardioMax 50mg', 'PainRelief 200mg']
  },
  {
    id: 'SR002',
    repId: 3,
    repName: 'Yoana Youssif',
    month: 'January 2024',
    totalSales: 3393.75,
    ordersCount: 1,
    clientsVisited: 2,
    newClients: 0,
    targetAchievement: 42.4,
    topProducts: ['VisionPlus Eye Drops']
  }
];

// --- Core Functions ---

export const initializeData = () => {
  console.log('🔧 initializeData called');
  
  // Force re-initialization to ensure data is always fresh
  // This solves potential localStorage corruption or clearing issues
  console.log('📝 Force initializing users in localStorage');
  localStorage.setItem('users', JSON.stringify(mockUsers));
  
  console.log('📝 Force initializing clients in localStorage');
  localStorage.setItem('clients', JSON.stringify(mockClients));
  
  console.log('📝 Force initializing tasks in localStorage');
  localStorage.setItem('tasks', JSON.stringify(mockTasks));
  
  console.log('📝 Force initializing products in localStorage');
  localStorage.setItem('products', JSON.stringify(mockProducts));
  
  console.log('📝 Force initializing orders in localStorage');
  localStorage.setItem('orders', JSON.stringify(mockOrders));
  
  console.log('📝 Force initializing sales reports in localStorage');
  localStorage.setItem('salesReports', JSON.stringify(mockSalesReports));
  
  // Debug: Show what's actually in localStorage
  const storedUsers = localStorage.getItem('users');
  const storedTasks = localStorage.getItem('tasks');
  const storedProducts = localStorage.getItem('products');
  console.log('📋 Users in localStorage:', JSON.parse(storedUsers || '[]'));
  console.log('📋 Tasks in localStorage:', JSON.parse(storedTasks || '[]'));
  console.log('📋 Products in localStorage:', JSON.parse(storedProducts || '[]'));
  
  // Verify data integrity
  const users = JSON.parse(storedUsers || '[]');
  const tasks = JSON.parse(storedTasks || '[]');
  
  if (users.length !== mockUsers.length) {
    console.error('❌ Users data integrity check failed - re-initializing');
    localStorage.setItem('users', JSON.stringify(mockUsers));
  } else {
    console.log('✅ Users data integrity check passed');
  }
  
  if (tasks.length !== mockTasks.length) {
    console.error('❌ Tasks data integrity check failed - re-initializing');
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
  } else {
    console.log('✅ Tasks data integrity check passed');
  }
};

export const apiLogin = async (email, password) => {
  console.log(`🔍 apiLogin called with email: "${email}" and password: "${password}"`);
  
  // Validate inputs
  if (!email || !password) {
    console.log('❌ Missing email or password');
    return { success: false, message: 'Email and password are required' };
  }
  
  // Trim whitespace and normalize inputs
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();
  
  console.log(`🔧 After trimming - email: "${trimmedEmail}" and password: "${trimmedPassword}"`);
  
  // Ensure data is initialized
  initializeData();
  
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  console.log('📋 Retrieved users from localStorage:', users);
  
  // Case-insensitive email matching
  const user = users.find(u => u.email.toLowerCase() === trimmedEmail);
  console.log('👤 Found user by email:', user);

  if (user && user.password === trimmedPassword) {
    console.log('✅ Password match - login successful');
    // Return user without password for security
    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } else {
    console.log('❌ Password mismatch or user not found - login failed');
    console.log(`Expected password: "${user?.password}", Received: "${trimmedPassword}"`);
    console.log(`Email match: ${!!user}, Password match: ${user?.password === trimmedPassword}`);
    
    // Detailed debugging for troubleshooting
    if (!user) {
      console.log('🔍 Available emails:', users.map(u => u.email));
    }
    
    return { success: false, message: 'Invalid credentials' };
  }
};

export const apiLogout = () => {
  localStorage.removeItem('currentUserSession');
};

export const saveSession = (user) => {
  localStorage.setItem('currentUserSession', JSON.stringify(user));
};

export const getSession = () => {
  const session = localStorage.getItem('currentUserSession');
  return session ? JSON.parse(session) : null;
};

export const getClients = async () => {
    const clients = localStorage.getItem('clients');
    return clients ? JSON.parse(clients) : [];
};

export const getTasksByRepId = (repId) => {
    console.log(`🔍 Getting tasks for rep ID: ${repId}`);
    const tasks = localStorage.getItem('tasks');
    const allTasks = tasks ? JSON.parse(tasks) : [];
    
    const repTasks = allTasks.filter(task => task.assignedRepId === repId);
    console.log(`📋 Found ${repTasks.length} tasks for rep ${repId}:`, repTasks);
    
    return repTasks;
};

export const getAllTasks = async () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

export const getProducts = async () => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
};

export const getOrders = async () => {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
};

export const getSalesReports = async () => {
    const salesReports = localStorage.getItem('salesReports');
    return salesReports ? JSON.parse(salesReports) : [];
};

// Summary data for admin dashboard
export const getAdminSummary = async () => {
    const clients = await getClients();
    const products = await getProducts();
    const orders = await getOrders();
    const tasks = await getAllTasks();
    const salesReports = await getSalesReports();
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;
    
    return {
        totalClients: clients.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        pendingOrders: pendingOrders,
        activeReps: salesReports.length,
        completedTasks: completedTasks,
        totalTasks: totalTasks,
        taskCompletionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
};