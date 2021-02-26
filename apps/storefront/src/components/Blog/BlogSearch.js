import { Row, Col, Button, Container } from "react-bootstrap";
import Link from "next/link";
import { IoIosCalendar, IoIosAdd } from "react-icons/io";
import { Fragment } from "react";
import { IoIosSearch } from "react-icons/io";
const BlogSearch = ({ column, BlogSearch }) => {
    return (
        <React.Fragment>
            {BlogSearch.length === 0 ?
                    <Row>
                        <Col>
                            <div className="nothing-found-content">
                                <h1 className="space-mb--20"><IoIosSearch/>Nothing Found !</h1>
                                <span className="space-mb--20">Sorry, but nothing matched your search terms. Please try again with some different keywords.</span>
                                <p className="direction-page">
                                    BACK TO{" "}
                                    <Link href="/blog" as={process.env.PUBLIC_URL + "/blog"}>
                                        <a>Blog</a>
                                    </Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
              
                : <Row>
                    {BlogSearch && BlogSearch.map((single, index) => (
                        <Col
                            lg={column && column === 2 ? 6 : column === 3 ? 4 : 12}
                            md={column && column === 2 ? 6 : column === 3 ? 6 : 12}
                            className="space-mb--60"
                            key={index}
                        >
                            <div className="blog-grid-post">
                                <div className="blog-grid-post__image space-mb--10">
                                    <Link
                                        href={"/blog/post/" + single.id + "/" + single.slug}
                                        as={process.env.PUBLIC_URL + "/blog/post/" + single.id + "/" + single.slug}
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
                                        <IoIosCalendar />
                                        <Link
                                            href={"/blog/post/" + single.id + "/" + single.slug}
                                            as={process.env.PUBLIC_URL + "/blog/post/" + single.id + "/" + single.slug}
                                        >
                                            <a>{single.date}</a>
                                        </Link>
                                    </div>
                                    <h2 className="post-title">
                                        <Link
                                            href={"/blog/post/" + single.id + "/" + single.slug}
                                            as={process.env.PUBLIC_URL + "/blog/post/" + single.id + "/" + single.slug}
                                        >
                                            <a>{single.title}</a>
                                        </Link>
                                    </h2>
                                    <div className="post-category space-mb--10">
                                        {single.blog_categories && single.blog_categories.map((item, index) => (
                                            <Link key={index}
                                                href={"/blog/category/" + item.id + "/" + item.slug}
                                                as={process.env.PUBLIC_URL + "/blog/category/" + item.id + "/" + item.slug}
                                            >
                                                <Button className="mr-1 mt-1" variant="outline-dark">{item.category_name}</Button>
                                            </Link>
                                        )
                                        )}
                                    </div>
                                    <p className="post-excerpt">{single.text}</p>
                                    <Link
                                        href={"/blog/post/" + single.id + "/" + single.slug}
                                        as={process.env.PUBLIC_URL + "/blog/post/" + single.id + "/" + single.slug}
                                    >
                                        <a className="blog-readmore-btn">
                                            <IoIosAdd /> read more
                                </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    )
                    )}
                </Row>}
        </React.Fragment>
    );
};

export default BlogSearch;
