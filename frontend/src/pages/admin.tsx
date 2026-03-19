import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AdminUser = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: "buyer" | "realtor" | "collaborator" | "admin";
  isActive: boolean;
  createdAt: string;
};

const ROLE_OPTIONS: AdminUser["userType"][] = [
  "buyer",
  "realtor",
  "collaborator",
  "admin",
];

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Admin · HomeSync";
    void loadUsers();
  }, []);

  async function loadUsers() {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/users", { credentials: "include" });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.message ?? "Unable to load users.");
      }
      const payload = (await res.json()) as AdminUser[];
      setUsers(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load users.");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateUser(userId: number, patch: Partial<AdminUser>) {
    const actionKey = `${userId}:${JSON.stringify(patch)}`;
    setPendingAction(actionKey);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.message ?? "Unable to update user.");
      }
      const payload = (await res.json()) as { user: AdminUser };
      setUsers((current) =>
        current.map((user) => (user.userId === userId ? payload.user : user)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update user.");
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 max-w-6xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin</h1>
          <p className="text-muted-foreground mt-1">
            Manage user roles and account access.
          </p>
        </div>
        <Button variant="outline" onClick={() => void loadUsers()} disabled={isLoading}>
          Refresh
        </Button>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? <p className="text-sm text-muted-foreground">Loading users...</p> : null}
          {!isLoading && users.length === 0 ? (
            <p className="text-sm text-muted-foreground">No users found.</p>
          ) : null}
          {!isLoading
            ? users.map((user) => (
                <div
                  key={user.userId}
                  className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Status: {user.isActive ? "Active" : "Disabled"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className="h-9 rounded-md border bg-background px-2 text-sm capitalize"
                      value={user.userType}
                      onChange={(e) =>
                        void updateUser(user.userId, {
                          userType: e.target.value as AdminUser["userType"],
                        })
                      }
                      disabled={pendingAction !== null}
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role} className="capitalize">
                          {role}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant={user.isActive ? "destructive" : "secondary"}
                      onClick={() =>
                        void updateUser(user.userId, { isActive: !user.isActive })
                      }
                      disabled={pendingAction !== null}
                    >
                      {pendingAction ? "Saving..." : user.isActive ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </div>
              ))
            : null}
        </CardContent>
      </Card>
    </div>
  );
}
