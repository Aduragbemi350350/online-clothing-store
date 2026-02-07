import CommentArticle from "./CommentArticle";
import {  Product } from "../interface";
import {  useSelector } from "react-redux";
import {  RootState } from "../../redux/store/store";


const Comments = ({ product }: { product: Product }) => {
  // const dispatch = useDispatch<AppDispatch>();
  
  const { loading, comments, error } = useSelector(
    (state: RootState) => state.comments,
  );

  //RETURNS
  //RETURNS
  //RETURNS

  //loading
  if(loading) return <p>Comment loading...</p>

  //error
  console.log({
    commentError: error
  })
  if(error) return <p className="h3 mx-30">{`No comments: ${error.message}`}</p>

  //comments
  return (
    <section>
      {comments.map(
        (comment) =>
          (
            <CommentArticle
              key={comment._id}
              comment={comment}
              product={product._id}
            />
          ),
      )}
    </section>
  );
};

export default Comments;
