import React from "react";

class Joke extends React.Component{
    render(){
        const {upVote, downVote, joke} = this.props;
        const { votes } = joke;
        return(
        <div className="Joke">
            <div className="Joke-votearea">
                <button onClick={upVote}>
                <i className="fas fa-thumbs-up" />
                +
                </button>

                <button onClick={downVote}>
                <i className="fas fa-thumbs-down" />
                -
                </button>

                {votes}
                <div className="Joke-text">{joke.joke}</div>
            </div>
            
        </div>
        )
    }

}
export default Joke;