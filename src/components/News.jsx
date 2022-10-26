import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47c4e088df764447b3fafa58e96a8aae&pageSize=9`;
    this.setState({ loading: true });
    let results = await fetch(url);
    let parsedData = await results.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47c4e088df764447b3fafa58e96a8aae&page=${
      this.state.page - 1
    }&pageSize=9`;
    this.setState({ loading: true });
    let results = await fetch(url);
    let parsedData = await results.json();
    // console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    });
  };

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 10)) {
      
    }else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47c4e088df764447b3fafa58e96a8aae&page=${
        this.state.page + 1
      }&pageSize=9`;
      this.setState({ loading: true });
      let results = await fetch(url);
      let parsedData = await results.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="container" style={{margin: '35px 0px'}}>Top News</h1>
        {this.state.loading && <Spinner />}
        <div className="row ">
          {!this.state.loading &&
            this.state.articles.map((element) => {
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
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            <i className="fa-solid fa-2x fa-arrow-left-long"></i>
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 9)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            <i className="fa-solid fa-2x fa-arrow-right-long"></i>
          </button>
        </div>
      </div>
    );
  }
}
