import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitlizeText = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    let url =
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let results = await fetch(url);
    props.setProgress(50);
    let parsedData = await results.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitlizeText(props.category)}- NewsNation`

    updateNews();
  }, []);

  const handlePrevClick = async () => {
    setPage(page - 1)
    updateNews();
  };

  const handleNextClick = async () => {
    setPage(page + 1)
    updateNews();
  };

  const fetchMoreData = async () => {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let results = await fetch(url);
    let parsedData = await results.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }

  return (
    <>
      <h1 className="container" style={{ margin: '35px 0px', marginTop: '90px', textAlign: 'center' }}>Top Headlines <span className="badge bg-secondary">{capitlizeText(props.category)}</span></h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >

        <div className="container">
          <div className="row ">
            {articles.map((element) => {
              return (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 mx-0 my-3"
                  key={element.url}
                >
                  <NewsItem
                    urlToImage={element.urlToImage}
                    title={element.title}
                    content={element.content}
                    url={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News;