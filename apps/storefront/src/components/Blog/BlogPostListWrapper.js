import {Row, Col,Button} from "react-bootstrap";
import Link from "next/link";
import {IoIosCalendar, IoIosAdd,IoMdPricetags} from "react-icons/io";

const BlogPostListWrapper = (blogData) => {
    return (
        <Row className="blog-post-list-wrapper">
            {blogData.blogPost && blogData.blogPost.map((single,index) => (
                    <Col lg={12} className="space-mb--60" key={index}>
                        <div className="blog-grid-post blog-grid-post--list">
                            <div className="blog-grid-post__image">
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
                            <div className="blog-grid-post__content">
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
                                <div className="post-category space-mb--10">
                                    {single.blog_categories && single.blog_categories.map((item, index) => (
                                            <Link key={index}
                                                  href={"/blog/category/" + item.id + "/" +  item.slug}
                                                  as={process.env.PUBLIC_URL + "/blog/category/" + item.id + "/" +  item.slug}
                                            >
                                                <Button className="mr-1 mt-1" variant="outline-dark">{item.category_name}</Button>
                                            </Link>
                                        )
                                    )}
                                </div>
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

export default BlogPostListWrapper;
