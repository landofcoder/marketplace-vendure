import Link from "next/link";
import Swiper from "react-id-swiper";
import { Container, Row, Col } from "react-bootstrap";
import {
  IoIosCalendar,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import {useQuery} from "@apollo/react-hooks";
import {BLOG_LIST_POST} from "@bavaan/graphql/blog/blog-post.graphql";


const BlogPostSlider = ({ spaceBottomClass }) => {
  const queryBlogPosts = useQuery(BLOG_LIST_POST, {});
  if(queryBlogPosts.loading || !queryBlogPosts.data){
    return <h1>Loading</h1>;
  }
  const blogPostData = queryBlogPosts.data.blogPosts
  const params = {
    loop: false,
    slidesPerView: 2,
    spaceBetween: 30,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <IoIosArrowBack />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <IoIosArrowForward />
      </button>
    ),
    breakpoints: {
      1024: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      },
    },
  };
  return (
    <div
      className={`blog-post-slider ${spaceBottomClass ? spaceBottomClass : ""}`}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={4}>
            <div className="blog-intro space-mb-mobile-only--30">
              <h2>From our blog</h2>
              <p>
                Lorem ipsum dolor sit amet, consecte tur cing elit. Suspe ndisse
                suscipit sagittis leo sit met condim entum.
              </p>
              <Link
                href="/blog"
                as={process.env.PUBLIC_URL + "/blog"}
              >
                <a className="lezada-button lezada-button--medium">view all</a>
              </Link>
            </div>
          </Col>
          <Col lg={8}>
            <div className="blog-post-slider-container">
              <Swiper {...params}>
                {blogPostData && blogPostData.length &&
                blogPostData.map((single, i) => (
                      <div className="blog-grid-post" key={i}>
                        <div className="blog-grid-post__image space-mb--30">
                          <Link
                              href={"/blog/post/" + single.id + "/" +  single.slug}
                              as={process.env.PUBLIC_URL + "/blog/post/" + single.id + "/" +  single.slug}
                          >
                            { single.image.url &&
                            <a>
                              <img
                                src={process.env.STRAPI_URL + single.image.url}
                                className="img-fluid"
                                alt=""
                              />
                            </a>}
                          </Link>
                        </div>
                        <div className="blog-grid-post__content">
                          <div className="post-date">
                            <IoIosCalendar />
                            {single.date}
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
                          <Link
                              href={"/blog/post/" + single.id + "/" +  single.slug}
                              as={process.env.PUBLIC_URL + "/blog/post/" + single.id + "/" +  single.slug}
                          >
                            <a className="blog-readmore-btn">read more</a>
                          </Link>
                        </div>
                      </div>
                    )
                  )
                }
              </Swiper>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlogPostSlider;
