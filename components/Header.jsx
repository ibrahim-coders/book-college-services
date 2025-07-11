'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const getInitials = name => {
    if (!name) return '';
    const words = name.trim().split(' ');
    let initials = '';
    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
    }
    return initials.toUpperCase();
  };
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Colleges', href: '/colleges' },
    { name: 'Admission', href: '/admission' },
    { name: 'My College', href: '/my-college' },
  ];

  console.log(user);
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* User Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/profile"
                  className="flex justify-center font-bold text-white items-center text-2xl hover:text-blue-100 w-10 h-10 rounded-full bg-blue-700 text-center"
                >
                  {getInitials(user.name)}
                </Link>
                <Button onClick={() => signOut()} variant="outline">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => signIn()}
                  variant="outline"
                  className="hover:bg-blue-100"
                >
                  Login
                </Button>
                <Button
                  className="bg-[#1A79CE] text-white hover:bg-blue-700"
                  asChild
                >
                  <Link href="/sign-up">Register</Link>
                </Button>
              </div>
            )}
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
                  {user ? (
                    <div className="space-y-2">
                      <Link
                        href="/profile"
                        className="flex justify-center font-bold text-white items-center text-2xl hover:text-blue-100 w-10 h-10 rounded-full bg-blue-700 text-center"
                        onClick={() => setIsOpen(false)}
                      >
                        {getInitials(user.name)}
                      </Link>
                      <Button
                        onClick={() => signOut()}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        onClick={() => signIn()}
                        variant="outline"
                        className="w-full justify-start hover:bg-blue-100"
                      >
                        Login
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
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
