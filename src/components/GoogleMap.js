import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { MapPin } from 'react-feather'

let mapkey = ''
if (process.env.NETLIFY_MAP_KEY) {
  mapkey = process.env.NETLIFY_MAP_KEY
}

class GoogleMap extends Component {
  static defaultProps = {
    zoom: 18
  }

  render() {
    const { locations } = this.props
    let firstLocation = locations[0]

    return (
      // Important! Always set the container height explicitly

      <div style={{ height: '50vh', width: '100%' }}>
        <iframe
          src={firstLocation.mapLink}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        />
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: mapkey }}
          defaultCenter={
            firstLocation
              ? { lat: +firstLocation.lat, lng: +firstLocation.lng }
              : this.props.center
          }
          defaultZoom={this.props.zoom}
        >
          {locations.map(location => (
            <Marker lat={location.lat} lng={location.lng} text={'Ecudevs'} />
          ))}
        </GoogleMapReact> */}
      </div>
    )
  }
}

export default GoogleMap

const Marker = () => {
  return (
    <div style={{ color: 'red' }}>
      <MapPin />
    </div>
  )
}
