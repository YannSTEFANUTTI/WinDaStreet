/* eslint-disable import/no-unresolved */
import api from "@services/api";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import send from "@assets/envoyer.png";
import io from "socket.io-client";
import { useNavigate } from "react-router";
import { useGame } from "../../contexts/GameModeContext";

const socket = io.connect(import.meta.env.VITE_BACKEND_URL);

function ArtDetailsComments({ id }) {
  const [allComments, setAllComments] = useState();
  const [userComment, setUserComment] = useState();
  const { user, date } = useGame();
  const navigate = useNavigate();

  const sendComment = () => {
    if (user) {
      api
        .post("/comments", {
          art_id: id,
          user_id: user.id,
          com: userComment,
          date,
        })
        .then((res) => {
          if (res.status === 201) {
            socket.emit("newComment", id);
          }
        })
        .catch((err) => console.error(err));
    } else {
      navigate("/authentication");
    }
  };

  const handleComment = (e) => {
    setUserComment(e.target.value);
  };

  useEffect(() => {
    if (!allComments) {
      api
        .get(`comments/${id}`)
        .then((res) => setAllComments(res.data))
        .catch((err) => console.error(err));
    } else {
      socket.on("newComment", (comments) => setAllComments(comments));
    }
  }, [socket, allComments]);

  return (
    <div className="CommentsContainer">
      <div className="AllCommentsContainer">
        {allComments &&
          allComments.map((comment) => (
            <div className="OneCommentContainer">
              <div className="OneCommentHeader">
                <p>{comment.userName}</p>
                <p>{comment.date}</p>
              </div>
              <p>{comment.com}</p>
            </div>
          ))}
      </div>
      <div className="CommentInput">
        <input type="text" placeholder="Commentaire" onChange={handleComment} />
        <div
          className="ArtDetailsSend"
          onClick={sendComment}
          onKeyDown={sendComment}
          role="none"
        >
          <img src={send} alt="Send Comment" />
        </div>
      </div>
    </div>
  );
}

ArtDetailsComments.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ArtDetailsComments;
