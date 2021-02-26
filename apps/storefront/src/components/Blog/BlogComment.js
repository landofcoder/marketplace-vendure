import {Col, Container, Row, Button} from "react-bootstrap";
import {useMutation} from "@apollo/react-hooks";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import {ADD_COMMENT} from "@bavaan/graphql/blog/blog-post.graphql";
import {IoIosRedo} from "react-icons/io";


const Comment = (props) => {
    var today = new Date()
    const [name,setName] = React.useState('')
    const [email,setEmail] = React.useState('')
    const [message,setMessage] = React.useState('')
    const [date,setDate] = React.useState(today.getFullYear() + '-' + '0' + (today.getMonth() + 1) + '-' + '0' + today.getDate())
    const { addToast } = useToasts();
    const [addComment] = useMutation(ADD_COMMENT);
    const [Comment, setListComment] = useState(props.props.blog_comments);
   
    const [idPost,setIdPost] = React.useState(props.props.id);
    const addCommentClick = (e) => {
        e.preventDefault();
        addComment({ variables: { blog_post: idPost, date: date,customer_name: name , customer_email: email  ,comment_message: message }})
        .then((data) => {
            
            if (data.errors || data.message) {
              throw { message: "Incorrect comment" };
            }   
        })
        .catch((e) => {
            addToast(e.message || "Cannot connect to server", {
              appearance: "error",
              autoDismiss: true,
            });
        });
        let item = {
            customer_name: name,
            customer_email: email,
            comment_message: message,
            date: date
        };
        const newComment = [...Comment];
        newComment.push(item);
        setListComment(newComment);
    };
    return (
    <div>
        <div>
            <ul>
                {Comment && Comment.map((single) => (
                    <li key = {single.id}>
                        <div className="single-comment" >
                            <div className="single-comment__content">
                                <p className="username">
                                    {single.customer_name} 
                                    <span className="date">{single.date}</span>
                                </p>
                                <p className="email">
                                    {single.customer_email}
                                </p>   
                                <p className="message">
                                    {single.comment_message}
                                </p>
                            </div>
                        </div>                    
                    </li>
                ))}
            </ul>
        </div>
        <div className="comment-form">
            <h2 className="comment-title space-mb--30">
                Leave your thought here
            </h2>
            {/*=======  comment form  =======*/}
            <div className="lezada-form comment-form">
                <form
                    onSubmit={addCommentClick}
                >
                    <Row>
                        <Col lg={6} className="space-mb--20">
                            <input type="text" placeholder="Name (*)" required onChange={e=>setName(e.target.value)}/>
                        </Col>
                        <Col lg={6} className="space-mb--20">
                            <input
                                type="email"
                                placeholder="Email (*)" 
                                required
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </Col>
                        <Col lg={12} className="space-mb--20">
                            <textarea
                                cols={30}
                                rows={10}
                                placeholder="Message" 
                                defaultValue={""}
                                onChange={e=>setMessage(e.target.value)}
                            />
                        </Col>
                        <Col lg={12} className="text-center">
                            <button
                                type="submit"
                                className="lezada-button lezada-button--medium"
                            >
                                submit
                            </button>
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    </div>
    )
  }
  
  export default Comment;