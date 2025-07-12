'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: user?.university || '',
    address: user?.address || '',
  });

  const handleSave = () => {
    // Save updated data (replace with API call)
    console.log('Updated Data:', formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-slate-800">
            My Profile
          </CardTitle>
        </CardHeader>

        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="University Name"
                value={formData.university}
                onChange={e =>
                  setFormData({ ...formData, university: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Current Address"
                value={formData.address}
                onChange={e =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <Button onClick={handleSave} className="w-full">
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="space-y-3 text-slate-700">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>University:</strong> {formData.university}
              </p>
              <p>
                <strong>Address:</strong> {formData.address}
              </p>
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full mt-4"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
