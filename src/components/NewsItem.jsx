import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { url, content, title, urlToImage, publishedAt, author ,source} = this.props;
    return (
      <div className="container">
        <div className="card">
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"88%",zIndex:"1"}}>
            {source}
          </span>
          <img src={!urlToImage ? "https://yt3.ggpht.com/a/AGF-l79zt11-IUDdir2jzqVUsr5z79e7ScX-kzuEqQ=s900-mo-c-c0xffffffff-rj-k-no" : urlToImage} className="card-img-top" alt="NewsImage" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{content}</p>
            <p className="card-text"><small className="text-muted">Last updated on {new Date(publishedAt).toGMTString()}</small></p>
            <p className="card-text"><small className="text-muted">-{!author ? "Unkown" : author}</small></p>
            <a href={url} className="btn btn-sm btn-success" target="_">
              <i className="fa-solid fa-book-open"></i> Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
