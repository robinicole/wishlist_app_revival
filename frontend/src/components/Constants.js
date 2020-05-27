export const api_url = "https://gifts-wishlist-backend.herokuapp.com";
export const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: 400,
    margin: `${theme.spacing(0)} auto`,
    marginTop: theme.spacing(3),
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
