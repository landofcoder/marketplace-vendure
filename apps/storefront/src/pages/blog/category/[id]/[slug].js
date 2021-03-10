import Link from "next/link";
import {Container, Row, Col} from "react-bootstrap";
import {useState, useEffect, Fragment} from "react";
import {LayoutTwo} from "../../../../components/Layout";
import {BreadcrumbOne} from "@bavaan/storefront-base/src/components/Breadcrumb";
import {BlogPostGridWrapper} from "../../../../components/Blog";
import {useQuery,useLazyQuery} from "@apollo/react-hooks";
import {BLOG_CATEGORY} from "@bavaan/graphql/blog/blog-category.graphql";
import {BLOG_LIST_POST_CATEGORY, COUNT_BLOG_POST_LIST} from "@bavaan/graphql/blog/blog-post.graphql";
import {useRouter} from "next/router";
import {TextBlock, RectShape} from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from "react-placeholder";
import Paginator from "react-hooks-paginator";

const BlogCategoryPlaceHolder = (
    <div>
        <TextBlock rows={3} color="#e2e2e2"/>
        <RectShape style={{width: "100%", height: 300}} color="#e2e2e2"/>
        <div className="blog-page-wrapper space-mb--r130 space-mt--r130">
            <Container>
                <Row>
                    <Col lg={4} className="order-2 order-lg-1 space-mt-mobile-only--50">
                        {/* image gallery bottom thumb */}
                        <RectShape style={{width: "100%", height: 300}} color="#e2e2e2"/>
                        <TextBlock rows={10} color="#e2e2e2"/>
                    </Col>
                    <Col lg={4} className="order-2 order-lg-1 space-mt-mobile-only--50">
                        {/* image gallery bottom thumb */}
                        <RectShape style={{width: "100%", height: 300}} color="#e2e2e2"/>
                        <TextBlock rows={10} color="#e2e2e2"/>
                    </Col>
                    <Col lg={4} className="order-2 order-lg-1 space-mt-mobile-only--50">
                        {/* image gallery bottom thumb */}
                        <RectShape style={{width: "100%", height: 300}} color="#e2e2e2"/>
                        <TextBlock rows={10} color="#e2e2e2"/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} className="order-2 order-lg-1 space-mt-mobile-only--50">
                        {/* image gallery bottom thumb */}
                        <RectShape style={{width: "100%", height: 300}} color="#e2e2e2"/>
                        <TextBlock rows={10} color="#e2e2e2"/>
                    </Col>
                    <Col lg={4} className="order-2 order-lg-1 space-mt-mobile-only--50">
                        {/* image gallery bottom thumb */}
                        <RectShape style={{width: "100%", height: 300}} color="#e2e2e2"/>
                        <TextBlock rows={10} color="#e2e2e2"/>
                    </Col>
                    <Col lg={4} className="order-2 order-lg-1 space-mt-mobile-only--50">
                        {/* image gallery bottom thumb */}
                        <RectShape style={{width: "100%", height: 300}} color="#e2e2e2"/>
                        <TextBlock rows={10} color="#e2e2e2"/>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
);
const Category = () => {
    const router = useRouter();
    const [pageLimit, setPageLimit] = useState(6);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [callApi, blogPostData] = useLazyQuery(
        BLOG_LIST_POST_CATEGORY, {});
    const queryCountBlogPost = useQuery(COUNT_BLOG_POST_LIST, {});
    useEffect(() => {
        callApi({variables: {limit: pageLimit, start: currentPage, where:{blog_categories:{id: router.query.id}}}});
    }, [currentPage, pageLimit]);
    const queryBlogPostsCategory = useQuery(BLOG_CATEGORY,{variables: {id: router.query.id}});
    if (queryBlogPostsCategory.loading || !queryBlogPostsCategory.data) {
        return BlogCategoryPlaceHolder;
    }
    const blogPostsCategoryData = queryBlogPostsCategory.data.blogCategory
    return (
        <LayoutTwo>
            {/* breadcrumb */}
            {blogPostData.data ?
            <Fragment>
                <BreadcrumbOne
                    pageTitle={blogPostsCategoryData.category_name}
                    backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
                >
                    <ul className="breadcrumb__list">
                        <li>
                            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" as={process.env.PUBLIC_URL + "/blog"}>
                                <a>Blog</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" as={process.env.PUBLIC_URL + "/blog"}>
                                <a>Categories</a>
                            </Link>
                        </li>
                        <li>{blogPostsCategoryData.category_name}</li>
                    </ul>
                </BreadcrumbOne>
                <div className="blog-page-wrapper space-mb--r130 space-mt--r130">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                {/* post list */}
                                <BlogPostGridWrapper column={3} blogPostsCategory={blogPostData.data.blogPosts}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Fragment>
            : <ReactPlaceholder customPlaceholder={BlogCategoryPlaceHolder}
            ready={blogPostData.data}></ReactPlaceholder>}
            <div className="blog-page-wrapper space-mb--r space-mt--r130">
                <Container>
                    <Row>
                        <Col className="space-mb--r130">
                        {/* <div className="pro-pagination-style">
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
                        </div> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </LayoutTwo>
    );
};

export default Category;
