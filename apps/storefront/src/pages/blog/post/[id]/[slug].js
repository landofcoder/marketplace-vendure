import Link from "next/link";
import {Col, Container, Row, Button} from "react-bootstrap";
import {LayoutTwo} from "../../../../components/Layout";
import {BreadcrumbOne} from "@bavaan/storefront-base/src/components/Breadcrumb";
import {BlogSidebar,Comment} from "../../../../components/Blog";
import {
    IoIosCalendar,
    IoIosPerson,
    IoIosRedo,
    IoLogoFacebook,
    IoLogoGoogleplus,
    IoLogoPinterest,
    IoLogoTwitter,
    IoMdChatbubbles,
    IoMdPricetags
} from "react-icons/io";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/react-hooks";
import {BLOG_LIST_POST, BLOG_POST} from "@bavaan/graphql/blog/blog-post.graphql";
import ReactMarkdown from 'react-markdown'
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from "react-placeholder";
import {BLOG_CATEGORIES, BLOG_TAGS} from "@bavaan/graphql/blog/blog-category.graphql";
const BlogPostPlaceHolder = (
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
                        <RectShape style={{width: "100%", height: 400}} color="#e2e2e2"/>
                        <TextBlock rows={30} color="#e2e2e2"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBlock rows={15} color="#e2e2e2"/>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
);

const Post = () => {
    const router = useRouter();
    const queryBlogPost = useQuery(BLOG_POST, {variables: {id: router.query.id}});
    const queryBlogPosts = useQuery(BLOG_LIST_POST, {});
    const queryBlogCategories = useQuery(BLOG_CATEGORIES, {});
    const queryBlogTags = useQuery(BLOG_TAGS, {});
    if (queryBlogPost.loading || !queryBlogPost.data || queryBlogPosts.loading || !queryBlogPosts.data || queryBlogCategories.loading || !queryBlogCategories.data || queryBlogTags.loading || !queryBlogTags.data) {
        return BlogPostPlaceHolder;
    }
    const blogPostData = queryBlogPost.data.blogPost
    const blogPostsData = queryBlogPosts.data.blogPosts
    const blogCategoriesData = queryBlogCategories.data.blogCategories
    const blogTagsData = queryBlogTags.data.blogTags
    const markdown = blogPostData.long_text;
    return (
        <LayoutTwo>
            {/* breadcrumb */}
            <ReactPlaceholder customPlaceholder={BlogPostPlaceHolder}
                              ready={!(queryBlogPost.loading || !queryBlogPost.data || queryBlogPosts.loading || !queryBlogPosts.data || queryBlogCategories.loading || !queryBlogCategories.data || queryBlogTags.loading || !queryBlogTags.data)}>
                <BreadcrumbOne
                    pageTitle={blogPostData.title}
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
                        <li>{blogPostData.title}</li>
                    </ul>
                </BreadcrumbOne>
                <div className="blog-page-wrapper space-mb--r130 space-mt--r130">
                    <Container>
                        <Row>
                            <Col lg={3} className="order-2 order-lg-1 space-mt-mobile-only--50">
                                {/* sidebar */}
                                <BlogSidebar blogPost={blogPostsData} blogCategories={blogCategoriesData}
                                             blogTags={blogTagsData}/>
                            </Col>

                            <Col lg={9} className="order-1 order-lg-2">
                                <div className="blog-grid-post blog-grid-post--sticky space-pb--50 space-mb--40">
                                    <div className="blog-grid-post__image blog-grid-post--sticky__image space-mb--30">
                                        <img src={process.env.STRAPI_URL + blogPostData.image.url}
                                             className="img-fluid"
                                             alt=""
                                        />
                                    </div>
                                    <div className="blog-grid-post__content blog-grid-post--sticky__content">
                                        <div className="post-category space-mb--10">
                                            {blogPostData.blog_categories && blogPostData.blog_categories.map((item, index) => (
                                                    <Link key={index}
                                                          href={"/blog/category/" + item.id + "/" + item.slug}
                                                          as={process.env.PUBLIC_URL + "/blog/category/" + item.id + "/" + item.slug}
                                                    >
                                                        <Button className="mr-1 mt-1"
                                                                variant="outline-dark">{item.category_name}</Button>
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                        <h2 className="post-title">{blogPostData.title}</h2>

                                        <div className="post-info d-flex flex-wrap align-items-center space-mb--50">
                                            <div className="post-user">
                                                <IoIosPerson/>By
                                                <Link
                                                    href="#"
                                                >
                                                    <a> {blogPostData.blog_author.author_name}</a>
                                                </Link>
                                            </div>
                                            <div className="post-date mb-0 space-pl--30">
                                                <IoIosCalendar/>
                                                <Link
                                                    href="#"
                                                >
                                                    <a>{blogPostData.date}</a>
                                                </Link>
                                            </div>
                                            <div className="post-comment space-pl--30">
                                                <IoMdChatbubbles/>
                                                <a href="#"> {blogPostData.comment_counts} Comments</a>
                                            </div>
                                        </div>

                                        <div className="single-blog-post-section">
                                            <ReactMarkdown source={markdown}/>
                                        </div>

                                        <Row className="space-mt--30 align-items-center">
                                            <Col md={6} className="text-center text-md-left">
                                                <div className="post-tags">
                                                    <IoMdPricetags/>
                                                    <ul className="tag-list">
                                                        {blogPostData.blog_tags && blogPostData.blog_tags.map((single, index) => (
                                                            <li key={index}>
                                                                <a href={"/blog/tag/" + single.id + "/" + single.slug}
                                                                   as={process.env.PUBLIC_URL + "/blog/tag/" + single.id + "/" + single.slug}>{single.tag_name}</a>,
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col md={6} className="text-center text-md-right">
                                                <div className="post-share">
                                                    <span>Share this post:</span>
                                                    <ul>
                                                        <li>
                                                            <a href="#">
                                                                <IoLogoFacebook/>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <IoLogoTwitter/>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <IoLogoGoogleplus/>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <IoLogoPinterest/>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="comments-wrapper space-mb--40">
                                    <h2 className="comment-title space-mb--30">
                                        Comments <span>({blogPostData.blog_comments.length})</span>
                                    </h2>
                                    <Comment props = {blogPostData}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ReactPlaceholder>
        </LayoutTwo>
    );
};

export default Post;
