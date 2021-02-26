import {Row, Col,Button} from "react-bootstrap";
import Link from "next/link";
import {IoIosCalendar, IoIosAdd, IoMdPricetags} from "react-icons/io";

const BlogTags = ({column,blogPostsTag}) => {
    return (
        <Row>
            {blogPostsTag && blogPostsTag.map((single, index) => (
                    <Col
                        lg={column && column === 2 ? 6 : column === 3 ? 4 : 12}
                        md={column && column === 2 ? 6 : column === 3 ? 6 : 12}
                        className="space-mb--60"
                        key={index}
                    >
                        <div className="blog-grid-post">
                            <div className="blog-grid-post__image space-mb--10">
                                <Link
                                    href={"/blog/post/" + single.id + "/" +  single.slug}
                                    as={process.env.PUBLIC_URL + "/blog/post/" + single.id + "/" +  single.slug}
                                >
                                    <a>
                                        <img
                                            src={process.env.STRAPI_URL + single.image.url}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="blog-grid-post__content space-mb--10">
                                <div className="post-date">
                                    <IoIosCalendar/>
                                    <Link
                                        href={"/blog/post/" + single.id + "/" +  single.slug}
                                        as={process.env.PUBLIC_URL + "/blog/post/" + single.id + "/" +  single.slug}
                                    >
                                        <a>{single.date}</a>
                                    </Link>
                                </div>
                                <h2 className="post-title">
                                    <Link
                                        href={"/blog/post/" + single.id + "/" +  single.slug}
                                        as={process.env.PUBLIC_URL + "/blog/post/" + single.id + "/" +  single.slug}
                                    >
                                        <a>{single.title}</a>
                                    </Link>
                                </h2>
                                <p className="post-excerpt">{single.text}</p>
                                <div className="post-tags">
                                    <IoMdPricetags/>
                                    <ul className="tag-list">
                                        {single.blog_tags && single.blog_tags.map((item, index) => (
                                            <li key={index}>
                                                <a href={"/blog/tag/" + item.id + "/" + item.slug}
                                                   as={process.env.PUBLIC_URL + "/blog/tag/" + item.id + "/" + item.slug}>{item.tag_name}</a>,
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Link
                                    href={"/blog/post/" + single.id + "/" +  single.slug}
                                    as={process.env.PUBLIC_URL + "/blog/post/" + single.id + "/" +  single.slug}
                                >
                                    <a className="blog-readmore-btn">
                                        <IoIosAdd/> read more
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </Col>
                )
            )}
        </Row>
    );
};

export default BlogTags;
