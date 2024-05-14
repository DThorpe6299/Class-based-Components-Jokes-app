import React from "react";
import axios from "axios";
import Joke from "./Joke";

class JokeList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            jokes: [],
            loading: true,
            error: null
        }
    }

    async componentDidMount(){
        let j = [...this.state.jokes];
        let seenJokes = new Set();
        const {numJokesToGet} = this.props;
        try{
            while (j.length < numJokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com", {
                  headers: { Accept: "application/json" }
                });
                let { status, ...jokeObj } = res.data;
  
            if (!seenJokes.has(jokeObj.id)) {
                seenJokes.add(jokeObj.id);
                j.push({ ...jokeObj, votes: 0 });
            } else {
            console.error("duplicate found!");
          }
          this.setState({ jokes: j, loading: false });
            }
    } catch(e){
        console.log(e);
    }
    }

    handleVote(id, delta){
        this.setState(prevState=>({
            jokes: prevState.jokes.map(joke =>
                joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
            )
        }));
    }

    render() {
        const { jokes, loading, error } = this.state;
        

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        const sortedJokes = jokes.slice().sort((a, b) => b.votes - a.votes);

        return (
            <div className="JokeList">
                {sortedJokes.map(joke => (
                    <Joke key={joke.id}
                    joke={joke}
                    upVote={() => this.handleVote(joke.id, 1)}
                    downVote={() => this.handleVote(joke.id, -1)} />
                ))}
            </div>
        );
    }
}

export default JokeList;