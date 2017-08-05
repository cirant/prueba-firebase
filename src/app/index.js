import "../sass/main.scss";
import React from "react";
import {render} from "react-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state={
    	view: "login",
    	user: "",
    	list: []
    }

    this.handlerGetPicture=this.handlerGetPicture.bind(this);
    this.makeChoose=this.makeChoose.bind(this);
    this.handlerStart=this.handlerStart.bind(this);
  }

  makeChoose(value){

  	fetch(`https://miapp-b4170.firebaseio.com/users/${this.nameUser}.json`,{
  		method: 'POST',
        body: JSON.stringify({
            picture: value
        })
  	})
  	.then(res=>res.json())
  	.then(response=>{
  		// console.log("response ",response)
  		this.handlerGetPicture();
  	}).catch(err=>{
  		// console.log("errior en el fetch", err);
  		this.handlerGetPicture();
  	})


  	this.setState({
  		list : []
  	});

  	// this.handlerGetPicture();
  }

  handlerGetPicture(){
  	fetch("https://cors-anywhere.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1")
  	.then(res=>res.json())
  	.then(response=>{
  		console.log("response ",response)

  		const list = response.items.slice(0,2);

  		this.setState({
  			list : list
  		});
  	}).catch(err=>{
  		console.log("errior en el fetch", err);
  		this.handlerGetPicture();
  	})
  }

  handlerStart(){

	  	this.setState({
	  		view: "main" 
	  	});


	  	fetch("https://miapp-b4170.firebaseio.com/users.json",{
	  		method: 'POST',
	        body: JSON.stringify({
	            name: this.state.user
	        })
	  	})
	  	.then(res=>res.json())
	  	.then(response=>{
	  		console.log("response ",response)
	  		this.nameUser = response.name;
	  		this.handlerGetPicture();
	  	}).catch(err=>{
	  		// console.log("errior en el fetch", err);
	  		// this.handlerGetPicture();
	  	})

  }

  render() {

  	if(this.state.view==="login")
	    return (
	      <div  className="container">
	      	<h1>Welcome, please enter your name</h1>
	      	<input type="text" onChange={({target})=>this.setState({user: target.value})} />
	      	<button onClick={this.handlerStart}>Start</button>
	      </div>
	    );

	return 	 <div  className="container form">	
				<p className="welcome">welcome, {this.state.user}</p>
				<h1>choose a picture </h1>

				<div className="opt-container">
					{
						this.state.list.length>0?
						this.state.list.map((opt,i)=><OptionPicture key={`key-${i}`} 
																	handlerGetOption={()=>this.makeChoose(opt.media.m)}
																	picture={opt.media.m} />)
						:<div>loading...</div>
					}
				</div>
	      		<button onClick={()=>{
	      			this.setState({
	      				view: "login",
				    	user: "",
				    	list: [] 
	      			});
	      		}}>finish</button>
			</div>
  }
}

const OptionPicture = (props)=>{
	return 	<div className="opt" onClick={props.handlerGetOption}>	
				<img src={props.picture} />
			</div>
}


render(<App />,document.getElementById('app'));
