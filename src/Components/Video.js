import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './CSS/video.css'
import likedIcon from './images/liked.png'
import yettoLikeIcon from './images/blanklike.png'
import viewIcon from './images/view.png'

function Video(props) {
  const [views, setViews] = useState(null);
  const [likes, setLikes] = useState(null);
  const [likeStatus, setlikeStatus] = useState(null);
  const [inputComment, setinputComment] = useState('');
  const [comments, setComments] = useState([]);

  let url = "https://vplayer-jewel.netlify.app/" + props.title.replaceAll(" ", "")
  const navigate = useNavigate();

  //function to send auth token and title which will update Views of users in backend and return give count
  // update views=================================================================================================================
  async function updateViews() {
    const response = await fetch("https://vast-goat-slacks.cyclic.app/setViews", {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ "title": props.title })
    });
    const viewsData = await response.json();
    setViews(viewsData.views.length)
    setlikeStatus(viewsData.liked)
  }

  // update Comment===============================================================================================================
  async function updateandGetComment() {
    //checking loggin using token and        
    if (localStorage.getItem('auth-token')) {
      const response = await fetch("https://vast-goat-slacks.cyclic.app/postcomment", {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        },
        body: JSON.stringify({ "title": props.title, "comment": inputComment })
      });
      const viewsData = await response.json();
      setComments(viewsData.comments)
      setinputComment('')
    }
  }
  // update Likes===============================================================================================================
  async function updateLikes() {
    if (localStorage.getItem('auth-token')) {

      const response = await fetch("https://vast-goat-slacks.cyclic.app/setLikes", {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        },
        body: JSON.stringify({ "title": props.title })
      });
      var likesData = await response.json();
      setLikes(likesData.likes.length);
    }
    else {
      navigate('/login')
    }
  }
  async function checkLikeandViews() {
    const response = await fetch("https://vast-goat-slacks.cyclic.app/viewLikesandviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "title": props.title })
    });
    const Count = await response.json();
    setLikes(Count.likes.length)
    setViews(Count.views.length)
    setComments(Count.comments)
  }


  //function to send auth token and title which will update likes  in backend and will give count

  useEffect(() => {
    checkLikeandViews();
    window.scrollTo(0, 0)
    // setLikes(props.likes.length)
    // setViews(props.views.length)
    // setComments(props.comments)
    if (localStorage.getItem('auth-token')) {
      updateViews();
    }
    // eslint-disable-next-line
  }, [likes])

  return (
    <div className="container  ">

      <video width="100%" height="200" controls autoPlay>
        <source src={props.source} type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      <div className="d-flex justify-content-between w-100 p-2 " >
        <h5 className='videoTitile'>{props.title}</h5>

        {/* div to split VIEWS AND LIKES */}
        {/* views */}
        <div className='d-flex justify-content-evenly viewandLike'>
          <p style={{ cursor: 'default' }} className='mx-2'><span className="badge badge-pill bg-secondary  d-block mx-1  " style={{ padding: '3px 5px ', opacity: '.3' }}> {views} </span><img className='viewIcon' src={viewIcon} alt="view icon" width={30} height={30} /></p>

          {/* likes */}
          <p style={{ cursor: 'pointer' }} onClick={updateLikes}><span className="badge badge-pill bg-secondary d-block " style={{ padding: '3px 5px ', opacity: '.3', cursor: 'default' }}> {likes} </span><img src={likeStatus === 'Yes' ? likedIcon : yettoLikeIcon} className={likeStatus === 'Yes' ? 'likedAimate my-1' : 'nonlike'} alt="like" width={25} height={20} /></p>
        </div>
      </div>
      <div className="share d-flex justify-content-end">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} className='bg-primary' target='_blank'>
          Facebook
        </a>
        <a href={`https://www.linkedin.com/shareArticle?url=${url}&title=${props.title}`} className='bg-primary'  target='_blank'>
          LinkedIn
        </a>

        <a href={`mailto:?subject=${props.title}&body=${url}`} className='bg-warning' target='_blank' >
          Email
        </a>
      </div>
      <h5 className='my-2 commentTag '>Comments: {comments.length > 0 ? comments.length : "No comments yet"}</h5>
      <div className="container">
        {
          localStorage.getItem('auth-token') && <>
            <textarea placeholder='Add comment....' rows='3' cols='30' value={inputComment} onChange={(e) => setinputComment(e.target.value)} required />
            {/* using the trim() to check that after removing space from front and back do we have actual comment or blank space */}
            <input type="button" className=' text-light p-1 my-1 mb-4  publishButton' disabled={inputComment.trim() === ''} value='Publish' onClick={updateandGetComment} />
          </>

        }
      </div>
     
      <div className={comments.length > 0 ? "commentSection" : ''}>
        {
          comments.length > 0 && comments.map((data, i) => {
            return (
              <>

                <p key={i}><b>{data.name}</b> : {data.comment}</p>

              </>
            )

          })
        }
      </div>
    </div>

    //use effects se like vagera laa all the best mere jaan bhot sexy kaam h
  )
}

export default Video