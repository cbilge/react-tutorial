var CommentBox = React.createClass ({
    getInitialState: function(){
        return {data: []};
    },
    loadCommentsFromServer: function (){
      $.ajax({
         url: this.props.url,
         dataType: 'json',
         cache: false,
         success: function (data) {
             this.setState({data: data});
         }.bind(this),
         error: function(xhr,status,err){
             console.error(this.props.url, status, err.toString());
         }.bind(this)
      });
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function(){
    return (
        <div className = "commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
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
      <form className = "commentForm">
        <input type='text' placeholder='Your name' />
        <input type='text' placeholder='Say something...' />
        <input type='submit' value='Post' />
      </form>
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
  <CommentBox url="/api/comments.php" pollInterval={2000} />,
  document.getElementById('content')
);