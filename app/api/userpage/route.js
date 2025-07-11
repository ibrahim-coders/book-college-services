import ConnectDB from '@/lib/db';
import { NextResponse } from 'next/server';
import { User } from '@/modules/user/user.model';
import jwt from 'jsonwebtoken';

export const GET = async req => {
  try {
    await ConnectDB();
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token' },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select(
      'email fastname lastname phone'
    );
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, user: user.toObject() },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid token' },
      { status: 401 }
    );
  }
};
