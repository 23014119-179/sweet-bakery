import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from './AdminLayout';
import { cakesService } from '@/services/cakesService';
import { adminService, CreateCakeData } from '@/services/adminService';
import { Cake } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categories: Cake['category'][] = ['birthday', 'wedding', 'custom', 'cupcakes', 'seasonal'];

const initialFormData: CreateCakeData = {
  name: '',
  description: '',
  price: 0,
  image: '',
  category: 'birthday',
  featured: false,
  available: true,
  customizableOptions: {
    sizes: ['6 inch', '8 inch', '10 inch'],
    flavors: ['Vanilla', 'Chocolate', 'Red Velvet'],
    frostings: ['Buttercream', 'Cream Cheese', 'Fondant'],
  },
};

export default function AdminCakes() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCake, setEditingCake] = useState<Cake | null>(null);
  const [formData, setFormData] = useState<CreateCakeData>(initialFormData);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: cakesResponse, isLoading } = useQuery({
    queryKey: ['cakes'],
    queryFn: () => cakesService.getAll(),
  });

  const cakes = cakesResponse?.data ?? [];

  const createMutation = useMutation({
    mutationFn: adminService.createCake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cakes'] });
      toast({ title: 'Cake created successfully' });
      handleCloseDialog();
    },
    onError: () => {
      toast({ title: 'Failed to create cake', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCakeData }) =>
      adminService.updateCake(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cakes'] });
      toast({ title: 'Cake updated successfully' });
      handleCloseDialog();
    },
    onError: () => {
      toast({ title: 'Failed to update cake', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteCake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cakes'] });
      toast({ title: 'Cake deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete cake', variant: 'destructive' });
    },
  });

  const handleCloseDialog = () => {
    setIsOpen(false);
    setEditingCake(null);
    setFormData(initialFormData);
  };

  const handleEdit = (cake: Cake) => {
    setEditingCake(cake);
    setFormData({
      name: cake.name,
      description: cake.description,
      price: cake.price,
      image: cake.image,
      category: cake.category,
      featured: cake.featured,
      available: cake.available,
      customizableOptions: cake.customizableOptions,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCake) {
      updateMutation.mutate({ id: editingCake._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this cake?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Cakes</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setFormData(initialFormData)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Cake
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCake ? 'Edit Cake' : 'Add New Cake'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: parseFloat(e.target.value) })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="image">Image Path</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="/cake-chocolate.jpg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: Cake['category']) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, featured: checked })
                      }
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="available"
                      checked={formData.available}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, available: checked })
                      }
                    />
                    <Label htmlFor="available">Available</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {editingCake ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cakes.map((cake) => (
                <TableRow key={cake._id}>
                  <TableCell className="font-medium">{cake.name}</TableCell>
                  <TableCell className="capitalize">{cake.category}</TableCell>
                  <TableCell>${cake.price.toFixed(2)}</TableCell>
                  <TableCell>{cake.featured ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{cake.available ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(cake)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(cake._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
