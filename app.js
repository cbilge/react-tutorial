var data = [
  {id:1, author: "Joe Biden", text: "Biden _my_ time"},
  {id:2, author: "John Kerry", text: "Kerry *me* home!"}
];

var CommentBox = React.createClass ({
  render: function(){
    return (
      <div className = "commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass ({
  render: function () {
    var commentNodes = this.props.data.map(function(comment){
  return (
    <Comment author = {comment.author} key = {comment.id}>
      {comment.text}
    </Comment>
  );  
}); 
    return (
      <div className = "commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass ({
  render: function() {
    return (
      <div className = "commentForm">
        I am a comment form
      </div>
    );
  }
});

var Comment = React.createClass ({
  rowMarkup: function() {
    var rowMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rowMarkup };
  },
  render: function() {
    return(
      <div className = "comment">
        <h2 className = "commentAuthor">
          {this.props.author}
        </h2>
        <p dangerouslySetInnerHTML = {this.rowMarkup()} />
      </div>
    );
  }  
});

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);