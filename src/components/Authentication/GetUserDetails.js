const GetUserDetails = async () => {
    const host = process.env.REACT_APP_HOST;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token,
            },
        });
        const userData = await response.json();
        const { name } = userData;
        return name;
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
};

export default GetUserDetails;
