import './App.css';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { Routes, Route } from 'react-router-dom';
import Alert from './Components/Alert';
import { useState, useEffect } from 'react';
import Video from './Components/Video';
import Footer from './Components/Footer';

function App() {
  const [alert, setAlert] = useState(null)
  const [video, setVideo] = useState([])
  function modifyAlert(message1, message2) {
    setAlert({ message1, message2 })
    setTimeout(() => setAlert(''), 3000)
  }
  const fetchData = async () => {
    let data = await fetch('https://vast-goat-slacks.cyclic.app/displayvideo', {
      method: "GET"
    });
    let videoData = await data.json()
    setVideo(videoData.videos)
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Navbar />
      <Alert alert={alert} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login updateAlert={modifyAlert} />} />
        <Route path='/signup' element={<Signup updateAlert={modifyAlert} />} />
        {
          video !== [] && video.map((data, i) => {
            return (
              //remoing space from title so that routing will match.
              <Route path={data.title.replaceAll(" ", '')} key={i} element={
                <Video
                  title={data.title}
                  image={data.img}
                  source={data.sources}
                  likes={data.likes}
                  views={data.views}
                  comments={data.comment}
                />}
              />
            )
          })
        }
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
