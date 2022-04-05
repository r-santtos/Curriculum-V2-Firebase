import * as AuthSession from 'expo-auth-session';

/** IMPORT USER */
import { userLoading, userProfile } from '../context';
import { userCount } from '../context/index';

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  }
}

function signIn() {
  const { setLoading } = userLoading();
  const { setProfile } = userProfile();
  const { count, setCount } = userCount();

  {/** FUNCTION HANDLE SIGN IN GOOGLE */}
  async function handleSignInGoogle() {
    try {
      setLoading(true);
      let CLIENT_ID = '377096694432-ks7hhq7orpugm4ovb1f8ht0gbctlquoj.apps.googleusercontent.com'; 
      let REDIRECT_URI = 'https://auth.expo.io/@rsanttos/empregos'; 
      let RESPONSE_TYPE = 'token';
      let SCOPE = encodeURI('profile email');
  
      let authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  
      let { type, params } = await AuthSession
      .startAsync({ authUrl }) as AuthResponse;
  
      if(type === 'success') {
        loadPrifle(params.access_token);
      } else {
        setLoading(false);
      }
    } catch {
      throw new Error('Não foi possível autenticar');
    }
  }

  {/** Function responsible for loading user information after API call */}
  async function loadPrifle(token:string) {
    await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`)
    .then((response) => response.json())
    .then((json) => setProfile(json))
    .catch((error) => console.error(error))
    .finally(() => {setCount(count +1)})
  }

  return {
    handleSignInGoogle
  }
}

export default signIn;