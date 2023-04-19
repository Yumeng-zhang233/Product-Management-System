import { ajaxConfigHelper } from "../helper/index";

export const addUser =
  ({ email, password }) =>
  (dispatch) => {
    fetch("/addUser", ajaxConfigHelper({ email, password }))
      .then((response) => response.json())
      .then((response) => {
        console.log(response.status);
        if (response.status == 201) {
          dispatch({
            type: "Login",
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
export const login =
  ({ email, password }) =>
  (dispatch) => {
    fetch("/login", ajaxConfigHelper({ email, password }))
      .then((response) => response.json())
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          dispatch({
            type: "Login",
          });
        } else {
          alert("email and password do not match");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
export const logout = () => async (dispatch) => {
  try {
    const response = await fetch("/logout");
    console.log(await response.json());
    dispatch({
      type: "Logout",
    });
  } catch (error) {
    console.log(error);
  }
};

// export const addUser = ({ email, password }) => {
//   fetch("/addUser", ajaxConfigHelper({ email, password }))
//     .then((response) => {
//       if(response.ok){

//       }
//       return response.json();
//     })
//     .catch((e) => {
//       console.error(e);
//     });
// };
//   const data = {
//     email: email,
//     password: password,
//   };
//   const url = "/allUsers";
//   const newUserRes = await fetch(url, {
//     credentials: "include",
//     method: "GET",
//   });
//   let res = await newUserRes.json();
//   console.log(res);

// export const addUser = async ({ email, password }) => {
//   // const { userEmail, userPassword } = React.useContext(UserInfoContext);
//   // const { email, setEmail } = userEmail;
//   // const { password, setPassword } = userPassword;
//   console.log("777");

//   console.log(email);
//   const data = {
//     email: email,
//     password: password,
//   };
//   const url = "/addUser";
//   const newUserRes = await fetch(url, {
//     credentials: "include",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   //   fetch("/addUser", ajaxConfigHelper({ email, password }))
//   //     .then((response) => response.json())
//   //     .catch((e) => {
//   //       console.error(e);
//   //     });
// };
