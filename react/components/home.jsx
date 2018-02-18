import React from 'react';
import networking from '../networking/bathroom.jsx';

class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      map: null,
      loading: true
    };
  }

  componentDidMount(){
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

        console.log(bathrooms.length);
        let bData = [];
        bathrooms.forEach(b => {
          let loc;
          let icon;
          if(!b.verified) {
            loc = b.geometry.location
            loc = [loc.lat, loc.lng];
            icon = {
              icon: L.mapquest.icons.marker({
                primaryColor: "#aaaaaa",
                secondaryColor: "#ffffff",
                shadow: true,
                size: 'lg'
              })
            };
          } else {
            loc = [b.geo.coordinates[1], b.geo.coordinates[0]];
            icon = {
              icon: L.mapquest.icons.marker({
                primaryColor: "#33ff33",
                secondaryColor: "#aaffaa",
                shadow: true,
                size: 'lg'
              })
            };
          }
          console.log(loc);
          let marker = L.marker(loc, icon);
          marker.on('click', (e)=>{
            console.log(e);
          });
          marker.bathroom = b;
          marker.addTo(map);
          bData.push(marker);          
        });
        console.log(bData.length);
  
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
              <div id="map"></div>
            </div>
          )
        }
      </div>
    );
  }
}

module.exports = Home;