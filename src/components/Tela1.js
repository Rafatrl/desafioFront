import React, { Component } from 'react'
import api from './service'

export default class Tela1 extends Component {
   
    render() {
        return (
            <>
            <div class="container-lg">
                <div class="row justify-content-center">
                    <div class="col-5">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand" href="#">GITHUB</a>
                            <form class="form-inline">
                                <input class="form-control mr-sm-2" 
                                    type="search" 
                                    placeholder="Username" 
                                    required="true" 
                                    onChange={e=>this.setState({Currentuser:e.target.value})} 
                                    aria-label="Search"></input>

                                <button class="btn btn-outline-success my-2 my-sm-0" 
                                    type="submit" onClick={async()=>{
                                    this.setState({loadmenu:1})
                                    let result = await api.get(this.state.Currentuser+'/repos')
                                    this.setState({repositorios:result.data})
                                    let starred = await api.get(this.state.Currentuser+'/starred')
                                    this.setState({stared:starred.data})
                                    }}disabled={!this.state.Currentuser}>Pesquisar</button>
                            </form>
                        </nav>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-4">
                    <Info 
                    loadmenu={this.state.loadmenu} 
                    user={this.state.Currentuser} 
                    repos={this.state.repositorios} 
                    starred={this.state.stared}>
                    </Info>
                    </div>
                </div>
            </div>
            </>
        )
    }

    changestate = ()=>{
        this.state()
    }
    constructor(props) {
        super(props)
        this.state = {          
            Currentuser: null,
            loadmenu:0,
            repositorios:[],
            starred:[]
        }
    }
}

class Info extends Component{

    constructor(props) {
        super(props)
        this.state = {         
            Currentuser: null,
            loadmenu:0,
            repositorios:[],
            starred:[],
            content:[]
        }
    }

    render(){
        if( this.props.loadmenu === 0){
            return (<></>)
        }
        else{
            return (<>
                <div>
                    <span>
                        <h4>User found: {this.props.user}</h4> 
                        <div class="row justify-content-center">
                            <button class="btn btn-outline-primary" onClick={()=>this.setState({content:this.props.starred})}>starred</button>  
                            <button class="btn btn-outline-primary" onClick={()=>this.setState({content:this.props.repos})}>repos</button>
                        </div>  
                    </span>
                    <ul>
                        {this.state.content.map(x=> {return <li>{x.name}</li>})}
                    </ul>
                </div>
            </>)
        }
    }
}