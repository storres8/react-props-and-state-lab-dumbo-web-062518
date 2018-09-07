import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) =>{
    // console.log(e.target.value)
    this.setState({
      filters:{
        type: e.target.value
      }
    })
  }

  onAdoptPet = (id) => {
    let pets = this.state.pets.map(pet =>{
      return pet.id === id ? {...pet, isAdopted: true} : pet
    })

    this.setState({
      pets: pets
    })
  }

// persistData = (id) => {
//   const pet = this.state.pets.find(pet => pet.id === id )
//
//
//   fetch(`url${id}`,  {
//     method: 'PATCH'
//     headers:,
//     body: JSON.stringify(pet)
//   })
// }


filterPets = () => {
  // console.log(this.state.filters.type)
  if(this.state.filters.type === "cat"){
    return this.state.pets.filter(pet =>{
      return pet.type === "cat"
    })
  }else if (this.state.filters.type === "dog"){
    return this.state.pets.filter(pet =>{
      return pet.type === "dog"
    })
  }else if (this.state.filters.type === "micropig"){
    return this.state.pets.filter(pet =>{
      return pet.type === "micropig"
    })
  }else{
    return this.state.pets
  }
}


componentDidMount(){
    if(this.state.filters.type === "all"){
      return fetch('/api/pets')
      .then(resp => resp.json())
      .then(data => this.setState({
        pets: data
      })
    )
    }else{
      return fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then(data => this.setState({
        pets: data
      }))
    }
  }


  render() {
    // console.log(this.state.filters.type)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} filterPets={this.filterPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser petData={this.filterPets()} onAdoptPet= {this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
