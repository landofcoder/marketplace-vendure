import Link from "next/link";
import {Container, Row, Col} from "react-bootstrap";
import {useState, useEffect, Fragment} from "react";
import {LayoutTwo} from "../../components/Layout";
import {BreadcrumbOne} from "@bavaan/storefront-base/src/components/Breadcrumb";
import {BlogSidebar, BlogPostListWrapper} from "../../components/Blog";
import {useQuery, useLazyQuery} from "@apollo/react-hooks";
import {BLOG_LIST_POST, COUNT_BLOG_POST_LIST} from "@bavaan/graphql/blog/blog-post.graphql";
import {BLOG_CATEGORIES, BLOG_TAGS} from "@bavaan/graphql/blog/blog-category.graphql";
import {TextBlock, RectShape} from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from "react-placeholder";
import Paginator from "react-hooks-paginator";

const BlogPlaceHolder = (
    <div>
        <TextBlock rows={3} color="#e2e2e2"/>
        <RectShape style={{width: "100%", height: 300}} color="#e2e2e2"/>
        <div className="blog-page-wrapper space-mb--r130 space-mt--r130">
            <Container>
                <Row>
                    <Col lg={3} className="order-2 order-lg-1 space-mt-mobile-only--50">
                        <TextBlock rows={20} color="#e2e2e2"/>
                        <RectShape style={{width: "100%", height: 300}} color="#e2e2e2"/>
                    </Col>
                    <Col lg={9} className="order-1 order-lg-2">
                        <Row>
                            <Col lg={6}>
                                <RectShape style={{width: "100%", height: 200}} color="#e2e2e2"/>
                            </Col>
                            <Col lg={6}>
                                <TextBlock rows={10} color="#e2e2e2"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <RectShape style={{width: "100%", height: 200}} color="#e2e2e2"/>
                            </Col>
                            <Col lg={6}>
                                <TextBlock rows={10} color="#e2e2e2"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <RectShape style={{width: "100%", height: 200}} color="#e2e2e2"/>
                            </Col>
                            <Col lg={6}>
                                <TextBlock rows={10} color="#e2e2e2"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
);
const Blog = () => {
    const [pageLimit, setPageLimit] = useState(3);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [callApi, blogPostData] = useLazyQuery(
        BLOG_LIST_POST, {});
    const queryBlogCategories = useQuery(BLOG_CATEGORIES, {});
    const queryCountBlogPost = useQuery(COUNT_BLOG_POST_LIST, {});
    const queryBlogTags = useQuery(BLOG_TAGS, {});
    useEffect(() => {
        callApi({variables: {limit: pageLimit, start: currentPage}});
    }, [currentPage, pageLimit]);
    const blogCategoriesData = queryBlogCategories.data && queryBlogCategories.data.blogCategories ? queryBlogCategories.data.blogCategories : null;
    const blogTagsData = queryBlogTags.data && queryBlogTags.data.blogTags ? queryBlogTags.data.blogTags : null;

    return (
        <LayoutTwo>
            {/* breadcrumb */}
            {blogPostData.data ?
                <Fragment>
                    <BreadcrumbOne
                        pageTitle="Blog"
                        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
                    >
                        <ul className="breadcrumb__list">
                            <li>
                                <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Blog</li>
                        </ul>
                    </BreadcrumbOne>
                    <div className="blog-page-wrapper space-mb--r space-mt--r130">
                        <Container>
                            <Row>
                                <Col lg={3} className="order-2 order-lg-1 space-mt-mobile-only--50">
                                    {/* sidebar */}
                                    <BlogSidebar blogPost={blogPostData.data.blogPosts}
                                                 blogCategories={blogCategoriesData}
                                                 blogTags={blogTagsData}/>
                                </Col>
                                <Col lg={9} className="order-1 order-lg-2">
                                    {/* post list */}
                                    <BlogPostListWrapper blogPost={blogPostData.data.blogPosts}/>
                                </Col>
                            </Row>

                        </Container>
                    </div>
                </Fragment>
                : <ReactPlaceholder customPlaceholder={BlogPlaceHolder}
                                    ready={blogPostData.data}></ReactPlaceholder>
            }
            <div className="blog-page-wrapper space-mb--r space-mt--r130">
                <Container>
                    <Row>
                        <Col className="space-mb--r130">
                        <div className="pro-pagination-style">
                            {queryCountBlogPost.data ?
                                <Paginator
                                    totalRecords={queryCountBlogPost.data.blogPostsConnection.aggregate.count}
                                    pageLimit={pageLimit}
                                    pageNeighbours={null}
                                    setOffset={setOffset}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    pageContainerClass="mb-0 mt-0"
                                    pagePrevText="«"
                                    pageNextText="»"
                                />
                                : null
                            }
                        </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LayoutTwo>
    );
};

export default Blog;
