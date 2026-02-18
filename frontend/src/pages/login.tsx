import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <Link href="/" className="mb-8 flex flex-col items-center gap-2 group">
        <div className="bg-primary/10 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
           <img src="/logo.png" alt="HomeSync" className="h-10 w-auto" />
        </div>
        <span className="font-heading font-bold text-2xl text-foreground">HomeSync</span>
      </Link>

      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
               <Label htmlFor="password">Password</Label>
               <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
            </div>
            <Input id="password" type="password" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Button className="w-full text-md py-5" size="lg">
            Sign in
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Link href="/">
             <Button variant="outline" className="w-full">
               Continue as Guest
             </Button>
          </Link>
          <p className="text-center text-xs text-muted-foreground mt-2">
             Don't have an account? <a href="#" className="text-primary hover:underline font-medium">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}