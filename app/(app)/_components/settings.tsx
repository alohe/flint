'use client';

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import type { User } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

interface SettingsProps {
  user: User;
}

export default function Settings({ user }: SettingsProps) {
  const [name, setName] = useState(user.name || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateName = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/settings/update-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to update name');
      }

      toast.success('Name updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update name');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent>
      <div className="space-y-4 max-w-lg">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Profile Settings</h2>
          <p className="text-sm text-muted-foreground">
            Update your profile information.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <div className="flex gap-2">
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <Button onClick={handleUpdateName} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  );
}
