import React, { useState } from "react";
import Button from "../buttons/Button";
import styles from "./card.module.css";
import Input from "../inputs/Input";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { useDispatch } from "react-redux";
import {
  createComment,
  deleteComment,
  deleteProduct,
  toggleLike,
} from "../../store/products/products.actions";
import { Link } from "react-router-dom";

const Cards = ({ item }) => {
  const [openInput, setOpenInput] = useState(false);
  const toggle = () => {
    setOpenInput(!openInput);
  };

  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  console.log(item, "item");
  const [like, setLike] = useState(false);
  return (
    <div className={styles.contCard}>
      <div className={styles.card}>
        <img className={styles.cardImg} src={item.image} alt="" />
        <h2>{item.title}</h2>
        <p>{item.author}</p>

        {item.is_author && (
          <div>
            <Link to={`/edit/${item.id}`}>
              <Button color={"blue"}>Edit</Button>
            </Link>
            <Button
              onClick={() => dispatch(deleteProduct(item.id))}
              color={"red"}
            >
              Delete
            </Button>
          </div>
        )}
        <div
          onClick={() => {
            dispatch(toggleLike(item.id));
            setLike(!like);
          }}
        >
          {like ? <FcLike size={25} /> : <FcLikePlaceholder size={25} />}
        </div>
        <p>Likes: {item.likes}</p>
        <h5>Comments:</h5>
        {item.reviews.map((item) => (
          <div>
            <b>{item.author}:</b> <p key={item.id}>{item.text}</p>
            <Button onClick={() => dispatch(deleteComment(item.id))}>
              Delete
            </Button>
          </div>
        ))}
        <Button onClick={toggle} color="red">
          Comment
        </Button>

        {openInput && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (comment) {
                dispatch(
                  createComment({
                    text: comment,
                    product: item.id,
                  })
                );
                setComment("");
              }
            }}
          >
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Cards;
