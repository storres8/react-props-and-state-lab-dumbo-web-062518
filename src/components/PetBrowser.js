import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

allPets = () =>{
  console.log(this.props.petData)
  const allPet = this.props.petData
  return allPet.map(pet =>{
    return <Pet key={pet.id} pet={pet} onAdoptPet={this.props.onAdoptPet}/>
  })
}
  render() {
    return <div className="ui cards"> {this.allPets()} </div>
  }
}

export default PetBrowser
