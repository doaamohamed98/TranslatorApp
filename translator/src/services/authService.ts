
export const registerUser = async (userInputs: { username: string; email: string; password: string; }) => {
  const response = await fetch(`/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInputs),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else{
    console.log('Registration successful:', response);
  }

  return await response.json();
};

export const getAllUsers = async (userInputs: {username: string; email: string; password: string;}) => {
    const response = await fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify(userInputs),
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    return await response.json();
  };

  export const checkUserExists = async (email: string ) => {
    const response = await fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    const { message } = await response.json();
    return message !== 'User registered successfully';
  };

  export const loginUser = async (userInputs: { email: string; password: string;}) => {
    const response = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userInputs }),
    });
  
    if (!response.ok) {
      throw new Error(`Login failed ${response.statusText}`);
    }
  
    return await response.json(); 
  };

  

  
    
  

  