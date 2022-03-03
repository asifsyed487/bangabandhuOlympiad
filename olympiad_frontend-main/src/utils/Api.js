import axios from "axios";
export const APP_URL = "https://bangabandhuolympiad.com";
// export const APP_URL = "http://localhost:5000";
export const APP_URL_MADRASHA = `${APP_URL}/madrasha`;
export const SOCKET__URL = "https://bangabandhuolympiad.com";
export const URL = `${APP_URL}/apis`;

export const Login_api = (user) => {
  return axios
    .post(`${URL}/login`, {
      username: user.username,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem("usertoken_hash", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Admin_Login_api = async (userData) => {
  const rawResponse = await fetch(`${URL}/adminLogin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userData.username,
      password: userData.password,
    }),
  });
  const content = await rawResponse.json();

  return content;
};

export const Register_Api = (userdata) => {
  const userData = {
    fullname: userdata.fullname,
    email: userdata.email,
    username: userdata.username,
    schoolname: userdata.schoolname,
    phonenumber: userdata.phonenumber,
    password: userdata.password,
    class: userdata.category === 7 ? "0" : userdata.class,
    madrasha: userdata.madrasha,
    category: userdata.category,
    dob: `${userdata.day}-${userdata.month}-${userdata.year}`,
  };

  return axios
    .post(`${URL}/register`, {
      data: userData,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const ForgetPaass_Api = (user) => {
  return axios
    .post(`${URL}/forgetpass`, {
      username: user.username,
      phonenumber: user.phonenumber,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const SetPass_Api = (user) => {
  return axios
    .post(`${URL}/setnewpass`, {
      username: user.username,
      password: user.password,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Subject_Api = (data, category) => {
  return axios
    .post(`${URL}/subject`, {
      Class: data,
      category: category,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Chapters_Api = (my_data, category) => {
  // console.log("my_data");
  // console.log(my_data.myclass);
  return axios
    .post(`${URL}/chapters`, {
      class: my_data.myclass,
      subject: my_data.subject,
      category: category,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getClassMate_Api = (myclass) => {
  return axios
    .post(`${URL}/myclassmates`, {
      myclass: myclass,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getClassMateSearch_Api = (myclass) => {
  return axios
    .post(`${URL}/classmatesSearch`, {
      myclass: myclass,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Save_stats_api = (data) => {
  return axios
    .post(`${URL}/gamestats`, {
      data: data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Save_SingleStats_api = (data) => {
  return axios
    .post(`${URL}/gamestatssingle`, {
      data: data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Get_Leaderboard_Api = (data) => {
  console.log(data);
  return axios
    .post(`${URL}/leaderboard`, {
      myclass: data.myclass,
      skip: data.skip,
      limit: data.limit,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Get_MediaQuen_Api = () => {
  return axios
    .get(`${URL}/media`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Get_Profile_Api = (username) => {
  return axios
    .post(`${URL}/profileinfo`, { username })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getQuestionsSingle = (quendata, name, category) => {
  return axios
    .post(`${URL}/singleplayerquen`, {
      my_class: quendata.Class,
      subject: quendata.Subject,
      chapter: quendata.Chapter,
      name: name,
      category: category,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const SendInviteSMS = (data) => {
  return axios
    .post(`${URL}/invitetext`, {
      data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const Get_Schools_Api = () => {
  return axios
    .get(`${URL}/schools`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Get_Questions_Api = (skip) => {
  return axios
    .post(`${URL}/allquens`, {
      skip,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const Get_SchoolsName_Api = (district, madrasha) => {
  return axios
    .post(`${URL}/schoolsname`, {
      district,
      madrasha,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const SendMail_Api = (email) => {
  return axios
    .post(`${URL}/supportmail`, {
      email,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const Send_Challenge_API = (data) => {
  return axios
    .post(`${URL}/sendchallenge`, {
      data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const Decline_Challenge_API = (data) => {
  return axios
    .post(`${URL}/declinechallenge`, {
      data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const Get_Challenge_API = (username) => {
  return axios
    .post(`${URL}/getgameid`, {
      username,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const Check_declined_Api = (username) => {
  return axios
    .post(`${URL}/checkdecline`, {
      username,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const borad_Dashboard = () => {
  return axios
    .get(`${URL}/dashoboardData`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const school_Admin_Login = (data) => {
  return axios
    .post(`${URL}/loginSchoolAdmin`, {
      data,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const school_Dashboard = (schoolname) => {
  return axios
    .post(`${URL}/dashboardFindByschool`, {
      schoolname,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const total_school_Register = () => {
  return axios
    .get(`${URL}/registerSchoolCount`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const get_Total_Subjects = () => {
  return axios
    .get(`${URL}/getTotalSubjects`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const checkMaintaince_Api = () => {
  return axios
    .get(`${URL}/maintainance`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getDistrcits_Api = (madrasha) => {
  return axios
    .post(`${URL}/districts`, { madrasha })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getDistrcitsMadrasha_Api = () => {
  return axios
    .get(`${URL}/districtsmadrasha`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const Update_Class_Api = (user) => {
  return axios
    .post(`${URL}/updateclass`, {
      username: user.username,
      myclass: user.myclass,
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("usertoken_hash", response.data);
        return "Done";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
