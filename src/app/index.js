import "../sass/main.scss";
import React from "react";
import {render} from "react-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state={
    	view: "login2",
    	user: "",
    	list: []
    }

    this.handlerGetPicture=this.handlerGetPicture.bind(this);
    this.makeChoose=this.makeChoose.bind(this);
  }

  componentWillMount() {
  	this.handlerGetPicture();
  }

  makeChoose(value){
  	console.log("este es la opcion seleccionada ",value);

  	this.setState({
  		list : []
  	});

  	this.handlerGetPicture();
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

  render() {

  	if(this.state.view==="login")
	    return (
	      <div>
	      	<h1>Welcome, please enter your name</h1>
	      	<input type="text" onChange={({target})=>this.setState({user: target.value})} />
	      	<button onClick={()=>this.setState({view: "start"})}>Start</button>
	      </div>
	    );

	return 	<div>	welcome {this.state.user}
				<h1>escoger imagen </h1>

				<div>
					{
						this.state.list.length>0?
						this.state.list.map((opt,i)=><OptionPicture key={`key-${i}`} 
																	handlerGetOption={()=>this.makeChoose(opt.media.m)}
																	picture={opt.media.m} />)
						:<div>cargando...</div>
					}
				</div>
			</div>
  }
}

const OptionPicture = (props)=>{
	return 	<div onClick={props.handlerGetOption}>	
				<img src={props.picture} />
			</div>
}


render(<App />,document.getElementById('app'));
