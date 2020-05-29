import jwt from 'jwt-decode'

export const api_url = "https://gifts-wishlist-backend.herokuapp.com";
export const styles = (theme) => ({
  container: {
    justifyContent: 'center',
    display: "flex",
    flexWrap: "wrap",
    width: 500,
    margin: `${theme.spacing(0)} auto`,
    marginTop: theme.spacing(5),
  },
  loginBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  header: {
    textAlign: "center",
    background: "black",
    color: "#fff",
    margin: `${theme.spacing(3)} auto`,
    marginTop: theme.spacing(3),
  },
  card: {
    marginTop: theme.spacing(10),
  },
});

export const isAccessTokenExpired = () => 
  {
    const token = localStorage.getItem('accessToken');
    if(token === 'null') {//if there is no token, dont bother
      return true;
     }
    const decodedToken = jwt(token, {complete: true});
      const dateNow = new Date();
    if(decodedToken.exp < dateNow.getTime()) 
    {
      return false;
    }
    else{
      return true;
    }
    }