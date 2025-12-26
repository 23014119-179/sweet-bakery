import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Package, Settings, ShoppingBag, User } from 'lucide-react';

// Mock data for demonstration
const mockOrders = [
  {
    id: 'ORD-001',
    cakeName: 'Classic Chocolate Dream',
    date: '2024-01-15',
    status: 'delivered',
    total: 65.00,
    size: '8 inch',
    flavor: 'Dark Chocolate',
  },
  {
    id: 'ORD-002',
    cakeName: 'Vanilla Blossom',
    date: '2024-01-20',
    status: 'preparing',
    total: 55.00,
    size: '6 inch',
    flavor: 'French Vanilla',
  },
  {
    id: 'ORD-003',
    cakeName: 'Rainbow Celebration',
    date: '2024-01-25',
    status: 'pending',
    total: 75.00,
    size: '10 inch',
    flavor: 'Funfetti',
  },
];

const statusColors: Record<string, string> = {
  pending: 'bg-accent text-accent-foreground',
  preparing: 'bg-primary text-primary-foreground',
  delivered: 'bg-secondary text-secondary-foreground',
};

const Dashboard = () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    memberSince: 'January 2024',
  };

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                My Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your orders and account settings
              </p>
            </div>
            <Link to="/cakes">
              <Button className="mt-4 md:mt-0">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Order New Cake
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList>
              <TabsTrigger value="orders">
                <Package className="mr-2 h-4 w-4" />
                My Orders
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    View and track your cake orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockOrders.length > 0 ? (
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border bg-card"
                        >
                          <div className="space-y-1 mb-4 sm:mb-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">
                                {order.cakeName}
                              </span>
                              <Badge className={statusColors[order.status]}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.size} • {order.flavor}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {order.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-primary">
                              ${order.total.toFixed(2)}
                            </span>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">
                        You haven't placed any orders yet.
                      </p>
                      <Link to="/cakes">
                        <Button>Browse Cakes</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Your personal details and account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {mockUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {mockUser.name}
                      </h3>
                      <p className="text-muted-foreground">{mockUser.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Member since {mockUser.memberSince}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <h4 className="font-medium text-foreground">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about your orders
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <h4 className="font-medium text-foreground">Change Password</h4>
                      <p className="text-sm text-muted-foreground">
                        Update your account password
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/50">
                    <div>
                      <h4 className="font-medium text-destructive">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and data
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
