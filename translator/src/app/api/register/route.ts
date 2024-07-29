import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest){
    const data = await request.json();
    console.log('Received user inputs:', data);
      return NextResponse.json({ message: 'User registered successfully', data },{ status: 200 });
};

