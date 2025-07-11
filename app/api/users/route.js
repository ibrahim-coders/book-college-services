import { NextResponse } from 'next/server';
import ConnectDB from '@/lib/db';
import { User } from '@/modules/user/user.model';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const body = await req.json();
    const { fastname, lastname, email, phone, password, confirmpassword } =
      body;

    // Field validations
    if (!fastname) {
      return NextResponse.json(
        { error: 'Fast name is required' },
        { status: 400 }
      );
    }
    if (!lastname) {
      return NextResponse.json(
        { error: 'Last name is required' },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }
    if (!confirmpassword) {
      return NextResponse.json(
        { error: 'Confirm Password is required' },
        { status: 400 }
      );
    }
    if (password !== confirmpassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Connect to database
    await ConnectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists.' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = new User({
      fastname,
      lastname,
      email,
      phone,
      password,
      confirmpassword,
    });

    await newUser.save();

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET, // Make sure to set this in .env.local
      { expiresIn: '7d' }
    );

    // ✅ Set token as HTTP-only cookie
    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    // ✅ Success response
    return NextResponse.json(
      { message: 'User registered successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
