'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, GraduationCap, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SignedIn, SignedOut, useUser, UserButton } from '@clerk/nextjs';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Colleges', href: '/colleges' },
    { name: 'Admission', href: '/admission' },
    { name: 'My College', href: '/my-college' },
  ];

  const isActive = href => pathname === href;

  const NavLink = ({ href, children, className = '' }) => (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-all duration-300',
        isActive(href)
          ? 'text-[#1A79CE] bg-[#E7F0FA] border-b-2 border-[#1A79CE]'
          : 'text-gray-600 hover:text-blue-700 hover:bg-blue-100',
        className
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-[#E7F0FA] p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="h-6 w-6 text-[#1A79CE]" />
            </div>
            <span className="text-xl font-bold text-slate-900">EduPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* User Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="hover:bg-blue-100" asChild>
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button
                  className="bg-[#1A79CE] text-white hover:bg-blue-700"
                  asChild
                >
                  <Link href="/sign-up">Register</Link>
                </Button>
              </div>
            </SignedOut>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map(item => (
                  <NavLink
                    key={item.name}
                    href={item.href}
                    className="text-base"
                  >
                    {item.name}
                  </NavLink>
                ))}

                <div className="border-t pt-4 mt-8">
                  <SignedIn>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <UserButton afterSignOutUrl="/" />
                        <div>
                          <p className="text-xs text-gray-500">
                            {user?.emailAddresses[0].emailAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SignedIn>

                  <SignedOut>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-blue-100"
                        asChild
                      >
                        <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button
                        className="w-full bg-[#1A79CE] text-white hover:bg-blue-700"
                        asChild
                      >
                        <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                          Register
                        </Link>
                      </Button>
                    </div>
                  </SignedOut>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
