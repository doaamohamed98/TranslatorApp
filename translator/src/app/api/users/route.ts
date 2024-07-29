import { NextRequest, NextResponse } from 'next/server';

let users: Array<{ id:number, username: string, email: string, password: string }> = [];
let idnum=1;

export async function POST(request: NextRequest){
  const data = await request.json();
  console.log('Received user inputs:', data);

  // Check  IF User Exists 
  const userExists = users.find(user => user.email === data.email);
  if (userExists) {
    return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
  }
   const newUser = {
    id:idnum++,
    username: data.username,
    email: data.email,
    password: data.password,
  }
    users.push(newUser);
  

    return NextResponse.json({ message: 'User registered successfully', data },{ status: 200 });
}

export async function GET() {
  try {
    return NextResponse.json(users);
} catch (error) {
    console.error('Error retrieving users:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}
}





