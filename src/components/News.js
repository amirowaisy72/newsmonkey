import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  articles = [
    
  ];
  constructor(){
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page:1
    }
  }
  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=db6c7c3f6f9546209e76f8bfd8d61b39&page=1";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles:parsedData.articles});
  }
  handlePrevious = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=db6c7c3f6f9546209e76f8bfd8d61b39&page=${this.state.page-1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:parsedData.articles,
      page: this.state.page-1
    });
  }

  handleNext = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=db6c7c3f6f9546209e76f8bfd8d61b39&page=${this.state.page+1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:parsedData.articles,
      page: this.state.page+1
    });
  }

  render() {
    return (
      <div className='container my-3'>
        <h1>Top Headlines</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div key={element.url} className="col-md-4 my-2">
                    <NewsItem title={element.title?element.title.slice(0,45):''} description={element.description?element.description.slice(0,88):''} imageUrl={element.urlToImage} newsUrl={element.url} />
                  </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type='button' className="btn btn-dark mx-3" onClick={this.handlePrevious}>&larr; Previous</button>
          <button type='button' className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
