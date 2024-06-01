import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../api";
import PostImage from "../components/module/post/PostImage";
import PostCategogy from "../components/module/post/PostCategory";
import PostMeta from "../components/module/post/PostMeta";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postDetail, setPostDetail] = useState({});
  console.log(postDetail);
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth?.access_token) navigate("/sign-in");
    console.log(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  useEffect(() => {
    (async () => {
      try {
        const results = await axiosClient.get(`/posts/${id}`, {
          headers: { Authorization: `Bearer ${auth.access_token}` },
        });

        setPostDetail(results.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postDetail?.coverImage}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategogy className="mb-6" to={postDetail?.category?.id}>
                {postDetail.category?.name}
              </PostCategogy>
              <h1 className="post-heading">{postDetail?.title}</h1>
              <PostMeta authorName={postDetail?.user?.fullName}></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">{postDetail?.content}</div>
            <div>
              <div className="author">
                <div className="author-image">
                  <img src={postDetail?.user?.avatar} alt="" />
                </div>
                <div className="author-content">
                  <h3 className="author-name">{postDetail?.user?.fullName}</h3>
                  <p className="author-desc">{postDetail?.user?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
