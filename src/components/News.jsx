import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
}
static propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
  capitlizeText = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitlizeText(this.props.category)}- NewsNation`
  }
  async updateNews(){
    this.props.setProgress(10);
    const url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({ loading: true });
  let results = await fetch(url);
  this.props.setProgress(50);
  let parsedData = await results.json();
  this.props.setProgress(70);
  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: false
  });
  this.props.setProgress(100);
  }

  async componentDidMount() {
   this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({page: this.state.page - 1});
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({page: this.state.page + 1});
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let results = await fetch(url);
    let parsedData = await results.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  };

  render() {
    return (
      <>
        <h1 className="container" style={{ margin: '35px 0px' }}>Top Headlines <span className="badge bg-secondary">{this.capitlizeText(this.props.category)}</span></h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >

          <div className="container">
          <div className="row ">
            {this.state.articles.map((element) => {
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
}