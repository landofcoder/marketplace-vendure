import {IoIosSearch} from "react-icons/io";
import Link from "next/link";
import { useState, useEffect, Fragment } from "react";  

const BlogSidebar = (blogData) => {
    return (
        <div className="blog-sidebar">
            <div className="single-sidebar-widget space-mb--40">
                <h2 className="single-sidebar-widget__title space-mb--30">
                    Categories
                </h2>
                <ul className="single-sidebar-widget__list single-sidebar-widget__list--category">
                    {blogData.blogCategories && blogData.blogCategories.map((item,index) => (
                            <li key={index}>
                                <Link
                                    href={"/blog/category/" + item.id + "/" +  item.slug}
                                    as={process.env.PUBLIC_URL + "/blog/category/" + item.id + "/" +  item.slug}
                                >
                                    <a>{item.category_name}</a>
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </div>

            <div className="single-sidebar-widget space-mb--40">
                <div className="widget-post-wrapper">
                    {blogData.blogPost && blogData.blogPost.map((single, index) => (
                            <div className="single-widget-post" key={index}>
                                <div className="image">
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
                                <div className="content">
                                    <h3 className="widget-post-title">
                                        <Link
                                            href={"/blog/post/" + single.id + "/" +  single.slug}
                                            as={process.env.PUBLIC_URL + "/blog/post/" + single.id + "/" +  single.slug}
                                        >
                                            <a>{single.title}</a>
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div className="single-sidebar-widget space-mb--40">
                <div className="blog-sidebar-banner">
                    <Link
                        href="/blog/index"
                        as={process.env.PUBLIC_URL + "/blog"}
                    >
                        <a>
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/banners/blog-sidebar.png"
                                }
                                className="img-fluid"
                                alt=""
                            />
                        </a>
                    </Link>
                </div>
            </div>

            <div className="single-sidebar-widget">
                <h2 className="single-sidebar-widget__title space-mb--30">
                    {" "}
                    Popular Tags
                </h2>
                <div className="tag-container">
                    {blogData.blogTags && blogData.blogTags.map((item, index) => (
                    <Link
                        key={index}
                        href={"/blog/tag/" + item.id + "/" + item.slug}
                        as={process.env.PUBLIC_URL + "/blog/tag/" + item.id + "/" +  item.slug}
                    >
                        <a>{item.tag_name}</a>
                    </Link>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;
