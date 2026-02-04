import React, { useState } from "react";
import { Comment } from "../interface";
import axios from "axios";
import { fetchCommentsThunk } from "../../redux/store/thunks/comment";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";

const CommentArticle = ({
  comment,
  product,
}: {
  comment: Comment;
  product: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  //state
  // comment input
  const [commentReply, setCommentReply] = useState(false);
  //user comment
  // const [reply, setReply] = useState("");
  //date
  // const [date, setDate] = useState("");

  //Input field toggler
  const toggleReplyInput = (e: React.MouseEvent<HTMLButtonElement>) =>
    setCommentReply((prev) => !prev);

  //send reaction to the DB
  function sendReaction(userReaction: any) {
    try {
      console.log("Reacting to comment...");
      axios.post("http://localhost:3000/api/comments/reaction/", userReaction, {
        withCredentials: true,
      });
      console.log("Reacted to comment successfully to:", userReaction.comment);

      dispatch(fetchCommentsThunk());
    } catch (error: any) {
      console.log({ message: error.message });
    }
  }
  //send comment to the DB
  function sendReply(userComment: any) {
    try {
      console.log("Replying comments...");
      axios.post("http://localhost:3000/api/comments/", userComment, {
        withCredentials: true,
      });
      console.log("Comment successfully made!");

      dispatch(fetchCommentsThunk());
    } catch (error: any) {
      console.log({ message: error.message });
    }
  }

  //reply handler
  const replyHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reply = e.currentTarget.elements.namedItem(
      "reply",
    ) as HTMLInputElement;

    //comment or reply made by the user
    const userComment = {
      product,
      parent: comment._id,
      text: reply.value,
    };

    sendReply(userComment);

    //reset input field
    reply.value = "";
    //change of the comment input field
    setCommentReply((prev) => !prev);

    dispatch(fetchCommentsThunk());
  };

  //reaction hander
  const reactionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const reaction = e.currentTarget.name;
    if (reaction === "like") {
      const userReaction = {
        comment: comment._id,
        reaction: "like",
      };
      sendReaction(userReaction);
    }
    if (reaction === "dislike") {
      const userReaction = {
        comment: comment._id,
        reaction: "dislike",
      };
      sendReaction(userReaction);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-2xl px-4">
        <article className="rounded-lg bg-white p-6 text-base dark:bg-gray-900">
          <footer className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                <img
                  className="mr-2 h-6 w-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Michael Gough"
                />
                {comment._id}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time dateTime="2022-02-08" title="February 8th, 2022">
                  {comment.createdAt}
                </time>
              </p>
            </div>
            <button
              id="dropdownComment1Button"
              data-dropdown-toggle="dropdownComment1"
              className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-50 focus:outline-none dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
              <span className="sr-only">Comment settings</span>
            </button>

            <div
              id="dropdownComment1"
              className="z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconHorizontalButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Remove
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Report
                  </a>
                </li>
              </ul>
            </div>
          </footer>
          <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>

          {/* comment reaction */}
          <div className="flex h-12 items-center gap-6">
            <div className="flex gap-2">
              <button type="button" onClick={reactionHandler} name="like">
                <svg
                  className="h-6 w-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {comment.like?.length! > 0 && <span>{comment.like?.length}</span>}
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={reactionHandler} name="dislike">
                <svg
                  className="h-6 w-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.97 14.316H5.004c-.322 0-.64-.08-.925-.232a2.022 2.022 0 0 1-.717-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.201C5.769 3.54 5.96 3 7.365 3c2.072 0 4.276.678 6.156 1.256.473.145.925.284 1.35.404h.114v9.862a25.485 25.485 0 0 0-4.238 5.514c-.197.376-.516.67-.901.83a1.74 1.74 0 0 1-1.21.048 1.79 1.79 0 0 1-.96-.757 1.867 1.867 0 0 1-.269-1.211l1.562-4.63ZM19.822 14H17V6a2 2 0 1 1 4 0v6.823c0 .65-.527 1.177-1.177 1.177Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {comment.dislike?.length! > 0 && (
                <span>{comment.dislike?.length}</span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleReplyInput}
                type="submit"
                className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
              >
                <svg
                  className="mr-1.5 h-3.5 w-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                </svg>
                Reply
              </button>
            </div>
          </div>

          {/* make replies */}
          {commentReply && (
            <div>
              <form onSubmit={replyHandler}>
                <input
                  type="text"
                  id="visitors"
                  className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand placeholder:text-body block w-full border px-2.5 py-2 text-sm shadow-xs"
                  placeholder=""
                  required
                  name="reply"
                />
                {/* <button type="submit"></button> */}
              </form>
            </div>
          )}
        </article>

        <article className="ms-10">
          {/* {comment.children?.length > 0 &&
            comment.children.map((child) => (
              <CommentArticle
                key={child._id}
                comment={child}
                product={product}
              />
            ))} */}
        </article>
      </div>
    </>
  );
};

export default CommentArticle;
