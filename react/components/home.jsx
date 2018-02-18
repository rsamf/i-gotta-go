import React from 'react';
import networking from '../networking/bathroom.jsx';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      map: null,
      loading: true,
    };
  }

  componentDidMount(){
    let self = this;
    L.mapquest.key = 'QwMOrkHNGKtPozliUHoqCWalFbaJG8mp';
    navigator.geolocation.getCurrentPosition((pos)=>{
      let myPos = [pos.coords.latitude, pos.coords.longitude];
      networking.search(myPos, (bathrooms) => {

        this.setState({
          loading: false
        });
  
        // 'map' refers to a <div> element with the ID map
        let map = L.mapquest.map('map', {
          center: myPos,
          layers: L.mapquest.tileLayer('map'),
          zoom: 16
        });
  
        L.marker(myPos, {
          icon: L.mapquest.icons.via({
            primaryColor: '#47adf8',
            secondaryColor: '#ffffff',
            shadow: true,
            size: 'lg'
          })
        }).addTo(map);

        let bData = [];
        bathrooms.forEach(b => {
          let loc;
          let icon;
          if(!b.verified) {
            loc = b.geometry.location
            loc = [loc.lat, loc.lng];
            icon = {
              icon: L.mapquest.icons.marker({
                primaryColor: b.allGender ? '#cc22dd' : "#aaaaaa",
                secondaryColor: b.allGender ? '#cc22dd' : "#ffffff",
                shadow: true,
                size: 'lg',
                riseOnHover: true
              })
            };
          } else {
            loc = [b.geo.coordinates[1], b.geo.coordinates[0]];
            icon = {
              icon: L.mapquest.icons.marker({
                primaryColor: "#33ff33",
                secondaryColor: b.allGender ? '#cc22dd' : "#aaffaa",
                shadow: true,
                size: 'lg',
                riseOnHover: true
              })
            };
          }
          let marker = L.marker(loc, icon);
          marker.on('click', (e)=>{
            let b = e.target.bathroom;
            if(b._id) this.props.history.push('/b/'+b._id);
            else this.props.history.push('/ub/'+e.target.bathroom.place_id);
          });
          marker.bathroom = b;
          console.log(b);
          marker.addTo(map);
          bData.push(marker);          
        });
  
        this.setState({
          map: map,
          bathrooms: bData
        });
      });
    });
  }

  render(){
    return(
      <div>
        {
          this.state.loading ? 
          (
            <img className="ui center" src="/images/toilet-loader.gif" alt=""/>
          ) :
          (
            
            <div id="map-container">
              <button style={{position:"absolute", zIndex:1000, right: 5}} className="ui button">
                <Link to="/bathroom/add">Add a Bathroom</Link>
              </button>
              <div id="map"></div>
            </div>
          )
        }
      </div>
    );
  }
}

module.exports = Home;