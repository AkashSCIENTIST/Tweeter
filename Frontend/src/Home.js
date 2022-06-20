//import {useState, useEffect} from 'react';
//import BlogList from "./BlogList";
import Feed from "./Feed";
//import { useCookies } from "react-cookie";
import SignIn from "./SignIn";
import { useEffect, useState } from "react";
import axios from "axios";

/*const Home = () => {
    //let name = "mario";
    //const [name, setName] = useState("mario");
    //const [age, setAge] = useState(25);
    const {data : blogs, isPending, error} = useFetch("http://localhost:8000/blogs");
    

    /*const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => {
            return blog.id !== id
        });
        setBlogs(newBlogs);
    }*/

/*const handleClick = (e) => {
        //console.log("Hello World!");
        //console.log(e);
        //name = "luigi";
        setName("luigi");
        setAge(50);
    }

    const handleClickAgain = (name, e) => {
        console.log("Hello " + name);
        console.log(e);
    }*/

/*return (
        <div className="home">


            {isPending && <div>Loading...</div>}
            {error && <div>{error} ... </div>}
            {!error && blogs && <BlogList blogs={blogs} title={"All Blogs !"}/>}{/*} handleDelete={handleDelete}/>}
 

        </div>
        );

}*/
function HomeWrapper() {
  const username_cookie = localStorage.getItem("username");
  //console.log(username_cookie);
  return (
    <>
      {username_cookie && <Home />}
      {!username_cookie && <SignIn />}
    </>
  );
}

function Home() {
  const user = localStorage.getItem("username");
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/feed/${user}`)
      .then((res) => setData(res.data));
  }, [user]);

  if (data) {
    console.log(data);
  }
  return (
    <>
      {/*<MusicKey letter='Q' src='demo.mp3'></MusicKey>
        <MusicKey letter='W' src='demo2.mp3'></MusicKey>
        <MusicKey letter='O' src='demo4.mp3'></MusicKey>
        <MusicKey letter='P' src='demo3.mp3'></MusicKey>*/}
      {data && <Feed tweets={data} />}
      <center>
        <p>End of Feed</p>
      </center>
    </>
  );
}

export default HomeWrapper;
